# Changelog

## [4.0.0-alpha.1]

### Adicionado

- **Entrada para agentes:** `agents/PROTOCOL.md` (fonte única, ≤ 4 KB, com critério de sucesso, regra de evidência, política de ativos/conteúdo/mercado e pergunta única), `agents/hosts/*` (uma nota por ferramenta), `BOOTSTRAP.md` e `llms.txt`.
- `tools/gen-agents.js` (+ `--check`): gera `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md` e `.cursor/rules/ade.mdc` a partir do protocolo.
- `tools/bundle.js` (`npm run bundle`): gera `ADE-CONTEXT.md` (protocolo + 14 regras + contexto do router) para chats sem execução de código; orçamento de 12 KB, determinístico.
- CI (`.github/workflows/ci.yml`): ubuntu/macos/windows × Node 18/20/22; `.editorconfig` e `.gitattributes` (LF; ficheiros gerados marcados).
- Lint: impõe orçamento e marcas do protocolo, sincronia dos atalhos, links do `llms.txt`. Testes: `tests/agents.test.js`.

### Alterado

- README _agent-first_ (protocolo no topo, estado honesto). `AGENTS.md` e `.cursorrules` passam a ser **gerados**: não editar à mão.
- Lint: a versão de `design-styles.json` e `local-presets.json` tem de estar em [3, major] (antes tinha de igualar o major).

### Corrigido

- `render-audit` e `ref-capture` saem com código 2 e dica de instalação quando o browser não arranca (antes: exceção não tratada, que fazia o teste falhar em vez de saltar).
- Removido `tmp.txt`.

### Não verificado

- O CI nunca correu no GitHub. Os formatos de carregamento por ferramenta são os conhecidos; confirmar na documentação de cada uma.
- Não foi medido se o protocolo faz os agentes seguirem o repo (teste U0–U4 por fazer).

## [3.2.0]

### Adicionado

- **47 presets novos** (14 → 61): cosmética, joalharia, eletrónica, casa/decoração, mercearia, livros, brinquedos, pet/veterinária, florista, vinhos, padaria, artesanato, desporto/outdoor, ginásio, yoga, salão/spa, terapia/nutrição, farmácia, advogados, contabilidade, agências, fotografia, construção/serviços, logística, automóvel, solar, agricultura, escolas, cursos online, línguas, creches, ONG, igrejas, governo, eventos, música, cinema, media, jogos indie, hotéis/viagens, delivery, casamentos, classificados, cibersegurança, apps móveis, telecomunicações, emprego. Termos em PT-PT, PT-BR e EN, com variantes de estilo.
- **3 estilos** (14 → 17): `luxury_noir`, `sport_kinetic_dark`, `civic_trust_light` (contrastes AA verificados pelo lint).
- Router: `weak_terms` (termos genéricos como "loja online" só decidem se nada mais casar), `alternatives` e `confidence` (high/medium/low) na saída; `weak_only`; o brief assinala "CONFIRMAR O NICHO" quando a confiança é baixa.
- Presets: campo `ref_queries` (consultas de pesquisa por nicho) e 47 dossiês novos em `curated-references.md`.
- `05-evals/routing-corpus.json` (dev, held-out, fresh, negativos, conflitos de tom, ambíguos) e `tests/routing-corpus.test.js`. Relatório: `05-evals/ROUTING-REPORT.md`.

### Alterado

- Termos fortes que eram genéricos passaram a fracos ou foram removidos: `loja`, `e-commerce`, `marketplace`, `comunidade`, `construção`, `energético`, `boutique`, `estética`, `branding`, `design gráfico`, `token`.
- Presets existentes enriquecidos (EN, variantes de género/número, termos locais lusófonos) e `real-estate-marketplace` ganha variante de luxo.
- `dark_craft_ink`: removida a keyword genérica "estúdio" (mandava "estúdio de yoga" para o estilo de tatuagem).

### Corrigido

- Teste "brief e contexto têm o formato esperado" falhava porque a tabela Markdown foi reformatada: o regex passou a tolerar espaços.

## [3.1.0-beta.1] — 2026-10-24

### Adicionado

- Escada local-first de referências, catálogo de fontes e `route.js --refs` (máx. 3).
- Ferramentas `ref:check`, `ref:search`, `ref:capture` e `ref:ingest`; biblioteca pessoal opt-in.
- Avaliação marginal `with_repo_refs` e validações da biblioteca.

## [3.0.0] — 2026-10-24

### Adicionado

- `CORE.md`: núcleo de 1 página; `AGENTS.md`.
- `tools/route.js`: router determinístico (normalização, word-boundary, plurais, especificidade, variantes, fallback por keywords, tom → intensidade) com `--brief`, `--context`, `--json`.
- `tools/lint-repo.js`: integridade do repo (contrastes dos tokens, anti-roxo, IDs, dossiês, referências em docs, versões, deriva do extrator).
- `tools/lib/color.js`; `tools/eval-summary.js`; `tools/render-audit.js` (beta, Playwright/Chromium).
- `05-evals/` (15 prompts, rubrica 8×0–2, template de resultados); `06-case-studies/refri/`.
- `tests/` (router, validador, avaliação; ~30 testes).
- 4 estilos: `loud_beverage_dark`, `fresh_playful_light`, `swiss_technical_light`, `game_arcade_dark`.
- 3 presets: `beverage-packaging-loud`, `hardware-engineering-architecture`, `clinic-healthcare` + 3 dossiês.
- Campos de estilo: `intensity`, `accent_mode`, `heading_tracking_range`, `accent_alternatives`. Presets: `dossier`, `hero_alternatives`, `tones`, `non_niche_terms`, `matching`.
- Regras: exceção de display (hero/wordmark), cor do produto ≠ accent de UI, limites de accent por intensidade, precedência de regras. Anti-patterns 17–20.

### Alterado

- **Validador reescrito (CSS-aware):** reconhece `:hover`/`:focus-visible` em CSS (antes só `hover:` Tailwind → falsos positivos em CSS puro); novas verificações: contraste estimado, accent espalhado, deriva de paleta, `prefers-reduced-motion`, `outline:none`, `<div onclick>`, `lang`/`viewport`/`h1`, texto < 12px, número+unidade sem `&nbsp;`, roxo/índigo em CSS e Tailwind.
- Grelha de espaçamento: base 8px com **meio-passo de 4px até 16px** (antes: “múltiplos de 8” contradizia a tolerância de 4px).
- Tracking de títulos passa a ser **por estilo** (`heading_tracking_range`), limite global −0.02em.
- `personality-extractor.md`: removida a tabela nicho→`style_id` duplicada (fonte única: `local-presets.json`).
- `reference-router.md`: o fluxo no-match passa a pontuar `keywords` antes do fallback (resolve a contradição com o extrator).
- `.cursorrules`, auditor, README e spec reescritos para o fluxo `CORE.md` → `route.js` → `validate-design.js --style`.

### Quebras de compatibilidade (leia)

- `saas_dark_modern`: accent `#6366F1` (índigo, o “roxo genérico” que o anti-pattern 1 proíbe) → `#2DD4BF`. Alternativas: `#3B82F6`, `#F59E0B`.
- `community-gaming`: `style_id` `saas_dark_modern` → `game_arcade_dark` (variante “profissional/corporativo” mantém o antigo).
- Termos como “saúde” continuam em `wellness-health-beauty`, mas “clínica/consultório/hospital/médico…” passam a `clinic-healthcare` (expressão mais específica vence).
- O validador devolve `info` (não conta para `--strict`) além de `warn`; os avisos de hover/foco deixam de disparar quando o CSS os cobre.
- `component-catalog.md`: o exemplo “Elite” deixou de usar índigo.

### Corrigido

- **Tokens de `minimalist_warm` violavam o AA exigido pelas próprias regras** (descoberto pelo novo lint): `text_secondary` `#78716C` (4.49:1) → `#57534E`; `accent` `#D97706` (2.98:1 sobre o fundo) → `#B45309` (4.7:1). Texto sobre o accent passa a ser branco.
- Router não casava plurais (“refrigerantes”).
- `component-catalog.md` contradizia o anti-pattern 1 (usava índigo no exemplo bom).

## [2.0.0]

Versão anterior (v2): regras, 10 estilos, router em prosa, validador Tailwind-first.
