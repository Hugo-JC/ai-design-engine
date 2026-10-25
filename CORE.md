# CORE — leia isto primeiro (1 página)

Núcleo do AI Design Engine v3. O resto do repo carrega-se só quando for preciso: um agente que lê 89 KB antes de desenhar não os aplica todos.

## Mapa rápido de contexto

Os ficheiros canónicos e a carga útil relevante são estes:

- `CORE.md`: fluxo operacional e precedência; ponto de entrada do agente.
- `AGENTS.md`: instruções curtas para execução assistida.
- `tools/route.js`: router determinístico para `style_id`, intensidade, padrões, brief e contexto.
- `03-references/local-presets.json`: fonte de verdade do nicho → preset e do fallback.
- `02-styles-and-tokens/design-styles.json`: fonte de verdade dos tokens e estilos visuais.
- `tools/validate-design.js`: validação automática do HTML/CSS; não substitui inspeção visual.
- `tools/lint-repo.js`: integridade do repo e consistência de tokens, presets e referências.
- `05-evals/prompts.json`: casos de regressão do router e critérios esperados.
- `tests/*.test.js`: provas de comportamento determinístico e regressões de compatibilidade.

O agente não precisa de ler todo o repositório. A leitura recomendada é: `CORE.md` → `tools/route.js`/`local-presets.json` → `design-styles.json` → o ficheiro alvo → `validate-design.js` → o teste relevante.

## Protocolo (4 passos)

1. **Rotear:** `node tools/route.js "<pedido>" --context` devolve `style_id`, tokens, arquétipos, dossiê do nicho e o esqueleto do DESIGN BRIEF (≈2 KB). Sem Node, siga `03-references/reference-[...]` ou use `--brief` para um resumo executável.
2. **Brief:** complete o DESIGN BRIEF (8 linhas). Se faltar algo essencial, faça UMA pergunta curta; caso contrário assuma e declare a suposição.
3. **Construir** com os tokens do `style_id`. Um pedido explícito do utilizador (cores, fontes, estilo) vence os tokens.
4. **Auditar:** `node tools/validate-design.js <ficheiro> --style <style_id>` e corrija; depois reveja o resultado renderizado (ou `node tools/render-audit.js`). Declare o que não conseguiu verificar.

## Distinguir decisão de design e evidência

- **Regra escrita**: documento, checklist ou padrão.
- **Regra aplicada**: decisão tomada no código ou no layout.
- **Validação estática**: análise automática, determinística e limitada.
- **Auditoria visual**: inspeção do render em browser ou screenshot.
- **Referencia estética**: visual inspirador, extraído e não copiado por layout.
- **Artefacto testado**: comportamento validado por teste ou verificação executada.

## Referências (opcional, máx. 3)

Escada: pedido do utilizador → conector (Mobbin/Figma) → biblioteca [BETA] → captura por URL → dossiê do router.
Extraia padrões, não layouts; registe no brief “fonte → extraído | não copiado”. Sem referências, siga só o dossiê.

## As 14 regras que mais falham

1. O **nicho** decide o estilo. O **tom** só ajusta a intensidade (`calm` / `balanced` / `loud`).
2. **Cor do produto ≠ accent de UI.** Accent ≤ 10 / 15 / 25 % da superfície (calm / balanced / loud); texto sobre accent com ≥ 4.5:1.
3. Sem roxo/índigo genérico (inclui `#6366F1`) nem gradientes roxo→azul, salvo pedido explícito.
4. Contraste: 4.5:1 em texto normal, 3:1 em texto grande e componentes de UI. Texto puramente decorativo leva `aria-hidden`.
5. Títulos: tracking dentro do intervalo do estilo (nunca abaixo de −0.02em) e `text-wrap: balance`. Tipografia de _display_ gigante só em hero/wordmark.
6. Espaçamento: base 8 px; meio-passo de 4 px até 16 px.
7. Nada de divisores (`<hr>`, `border-t/b`, `divide-y`, `h-px`) a separar blocos soltos: use espaço ou mudança de superfície.
8. Botões com o raio do token (0 só em neo-brutalismo), `hover` e `:focus-visible` em todos os controlos; ações são `<button>`, não `<div onclick>`.
9. Número + unidade ligados (`160&nbsp;mg`, `250&nbsp;ml`, `3&nbsp;h`).
10. Hero: escolha o arquétipo (H1–H9) pelo conteúdo real. “Texto à esquerda + imagem à direita” é só uma opção.
11. Três cards iguais são sinal de slop: varie escala, conteúdo e hierarquia.
12. Copy específica do nicho; nada de “soluções inovadoras”.
13. Movimento serve a narrativa e respeita `prefers-reduced-motion`.
14. `alt` nas imagens, `lang` no `<html>`, `viewport`, um só `<h1>`.

## Precedência em caso de conflito

requisitos funcionais e acessibilidade › pedido explícito do utilizador › tokens do estilo › regras gerais › avisos do validador (heurísticos).

## Carregar só se necessário

- Regras detalhadas: `01-rules-and-constraints/ai-design-rules.md`
- O que nunca fazer (quando o validador ou a revisão o apontar): `01-rules-and-constraints/anti-patterns.md`
- Exemplos Slop vs. Elite: `03-references/component-catalog.md`
- Arquétipos e dossiê do nicho: já vêm no `--context`
- Medir se o repo ajuda: `05-evals/README.md`
