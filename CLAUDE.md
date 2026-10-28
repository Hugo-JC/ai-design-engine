<!-- GERADO por `node tools/gen-agents.js` a partir de agents/PROTOCOL.md. NÃO EDITAR À MÃO. -->

# Protocolo AI Design Engine (obrigatório)

Aplica-se sempre que gerares UI, páginas, componentes ou layouts de frontend.

## Critério de sucesso
A tua entrega só é válida se:
1. O DESIGN BRIEF existe e não tem campos `<preencher>`.
2. `node tools/validate-design.js <ficheiro> --style <style_id>` termina sem avisos, ou cada aviso está justificado.
3. O relatório final cita evidência (saída dos comandos ou linhas do código), nunca afirmações soltas.
4. A tipografia, composição, espaçamento e motion têm justificações específicas para esta marca; não basta o resultado ser “limpo”.

## Passos (por esta ordem)
1. Roteia: `node tools/route.js "<pedido>" --context --refs`. Sem execução de código? Pede o `ADE-CONTEXT.md` ao utilizador (`node tools/bundle.js "<pedido>"`) ou segue as 14 regras de `CORE.md`.
2. Se a confiança não for `high`, ou o pedido não diz nicho, mercado/idioma ou produtos reais, faz UMA pergunta curta antes de construir. Senão assume e declara as suposições. “Moderno” não basta.
3. Escreve o DESIGN BRIEF (8 linhas) com o `style_id` do router. Antes de desenhar, consulta `03-references/design-intelligence-playbook.md` (ou a secção Anti-monocultura de `CORE.md` se não conseguires abrir as referências).
4. Define explicitamente: estratégia tipográfica, ritmo de espaçamento, arquétipo de hero, variação de densidade entre secções, princípio(s) de referência e 2–3 famílias de motion no relatório final.
5. Constrói com os tokens do estilo. Pedido explícito do utilizador > tokens. Referências fornecem princípios, não layouts, imagens, copy ou identidade para copiar.
6. Valida e corrige até passar. Com browser: `node tools/render-audit.js <ficheiro>`. Verifica desktop e mobile quando possível.
7. Entrega: brief, saída do validador, suposições, referências “fonte → extraído | não copiado” e o que NÃO verificaste.

## Regras que mais falham (lista completa em `CORE.md`)
- Cor: um accent disciplinado; sem roxo/índigo genérico; contraste AA.
- Espaço: secções com respiro, container de leitura e gaps diferentes por relação; não comprimir tudo nem usar linhas como enchimento.
- Tipografia: não usar sempre a mesma fonte ou par tipográfico; a escolha deve combinar com a marca e o conteúdo.
- Composição: não assumir hero split nem três cartões iguais; o layout deve ser escolhido pelo conteúdo real.
- Motion: cada animação comunica algo, é curta e consistente, usa transform/opacity quando possível e respeita `prefers-reduced-motion`.
- Ativos: nunca imagens de stock remotas nem marcas de terceiros visíveis; usa SVG/CSS ou um `[PLACEHOLDER]` visível, sempre com `alt`.
- Conteúdo: números, avaliações e alegações (saúde, certificações, “100%”) são `[PLACEHOLDER]` e vão listados no relatório. Não inventes factos.
- Mercado: moeda, idioma e variante do português vêm do utilizador; se faltarem, pergunta (passo 2).
- Referências: no máximo 3, só padrões, nunca copiar. Regista “fonte → extraído | não copiado”.

## Honestidade
Não escrevas “segui o repo”, “validado” ou “testado” sem a evidência. Se não conseguiste executar um passo, diz qual e porquê.

## Precedência
Acessibilidade e requisitos funcionais › pedido explícito › tokens do estilo › regras gerais › avisos heurísticos.
