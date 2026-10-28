# AI Design Engine v4 (alpha)

Router determinístico, tokens de estilo e validadores para orientar interfaces frontend com identidade de nicho e reduzir o “AI slop”. É um guardrail de direção visual: não substitui revisão humana.

## Para agentes de IA (obrigatório, leia isto primeiro)

Se vai gerar UI, páginas ou componentes, o protocolo é **obrigatório** ([`agents/PROTOCOL.md`](agents/PROTOCOL.md), 2 KB). Em resumo:

1. `node tools/route.js "<pedido>" --context --refs`
2. Confiança ≠ `high`, ou pedido sem nicho/mercado/produtos reais → faça **UMA** pergunta antes de construir.
3. DESIGN BRIEF sem campos <preencher>.
4. Construa com os tokens do estilo.
5. `node tools/validate-design.js <ficheiro> --style <style_id>` até passar.
6. Entregue brief + saída do validador + suposições + o que **não** verificou. Sem evidência, a entrega não conta.

**Sem execução de código (chat)?** Cole [`BOOTSTRAP.md`](BOOTSTRAP.md) e anexe o ficheiro de `node tools/bundle.js "<pedido>" --out ADE-CONTEXT.md`. Instruções por ferramenta em [`agents/hosts/`](agents/hosts/); índice para LLMs em [`llms.txt`](llms.txt).

## Para humanos: início rápido

```bash
node tools/route.js "Loja online de cosméticos naturais" --brief
node tools/bundle.js "Loja online de cosméticos naturais" --out ADE-CONTEXT.md
node tools/validate-design.js index.html --style minimalist_warm
npm test && npm run lint && npm run agents:check
```

Requer Node ≥ 18 (testado em 22). Sem dependências obrigatórias; Playwright é opcional (`render-audit`, `ref-capture`).

## Como cada ferramenta carrega o protocolo

`agents/PROTOCOL.md` é a **fonte única**. `node tools/gen-agents.js` gera os atalhos; o lint e o CI falham se algum divergir.

| Ferramenta | Ficheiro gerado |
| :--- | :--- |
| Claude Code | `CLAUDE.md` |
| Codex e agentes que leem `AGENTS.md` | `AGENTS.md` |
| Gemini CLI | `GEMINI.md` |
| Cursor | `.cursor/rules/ade.mdc` (+ `.cursorrules` legado) |
| Copilot | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |
| Chats (ChatGPT, Claude.ai, Gemini…) | `BOOTSTRAP.md` + `ADE-CONTEXT.md` |

Os formatos de cada ferramenta são os conhecidos à data; confirme na documentação atual de cada uma.

## Estrutura

```text
├── agents/            # PROTOCOL.md (fonte única) · hosts/ (uma nota por ferramenta)
├── CORE.md            # as 14 regras que mais falham
├── 01-rules-and-constraints/ · 02-styles-and-tokens/ (17 estilos) · 03-references/ (61 presets, dossiês)
├── 04-agent-prompts/ · 05-evals/ · 06-case-studies/ · 07-library/ (beta)
├── tools/             # route · validate-design · bundle · gen-agents · lint-repo · render-audit · ref-* · eval-summary
└── tests/             # node --test
```

## Novos recursos de conhecimento e qualidade

- [`07-library/reading-list.md`](07-library/reading-list.md): livros, fontes normativas e leitura orientada a heurísticas.
- [`07-library/videos/README.md`](07-library/videos/README.md): fluxo para notas de talks/transcrições com atribuição e sem republicar material protegido.
- [`05-evals/QUALITY-ROADMAP.md`](05-evals/QUALITY-ROADMAP.md): avaliação visual cega, métricas, acessibilidade e prioridades para a alpha.

**Regra de ouro:** adicionar mais conteúdo não garante melhores interfaces. Converter conhecimento em heurísticas testáveis e medir resultados antes de promover uma regra ao núcleo.

## Estado (honesto)

- **Verificado por testes:** router (61 presets, confiança e alternativas), validador, lint, geração e sincronia dos atalhos, bundle.
- **Alpha:** entrada para agentes (`agents/`, `bundle`). **Beta:** referências (`--refs`), biblioteca `07-library/`, `render-audit`.
- **Por validar:** o workflow de CI (`.github/workflows/ci.yml`) foi escrito mas ainda não correu no GitHub.
- **Ainda não medido:** se o design sai **melhor** com o repo e com este protocolo. Ver `05-evals/`; o teste U0–U4 está por fazer.

Histórico e migração: [`CHANGELOG.md`](CHANGELOG.md).
