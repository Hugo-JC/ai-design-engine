# CORE — leia isto primeiro (1 página)

Núcleo do AI Design Engine v3. O resto do repo carrega-se só quando for preciso: um agente que lê 89 KB antes de desenhar não os aplica todos.

## Mapa rápido de contexto

Os ficheiros canónicos e a carga útil relevante são estes:

- `CORE.md`: fluxo operacional e precedência; ponto de entrada do agente.
- `AGENTS.md`: instruções curtas para execução assistida.
- `tools/route.js`: router determinístico para `style_id`, intensidade, padrões, brief e contexto.
- `03-references/local-presets.json`: fonte de verdade do nicho → preset e do fallback.
- `02-styles-and-tokens/design-styles.json`: fonte de verdade dos tokens e estilos visuais.
- `03-references/design-intelligence-playbook.md`: referências analisadas, tipografia, espaço, composição e motion.
- `tools/validate-design.js`: validação automática do HTML/CSS; não substitui inspeção visual.
- `tools/lint-repo.js`: integridade do repo e consistência de tokens, presets e referências.
- `05-evals/prompts.json`: casos de regressão do router e critérios esperados.
- `tests/*.test.js`: provas de comportamento determinístico e regressões de compatibilidade.

O agente não precisa de ler todo o repositório. A leitura recomendada é: `CORE.md` → `tools/route.js`/`local-presets.json` → `design-styles.json` → `design-intelligence-playbook.md` → o ficheiro alvo → `validate-design.js` → o teste relevante.

## Protocolo (4 passos)

1. **Rotear:** `node tools/route.js "<pedido>" --context` devolve `style_id`, tokens, arquétipos, dossiê do nicho e o esqueleto do DESIGN BRIEF (≈2 KB). Sem Node, siga `03-references/reference-[...]` ou use `--brief` para um resumo executável.
2. **Brief:** complete o DESIGN BRIEF (8 linhas). Se faltar algo essencial, faça UMA pergunta curta; caso contrário assuma e declare a suposição.
3. **Direção:** leia `03-references/design-intelligence-playbook.md` e escolha referências e princípios relevantes. Registe a estratégia tipográfica, o ritmo de espaço, a composição e 2–3 famílias de motion, com justificação. Não copie layouts.
4. **Construir e auditar:** construa com os tokens do `style_id`; pedido explícito vence tokens. Execute `node tools/validate-design.js <ficheiro> --style <style_id>`, corrija e reveja o render (ou `node tools/render-audit.js`). Declare o que não conseguiu verificar.

## Distinguir decisão de design e evidência

- **Regra escrita**: documento, checklist ou padrão.
- **Regra aplicada**: decisão tomada no código ou no layout.
- **Validação estática**: análise automática, determinística e limitada.
- **Auditoria visual**: inspeção do render em browser ou screenshot.
- **Referência estética**: princípio observado e adaptado, nunca um layout copiado.
- **Artefacto testado**: comportamento validado por teste ou verificação executada.

## Referências (opcional, máx. 3)

Escada: pedido do utilizador → conector (Mobbin/Figma) → biblioteca [BETA] → captura por URL → dossiê do router.
Extraia padrões, não layouts; registe no brief “fonte → extraído | não copiado”. Sem referências, siga só o dossiê. Consulte o playbook para evitar que projetos de nichos diferentes recebam a mesma fórmula visual.

## As 14 regras que mais falham

1. O **nicho** decide o estilo. O **tom** só ajusta a intensidade (`calm` / `balanced` / `loud`).
2. **Cor do produto ≠ accent de UI.** Accent ≤ 10 / 15 / 25 % da superfície (calm / balanced / loud); texto sobre accent com ≥ 4.5:1.
3. Sem roxo/índigo genérico (inclui `#6366F1`) nem gradientes roxo→azul, salvo pedido explícito.
4. Contraste: 4.5:1 em texto normal, 3:1 em texto grande e componentes de UI. Texto puramente decorativo leva `aria-hidden`.
5. Títulos: tracking dentro do intervalo do estilo (nunca abaixo de −0.02em) e `text-wrap: balance`. Tipografia de _display_ gigante só em hero/wordmark.
6. Espaçamento: base 8 px; meio-passo de 4 px até 16 px. Usa gaps diferentes conforme a relação; secções principais precisam de respiro visível.
7. Nada de divisores (`<hr>`, `border-t/b`, `divide-y`, `h-px`) a separar blocos soltos: use espaço ou mudança de superfície.
8. Botões com o raio do token (0 só em neo-brutalismo), `hover` e `:focus-visible` em todos os controlos; ações são `<button>`, não `<div onclick>`.
9. Número + unidade ligados (`160&nbsp;mg`, `250&nbsp;ml`, `3&nbsp;h`).
10. Hero: escolha o arquétipo (H1–H9) pelo conteúdo real. “Texto à esquerda + imagem à direita” é só uma opção.
11. Três cards iguais são sinal de slop: varie escala, conteúdo e hierarquia. Não transforme cada secção em cartões.
12. Copy específica do nicho; nada de “soluções inovadoras”.
13. Movimento serve a narrativa e respeita `prefers-reduced-motion`. Microinterações dão feedback útil; não adicionam ruído.
14. `alt` nas imagens, `lang` no `<html>`, `viewport`, um só `<h1>`.

## Anti-monocultura visual (obrigatório)

- Não reutilize automaticamente a mesma família/par tipográfico, paleta, hero, raios, cards e motion entre pedidos.
- Escolha tipografia pela voz da marca e pela leitura; Inter, Poppins, DM Sans e Space Grotesk são opções, nunca defaults universais.
- Crie ritmo com mudanças intencionais de densidade: imagem forte, conteúdo editorial, demonstração, detalhe ou prova. Espaço vazio é estrutura.
- Não adicione cursor personalizado, tilt, parallax forte, blobs em loop, animações longas em cascata ou efeitos que movem o layout, salvo necessidade demonstrável.
- Cada movimento deve comunicar hierarquia, continuidade, feedback ou descoberta; respeite movimento reduzido e não esconda conteúdo essencial.
- Antes de entregar, pergunte: “Se eu retirar o logótipo, esta página ainda parece pertencer a esta marca?” Se não, reveja direção, não apenas os detalhes.

## Precedência em caso de conflito

requisitos funcionais e acessibilidade › pedido explícito do utilizador › tokens do estilo › regras gerais › avisos do validador (heurísticos).

## Carregar só se necessário

- Regras detalhadas: `01-rules-and-constraints/ai-design-rules.md`
- O que nunca fazer: `01-rules-and-constraints/anti-patterns.md`
- Exemplos Slop vs. Elite: `03-references/component-catalog.md`
- Referências e direção visual: `03-references/design-intelligence-playbook.md`
- Arquétipos e dossiê do nicho: já vêm no `--context`
- Medir se o repo ajuda: `05-evals/README.md`
