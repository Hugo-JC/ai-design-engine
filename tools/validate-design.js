// tools/validate-design.js
// Execução: node tools/validate-design.js <ficheiro-html-ou-jsx> [<outro-ficheiro> ...] [--strict]
// --strict: termina com código 1 se existirem avisos (útil em CI).
// Nota: são verificações heurísticas; o grid presume a escala Tailwind padrão de 4px.
// Confirme sempre os avisos no contexto do design, sobretudo com tokens personalizados.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const files = args.filter((a) => !a.startsWith('--'));

if (files.length === 0) {
  console.error('❌ Erro: Por favor, forneça o caminho do arquivo para validação.');
  console.log('Exemplo: node tools/validate-design.js ./src/App.jsx');
  process.exit(1);
}

// ---------- utilitários ----------
const lineOf = (content, index) => content.slice(0, index).split('\n').length;

function findAll(content, regex) {
  const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
  const re = new RegExp(regex.source, flags);
  const hits = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    hits.push({ text: m[0], index: m.index, m });
    if (m[0] === '') re.lastIndex++;
  }
  return hits;
}

function where(content, hits, max = 5) {
  const lines = [...new Set(hits.map((h) => lineOf(content, h.index)))];
  const shown = lines.slice(0, max).join(', ') + (lines.length > max ? '…' : '');
  return `(linha${lines.length > 1 ? 's' : ''} ${shown})`;
}

// ---------- validação ----------
function findTagMatches(content, pattern) {
  return findAll(content, pattern);
}

function tagHasInlineState(tagText, patterns) {
  return patterns.some((pattern) => new RegExp(pattern, 'i').test(tagText));
}

function isButtonLikeTag(hit) {
  const tagText = hit.text;
  const tagNameMatch = tagText.match(/^<([A-Za-z][A-Za-z0-9]*)\b/);
  if (!tagNameMatch) return false;
  const tagName = tagNameMatch[1];
  if (/^button$/i.test(tagName) || /^[A-Z][A-Za-z0-9]*Button$/.test(tagName)) return true;
  if (/^a$/i.test(tagName)) {
    return /\bhref\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i.test(tagText)
      || /\brole\s*=\s*(?:"button"|'button'|button\b)/i.test(tagText);
  }
  if (/^input$/i.test(tagName)) return /\btype\s*=\s*(?:"(?:button|submit|reset)"|'(?:button|submit|reset)'|(?:button|submit|reset)\b)/i.test(tagText);
  return false;
}

function validate(content) {
  const warnings = [];

  // 1. Checagem de uso excessivo de <hr> ou ---
  const hr = findAll(content, /<hr\b/i);
  if (hr.length > 0) {
    warnings.push(`⚠️ Encontradas ${hr.length} tag(s) <hr> ${where(content, hr)}. Recomendação: Remova divisores rígidos e use espaçamento (gap/padding).`);
  }
  const markdownRules = findAll(content, /(?:^|\n)\s*(?:---+|___+|\*\*\*+)\s*(?=\r?\n|$)/g)
    .map((hit) => hit.text.startsWith('\n') ? { ...hit, index: hit.index + 1 } : hit);
  if (markdownRules.length > 0) {
    warnings.push(`⚠️ Encontrada(s) ${markdownRules.length} linha(s) horizontal(is) Markdown ${where(content, markdownRules)}. Prefira espaçamento ou mudança de superfície.`);
  }

  // 2. Divisores disfarçados conforme as regras (border-t/b, divide-y, h-px e border-top/bottom em CSS)
  const disguised = [
    ...findAll(content, /\b(?:border-t|border-b|divide-y)\b/),
    ...findAll(content, /\bh-px\b/),
    ...findAll(content, /border-(?:top|bottom)\s*:\s*\d+(?:\.\d+)?px\s+(?:solid|dashed|dotted)/i),
  ];
  if (disguised.length > 0) {
    warnings.push(`⚠️ ${disguised.length} possível(eis) divisor(es) disfarçado(s) (border-t/b, divide-y, h-px) ${where(content, disguised)}. Se separam blocos soltos, troque por espaçamento ou mudança de fundo.`);
  }

  // 3. Checagem de botões com border-radius 0 sem contexto Neo-Brutalista
  const squareButtons = findTagMatches(content, /<[A-Za-z][A-Za-z0-9]*\b[^>]*>/g)
    .filter(isButtonLikeTag)
    .filter((hit) => /\brounded-none\b/.test(hit.text))
    .filter((hit) => !(/\bborder-black\b/.test(hit.text) && /\bshadow-(?:hard|neo|\[)/.test(hit.text)));
  if (squareButtons.length > 0) {
    warnings.push(`⚠️ ${squareButtons.length} botão(ões) com "rounded-none" sem sinais de estilo neo-brutalista ${where(content, squareButtons)}. Confirme que é uma decisão de estilo explícita.`);
  }

  // 4. Estados interativos (hover e focus)
  const buttonTags = findTagMatches(content, /<[A-Za-z][A-Za-z0-9]*\b[^>]*>/g).filter(isButtonLikeTag);
  const buttonWithoutHover = buttonTags.filter((hit) => !tagHasInlineState(hit.text, ['hover:']));
  const buttonWithoutFocus = buttonTags.filter((hit) => !tagHasInlineState(hit.text, ['focus:', 'focus-visible']));

  if (buttonTags.length > 0) {
    if (buttonWithoutHover.length > 0) {
      warnings.push(`⚠️ ${buttonWithoutHover.length} botão(ões) sem estado de hover (hover:...) ${where(content, buttonWithoutHover)}. Adicione feedback visual para interatividade.`);
    }
    if (buttonWithoutFocus.length > 0) {
      warnings.push(`⚠️ ${buttonWithoutFocus.length} botão(ões) sem estado de focus (focus-visible:...) ${where(content, buttonWithoutFocus)}. Garanta navegação por teclado visível.`);
    }
  }

  // 5. Tracking demasiado apertado (recomendado: -0.02em a 0em; aviso abaixo de -0.03em)
  const tight = [];
  findAll(content, /\btracking-tighter\b/).forEach((h) => tight.push(h));
  findAll(content, /tracking-\[(-\d*\.?\d+)em\]/).forEach((h) => {
    if (parseFloat(h.m[1]) < -0.03) tight.push(h);
  });
  findAll(content, /letter-spacing\s*:\s*(-\d*\.?\d+)em/i).forEach((h) => {
    if (parseFloat(h.m[1]) < -0.03) tight.push(h);
  });
  if (tight.length > 0) {
    warnings.push(`⚠️ Tracking demasiado apertado ${where(content, tight)}. Mantenha títulos entre -0.02em e 0em para as letras não se tocarem.`);
  }

  // 6. Quebras de linha em títulos (text-wrap)
  const headingTags = findTagMatches(content, /<h[1-6]\b[^>]*>/gi);
  const headingsWithoutBalance = headingTags.filter((hit) => !tagHasInlineState(hit.text, ['text-balance', 'text-wrap', 'textWrap', 'balance']));
  if (headingsWithoutBalance.length > 0) {
    warnings.push(`⚠️ ${headingsWithoutBalance.length} título(s) sem "text-balance" / "text-wrap: balance" ${where(content, headingsWithoutBalance)}. Evite palavras órfãs e quebras desiguais.`);
  }

  // 7. Espaçamento fora do grid de 8px
  const offGrid = [];
  findAll(content, /\b(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-\[(\d+(?:\.\d+)?)px\]/).forEach((h) => {
    const v = parseFloat(h.m[1]);
    if (v > 0 && v % 8 !== 0) offGrid.push(h);
  });
  findAll(content, /(?:^|[\s"'`])(?:-)?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?)(?=$|[\s"'`])/g).forEach((h) => {
    const v = parseFloat(h.m[1]) * 4;
    if (v > 0 && v % 8 !== 0) offGrid.push(h);
  });
  findAll(content, /(?:padding|margin|gap|row-gap|column-gap)(?:-(?:top|right|bottom|left))?\s*:\s*([^;}{]+)/i).forEach((h) => {
    const values = [...h.m[1].matchAll(/(\d+(?:\.\d+)?)px/g)].map((x) => parseFloat(x[1]));
    if (values.some((v) => v > 0 && v % 8 !== 0)) offGrid.push(h);
  });
  if (offGrid.length > 0) {
    warnings.push(`⚠️ ${offGrid.length} valor(es) de espaçamento fora do grid de 8px ${where(content, offGrid)}. Use múltiplos de 8px (escala Tailwind padrão presumida).`);
  }

  // 8. Padrão roxo genérico
  const purple = findAll(content, /\b(?:bg|from|via|to|shadow|text|border|ring)-(?:purple|violet|fuchsia)-\d{2,3}/);
  if (purple.length > 0) {
    warnings.push(`⚠️ Roxo/violeta detectado ${where(content, purple)}. Confirme que foi pedido ou que faz parte do style_id escolhido (evite o "Padrão Roxo Genérico").`);
  }

  // 9. Textos genéricos / placeholder
  const generic = findAll(content, /lorem ipsum|inovação para o seu futuro|soluções inovadoras|o futuro é agora|leve o seu negócio ao próximo nível|innovation for your future/i);
  if (generic.length > 0) {
    warnings.push(`⚠️ Texto genérico/placeholder encontrado ${where(content, generic)}. Escreva cópia específica do nicho (ver anti-pattern 4 e 13).`);
  }

  // 10. Imagens sem alt
  const noAlt = findAll(content, /<img\b(?![^>]*\balt\s*=)[^>]*>/i);
  if (noAlt.length > 0) {
    warnings.push(`⚠️ ${noAlt.length} <img> sem atributo alt ${where(content, noAlt)}. Use alt descritivo (ou alt="" se for decorativa).`);
  }

  // 11. Possíveis cards repetidos sem variação (mesma string de classes 3+ vezes)
  const counts = new Map();
  findAll(content, /\bclass(?:Name)?\s*=\s*["']([^"']{50,})["']/).forEach((h) => {
    counts.set(h.m[1], (counts.get(h.m[1]) || 0) + 1);
  });
  const repeated = [...counts.values()].filter((n) => n >= 3).length;
  if (repeated > 0) {
    warnings.push(`⚠️ ${repeated} conjunto(s) de classes repetido(s) 3+ vezes. Se são cards, confirme que conteúdo, altura e hierarquia variam (anti-pattern 5).`);
  }

  return warnings;
}

// ---------- execução ----------
let totalWarnings = 0;

for (const file of files) {
  try {
    const content = fs.readFileSync(path.resolve(file), 'utf-8');
    const warnings = validate(content);
    totalWarnings += warnings.length;

    console.log('\n--- 🛡️ AI DESIGN ENGINE: RELATÓRIO DE AUDITORIA ---');
    if (files.length > 1) console.log(`Ficheiro: ${file}`);
    if (warnings.length === 0) {
      console.log('✅ Nenhum padrão grave de AI Slop detectado! O design está limpo.');
    } else {
      warnings.forEach((w) => console.log(w));
    }
    console.log('---------------------------------------------------\n');
  } catch (error) {
    console.error('❌ Erro ao ler o arquivo:', error.message);
    process.exitCode = 1;
  }
}

if (strict && totalWarnings > 0) process.exit(1);
