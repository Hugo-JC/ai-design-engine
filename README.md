# AI Design Engine

Um conjunto de regras, tokens, referências e prompts para orientar interfaces de frontend com identidade de nicho e reduzir padrões genéricos de “AI Slop”. É um guardrail de direção visual, não substitui requisitos de produto nem uma revisão de UX.

## Estrutura

```text
ai-design-engine/
├── .cursorrules
├── README.md
├── MASTER-PROJECT-SPEC.md
├── 01-rules-and-constraints/
│   ├── ai-design-rules.md          # regras detalhadas de design
│   └── anti-patterns.md
├── 02-styles-and-tokens/
│   └── design-styles.json
├── 03-references/
│   ├── curated-references.md
│   ├── component-catalog.md
│   ├── layout-archetypes.md
│   ├── personality-extractor.md
│   ├── reference-router.md
│   └── local-presets.json
├── 04-agent-prompts/
│   └── system-prompt-auditor.md
└── tools/
    └── validate-design.js
```

## Como usar

1. Leia `MASTER-PROJECT-SPEC.md` como especificação geral do projeto e `01-rules-and-constraints/ai-design-rules.md` para as regras detalhadas de design; consulte também os anti-patterns.
2. Identifique o nicho principal e escolha o `style_id` de forma determinística com `03-references/reference-router.md` e `03-references/local-presets.json`. O catálogo local é o fallback offline; `03-references/personality-extractor.md` complementa o mapeamento.
3. Confirme que o estilo existe em `02-styles-and-tokens/design-styles.json` e escolha apenas arquétipos válidos de `03-references/layout-archetypes.md`.
4. Escreva um DESIGN BRIEF conciso e implemente. Use referências como inspiração de padrões abstratos, nunca para copiar páginas, textos, imagens, identidade ou componentes distintivos.
5. Antes de entregar, faça a auditoria real do resultado: reveja o código e o brief, corrija problemas relevantes e volte a validar. Consulte `04-agent-prompts/system-prompt-auditor.md`.

Pode incluir um elemento visual distintivo ou assinatura quando pedido ou adequado, mas não invente nem imponha uma assinatura, marca ou monograma.

## Validador heurístico

```bash
node tools/validate-design.js ./src/App.jsx
node tools/validate-design.js ./index.html ./src/Hero.jsx --strict
```

O comando aceita um ou mais caminhos de ficheiros de texto e a opção `--strict`. Analisa o conteúdo-fonte à procura de sinais heurísticos, como divisores, certos estados de botões, tracking, títulos, espaçamento, cores roxas, texto placeholder, imagens sem `alt` e classes repetidas. Não renderiza a página nem confirma visualmente o design, comportamento, responsividade, acessibilidade real ou conformidade completa com as regras. Sem caminhos, ou se um ficheiro não puder ser lido, termina com código 1; com `--strict`, também termina com código 1 se encontrar avisos. Os avisos precisam de revisão humana e não devem ser corrigidos cegamente.

## Âmbito

Este material é especialmente útil para páginas com direção visual marcada — por exemplo, landing pages, showcases, comércio eletrónico, SaaS, portfólios e marcas de nicho. Em produtos operacionais complexos, os requisitos funcionais e a usabilidade continuam a prevalecer sobre regras decorativas.
