# Avaliação: o repo melhora o resultado?

Sem medir, “parece melhor” é opinião. Esta avaliação separa consistência técnica de qualidade visual observada.

## Três condições comparáveis

1. **Sem repo (`without_repo`):** envie apenas o prompt original ao agente.
2. **Com repo (`with_repo`):** use `node tools/route.js "<prompt>" --context`, junte o contexto gerado, `CORE.md` e o prompt original; não inclua as referências recuperadas.
3. **Com repo + referências (`with_repo_refs`):** repita com `node tools/route.js "<prompt>" --context --refs`, juntando também as referências resultantes.

Os oito prompts com `visual_eval: true` em `prompts.json` (IDs 1, 2, 4, 5, 7, 8, 9 e 10) são testados nas três condições. Assim é possível comparar o engine isolado e o ganho incremental das referências.

## Protocolo

1. Fixe o mesmo modelo/versão, ferramentas, limite de tokens, conteúdo, número de tentativas e condições de renderização em cada par. Registe falhas e iterações; não escolha apenas a melhor de várias tentativas.
2. Renderize cada saída nas mesmas condições e guarde screenshots a 1440 px e 390 px. Se uma saída não for executável, registe a falha; não a substitua silenciosamente por outra.
3. Atribua IDs aleatórios às saídas, baralhe A/B e esconda a condição dos avaliadores. Idealmente, use dois avaliadores independentes.
4. Copie `results.template.json` para `results.json`. Para cada nota 0–2, registe evidência observável em `evidence[key]`. Use `null` quando não houver evidência suficiente.
5. Execute `npm run eval -- 05-evals/results.json`. O resumo só inclui pares completos e não mistura a escala antiga de 16 pontos com a nova de 20 pontos.

## Interpretação

- Menos de cinco pares completos: **amostra insuficiente**; não declarar vitória.
- O avaliador usa um limiar proporcional (12,5% da escala total) e exige vitória em pelo menos 60% dos pares para dizer que o repo compensa.
- Reporte média por critério, vitórias/empates/derrotas, diferenças entre avaliadores, falhas, amostra e limitações.
- O router e os avisos do validador não substituem a avaliação visual nem uma auditoria humana de acessibilidade.

## Estado da avaliação

A infraestrutura de avaliação está preparada, mas os resultados visuais reais continuam pendentes até serem geradas e avaliadas saídas comparáveis com um modelo/ferramenta e renderizador fixados. Não preencher notas com estimativas nem fabricar screenshots.

## Boas práticas

- Repita com dois modelos/ferramentas se o orçamento permitir; reporte cada um separadamente.
- Quando acrescentar uma regra, adicione um prompt que a exercite e volte a medir.
- Os `expected_*` em `prompts.json` são decisões de design: se o router discordar, decida qual dos dois está errado antes de corrigir o teste.
