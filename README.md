# AI Design Engine

Um conjunto de regras, padrões visuais, referências e prompts para orientar a criação de interfaces de frontend e reduzir designs genéricos ("AI Slop").

## Estrutura

```text
ai-design-engine/
├── .cursorrules
├── README.md
├── 01-rules-and-constraints/
│   ├── ai-design-rules.md
│   └── anti-patterns.md
├── 02-styles-and-tokens/
│   └── design-styles.json
├── 03-references/
│   ├── curated-references.md
│   ├── component-catalog.md
│   ├── personality-extractor.md
│   └── layout-archetypes.md
├── 04-agent-prompts/
│   └── system-prompt-auditor.md
└── tools/
    └── validate-design.js
```

## Utilização

- **Cursor:** coloque o conteúdo desta pasta na raiz do projeto em que pretende aplicar as regras.
- **Copilot e outros agentes:** use os documentos de regras como instruções do projeto e consulte `04-agent-prompts/system-prompt-auditor.md` como prompt de auditoria.
- **Tokens visuais:** selecione um estilo de `02-styles-and-tokens/design-styles.json` de acordo com o produto e o público.

As regras são diretrizes para inspirar decisões contextuais, não um substituto para os requisitos específicos do projeto. Verifique sempre contraste, responsividade e consistência no contexto da aplicação.

## Fluxo recomendado (para resultados consistentes)

1. **DESIGN BRIEF:** a IA escreve o brief antes do código (formato em `system-prompt-auditor.md`).
2. **Estilo:** `personality-extractor.md` (Mapa Nicho → style_id) + `design-styles.json`.
3. **Estrutura:** arquétipo de hero e secções em `layout-archetypes.md`.
4. **Inspiração:** marcas e padrões do nicho em `curated-references.md` (funciona sem acesso à internet).
5. **Auditoria:** checklist do prompt + `node tools/validate-design.js <ficheiro>`.

## Validador

```bash
node tools/validate-design.js ./src/App.jsx
node tools/validate-design.js ./index.html ./src/Hero.jsx --strict
```

Com `--strict`, o comando termina com código 1 se existirem avisos (útil em CI). Os avisos são heurísticos: confirme sempre no contexto do design antes de corrigir.
