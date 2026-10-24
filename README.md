# AI Design Engine v3

Regras, tokens, um **router determinístico** e validadores para orientar interfaces de frontend com identidade de nicho e reduzir o “AI Slop”. É um guardrail de direção visual; não substitui requisitos de produto nem uma revisão de UX.

## O que mudou na v3 (resumo)
- **Menos para ler:** `CORE.md` (1 página) + `node tools/route.js --context` (≈2 KB) em vez de 10 ficheiros.
- **Routing executável e testado**, com fonte única (`local-presets.json`). Fim das contradições entre router e extrator.
- **Validador CSS-aware** com tokens (`--style`): sem falsos positivos de hover/foco em CSS puro, com contraste, accent espalhado, deriva de paleta e mais.
- **Intensidade** (`calm`/`balanced`/`loud`) e **cor do produto ≠ accent de UI**: regras já não penalizam marcas ruidosas.
- **4 estilos novos** e 3 presets (bebidas, hardware/arquitetura, clínicas); o accent por defeito de `saas_dark_modern` deixou de ser índigo.
- **Avaliação** (`05-evals/`) para medir se o repo ajuda e **lint do repo** para impedir deriva.
Detalhe e migração: `CHANGELOG.md`.

## Estrutura
```text
ai-design-engine/
├── CORE.md                         # núcleo de 1 página (ler primeiro)
├── AGENTS.md  .cursorrules         # instruções curtas para agentes
├── README.md  CHANGELOG.md  MASTER-PROJECT-SPEC.md  package.json
├── 01-rules-and-constraints/       # ai-design-rules.md · anti-patterns.md
├── 02-styles-and-tokens/           # design-styles.json (14 estilos)
├── 03-references/                  # local-presets.json (fonte única) · router · extrator · arquétipos · dossiês · catálogo
├── 04-agent-prompts/               # system-prompt-auditor.md
├── 05-evals/                       # prompts.json · rubric.md · results.template.json
├── 06-case-studies/refri/          # v1 (slop) vs v2 (com regras) + análise
├── tools/                          # route · validate-design · lint-repo · eval-summary · render-audit · lib/color
└── tests/                          # node --test
```

## Início rápido
```bash
node tools/route.js "Quero um site para uma marca de refrigerantes energéticos" --context
# … o agente constrói o ficheiro …
node tools/validate-design.js index.html --style loud_beverage_dark --allow "#ff7a00,#ff3d6e"
npm test            # router, validador, avaliação
npm run lint        # integridade do repo (tokens, contrastes, presets, referências)
```
Requer Node ≥ 18 (testado em 22). Sem dependências.

## Ferramentas
| Comando | Função |
| :--- | :--- |
| `tools/route.js "<pedido>" [--brief\|--context\|--json]` | pedido → `style_id`, intensidade, padrões, brief, contexto compacto |
| `tools/validate-design.js <f...> [--style id] [--accent #hex] [--allow #hex,…] [--strict] [--json]` | validação estática de HTML/JSX/TSX/Vue/Svelte/CSS |
| `tools/lint-repo.js` | valida o próprio repo (contraste dos tokens, IDs, dossiês, deriva, versões) |
| `tools/eval-summary.js [results.json]` | sumário da avaliação com/sem repo |
| `tools/render-audit.js <f\|url> [--out dir]` | **beta**: auditoria com Chromium (overflow, contraste computado, alvos de toque, foco por teclado, tracking) em 3 viewports + screenshots; requer `playwright` |

## Limites (honestos)
- O validador **não renderiza**. Contraste e “accent espalhado” são estimativas; confirme no browser.
- `render-audit.js` foi testado em Chromium headless (fixtures e a Refri v2), mas não em dispositivos reais, Firefox ou WebKit. Recursos externos (fontes, CDN) precisam de rede para o render ser representativo.
- Presets e dossiês são pontos de partida, não verdades. O gosto não se codifica todo em regras: valide com `05-evals/`.
- Em produtos operacionais complexos, requisitos funcionais e usabilidade prevalecem sobre regras decorativas.

## Como saber se o repo compensa
Siga `05-evals/README.md`: 8 prompts fixos, geração com e sem repo, pontuação cega (0–2 × 8 critérios) e `node tools/eval-summary.js`. Não expanda regras sem ganho medido.
