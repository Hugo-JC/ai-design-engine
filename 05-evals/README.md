# Avaliação: o repo melhora o resultado?

Sem medir, “parece melhor” é opinião. Este conjunto responde com números.

## Duas camadas
1. **Routing (automático):** `npm test` verifica que cada prompt de `prompts.json` produz o `style_id`, caminho e hero esperados. Mede a *consistência do repo*, não a qualidade visual.
2. **Visual (manual, cega):** os 8 prompts com `visual_eval: true`, gerados **com** e **sem** repo, pontuados com `rubric.md`.

## Procedimento visual
1. Para cada prompt `visual_eval`:
   - **Sem repo:** dê o prompt tal como está ao agente (sem `CORE.md`, sem `.cursorrules`).
   - **Com repo:** `node tools/route.js "<prompt>" --context` + `CORE.md` + o prompt.
2. Guarde screenshots a 1440 e 390 px. Baralhe os pares (A/B) e pontue às cegas.
3. Copie `results.template.json` para `results.json` e preencha as notas (inteiros 0–2).
4. `node tools/eval-summary.js` → médias, vitórias/empates/derrotas por par, e veredicto:
   - **Compensa:** Δ médio ≥ 2/16 e vitórias em ≥ 60% dos pares.
   - **Ganho pequeno:** Δ entre 0.5 e 2. Veja os critérios em que não ajuda.
   - **Sem ganho:** simplifique o repo antes de o expandir.
   - Menos de 5 pares: amostra insuficiente.

## Boas práticas
- Repita com 2 modelos/ferramentas; um único modelo pode enviesar.
- Quando acrescentar uma regra, adicione um prompt que a exercite e volte a medir.
- Os `expected_*` em `prompts.json` são decisões de design: se o router discordar, decida qual dos dois está errado antes de “corrigir” o teste.
