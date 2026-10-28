# Avaliação: o repo melhora o resultado?

Sem medir, “parece melhor” é opinião. Esta avaliação separa consistência técnica de qualidade visual observada.

## Duas camadas

1. **Routing (automático):** `npm test` verifica que os prompts de `prompts.json` produzem `style_id`, caminho e hero esperados. Mede consistência do router, não qualidade visual.
2. **Visual (manual, cega):** os oito prompts com `visual_eval: true` são gerados com e sem repo, sob condições equivalentes, e pontuados com a [rubrica de dez critérios](rubric.md).

## Procedimento visual

1. Use os oito IDs marcados com `visual_eval: true` em `prompts.json` (1, 2, 4, 5, 7, 8, 9 e 10).
2. Para cada prompt, produza duas saídas:
   - **Sem repo:** envie o prompt original ao agente, sem `CORE.md`, `agents/PROTOCOL.md`, regras de estilo ou referências deste repositório.
   - **Com repo:** use `node tools/route.js "<prompt>" --context --refs`, junte o brief/contexto resultante, `CORE.md` e o mesmo prompt original.
3. Fixe o mesmo modelo/versão, ferramentas, limite de tokens, conteúdo e número de tentativas. Registe falhas e iterações. Não escolha apenas a melhor de várias tentativas.
4. Renderize cada saída nas mesmas condições e guarde screenshots a 1440 px e 390 px. Se uma saída não for executável, registe a falha; não a substitua silenciosamente por outra.
5. Atribua IDs aleatórios às saídas, baralhe A/B e esconda a condição dos avaliadores. Idealmente, use dois avaliadores independentes.
6. Copie `results.template.json` para `results.json`. Para cada nota 0–2, registe evidência observável em `evidence[key]`. Use `null` quando não houver evidência suficiente.
7. Execute `npm run eval -- 05-evals/results.json`. O resumo só inclui pares completos e não mistura a escala antiga de 16 pontos com a nova de 20 pontos.

## Interpretação

- Menos de cinco pares completos: **amostra insuficiente**; não declarar vitória.
- A ferramenta usa um limiar proporcional (12,5% da escala total) e exige vitória em pelo menos 60% dos pares para dizer que o repo compensa.
- Reporte média por critério, vitórias/empates/derrotas, diferenças entre avaliadores, falhas, amostra e limitações.
- O resultado do router e os avisos do validador não substituem a avaliação visual nem uma auditoria humana de acessibilidade.

## Estado da avaliação

A infraestrutura de avaliação está preparada, mas os resultados visuais reais continuam pendentes até serem geradas e avaliadas saídas comparáveis com um modelo/ferramenta e renderizador fixados. Não preencher notas com estimativas nem fabricar screenshots.

## Boas práticas

- Repita com dois modelos/ferramentas se o orçamento permitir; reporte cada um separadamente.
- Quando acrescentar uma regra, adicione um prompt que a exercite e volte a medir.
- Os `expected_*` em `prompts.json` são decisões de design: se o router discordar, decida qual dos dois está errado antes de corrigir o teste.
