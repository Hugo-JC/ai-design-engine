// tools/validate-design.js
// Execução: node tools/validate-design.js <ficheiro-html-ou-jsx> [<outro-ficheiro> ...] [--strict]
// --strict: termina com código 1 se existirem avisos (útil em CI).
// Nota: são verificações heurísticas. Confirme sempre no contexto do design.

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
function validate(content) {
  const warnings = [];

  // 1. Checagem de uso excessivo de <hr> ou ---
  const hr = findAll(content, /<hr\b/i);
  if (hr.length > 0) {
    warnings.push(`⚠️ Encontradas ${hr.length} tag(s) <hr> ${where(content, hr)}. Recomendação: Remova divisores rígidos e use espaçamento (gap/padding).`);
  }

  // 2. Divisores disfarçados (border-t, border-b, divide-y, h-px, border-top/bottom em CSS)
  const disguised = [
    ...findAll(content, /\b(?:border-t|border-b|divide-y|divide-x)\b/),
    ...findAll(content, /\bh-px\b/),
    ...findAll(content, /border-(?:top|bottom)\s*:\s*\d+px\s+(?:solid|dashed|dotted)/i),
  ];
  if (disguised.length > 0) {
    warnings.push(`⚠️ ${disguised.length} possível(eis) divisor(es) disfarçado(s) (border-t/b, divide-y, h-px) ${where(content, disguised)}. Se separam blocos soltos, troque por espaçamento ou mudança de fundo.`);
  }

  // 3. Checagem de botões com border-radius 0 sem contexto Neo-Brutalista
  if (content.includes('rounded-none') && !content.includes('border-black')) {
    warnings.push('⚠️ Detectado "rounded-none" (border-radius: 0). Garanta que isso é proposital ou aplique curvatura (rounded-md/lg).');
  }

  // 4. Estados interativos (hover e focus)
  if (content.includes('<button')) {
    if (!/hover:|:hover/.test(content)) {
      warnings.push('⚠️ Existem botões sem estado de hover (hover:bg-...). Adicione feedback visual para interatividade.');
    }
    if (!/focus:|focus-visible|:focus/.test(content)) {
      warnings.push('⚠️ Existem botões sem estado de focus (focus-visible:ring-...). Garanta navegação por teclado visível.');
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
  if (/<h1\b/i.test(content) && !/text-balance|text-wrap|textWrap|balance/.test(content)) {
    warnings.push('⚠️ Existe <h1> sem "text-balance" / "text-wrap: balance". Evite palavras órfãs e quebras desiguais.');
  }

  // 7. Espaçamento fora do grid (arbitrários não múltiplos de 4px; ideal: múltiplos de 8px)
  const offGrid = [];
  findAll(content, /\b(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-\[(\d+(?:\.\d+)?)px\]/).forEach((h) => {
    const v = parseFloat(h.m[1]);
    if (v >= 5 && v % 4 !== 0) offGrid.push(h);
  });
  findAll(content, /(?:padding|margin|gap|row-gap|column-gap)(?:-(?:top|right|bottom|left))?\s*:\s*([^;}{]+)/i).forEach((h) => {
    const values = [...h.m[1].matchAll(/(\d+(?:\.\d+)?)px/g)].map((x) => parseFloat(x[1]));
    if (values.some((v) => v >= 5 && v % 4 !== 0)) offGrid.push(h);
  });
  if (offGrid.length > 0) {
    warnings.push(`⚠️ ${offGrid.length} valor(es) de espaçamento fora do grid ${where(content, offGrid)}. Use múltiplos de 8px (mínimo 4px para micro-ajustes).`);
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
