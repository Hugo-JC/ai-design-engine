<!-- GERADO por `node tools/gen-agents.js` a partir de agents/PROTOCOL.md. NÃO EDITAR À MÃO. -->

# Protocolo AI Design Engine (obrigatório)

Aplica-se sempre que gerares UI, páginas, componentes ou layouts de frontend.

## Critério de sucesso
A tua entrega só é válida se:
1. O DESIGN BRIEF existe e não tem campos `<preencher>`.
2. `node tools/validate-design.js <ficheiro> --style <style_id>` termina sem avisos, ou cada aviso está justificado.
3. O relatório final cita evidência (saída dos comandos ou linhas do código), nunca afirmações soltas.

## Passos (por esta ordem)
1. Roteia: `node tools/route.js "<pedido>" --context --refs`. Sem execução de código? Pede o `ADE-CONTEXT.md` ao utilizador (`node tools/bundle.js "<pedido>"`) ou segue as 14 regras de `CORE.md`.
2. Se `confiança` não for `high`, ou o pedido não diz nicho, mercado/idioma ou produtos reais, faz UMA pergunta curta antes de construir. Senão assume e declara as suposições. "Moderno" não é nicho.
3. Escreve o DESIGN BRIEF (8 linhas) com o `style_id` do router.
4. Constrói com os tokens do estilo. Pedido explícito do utilizador > tokens.
5. Valida e corrige até passar. Com browser: `node tools/render-audit.js <ficheiro>`.
6. Entrega: brief, saída do validador, suposições e o que NÃO verificaste.

## Regras que mais falham (lista completa em `CORE.md`)
- Cor: um accent disciplinado; sem roxo/índigo genérico; contraste AA.
- Ativos: nunca imagens de stock remotas nem com marcas de terceiros visíveis; usa SVG/CSS ou um `[PLACEHOLDER]` visível, sempre com `alt`.
- Conteúdo: números, avaliações e alegações (saúde, certificações, "100%") são `[PLACEHOLDER]` e vão listados no relatório. Não inventes factos.
- Mercado: moeda, idioma e variante do português vêm do utilizador; se faltarem, pergunta (passo 2).
- Referências: no máximo 3, só padrões, nunca copiar. Regista "fonte → extraído | não copiado".

## Honestidade
Não escrevas "segui o repo", "validado" ou "testado" sem a evidência. Se não conseguiste executar um passo, diz qual e porquê.

## Precedência
Acessibilidade e requisitos funcionais › pedido explícito › tokens do estilo › regras gerais › avisos heurísticos.
