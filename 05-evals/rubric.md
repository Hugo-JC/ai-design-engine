# Rubrica de avaliação visual cega — v2

Cada resultado recebe **0, 1 ou 2** em dez critérios (máximo **20 pontos**). Avalie desktop (1440 px) e mobile (390 px), sem saber qual condição usou o engine. Pontue apenas o que consegue observar; não presuma sucesso.

| Critério (`key`) | 0 — ausente/prejudicial | 1 — parcial/inconsistente | 2 — claro e demonstrado |
| :--- | :--- | :--- | :--- |
| Correspondência ao briefing (`brief`) | Público, idioma, conteúdo ou tarefa principal errados | Parte do briefing aparece, mas há omissões relevantes | Público, idioma, conteúdo e ação principal correspondem ao briefing |
| Hierarquia e legibilidade (`hierarchy`) | Ordem visual confusa; texto difícil de ler ou densidade prejudicial | Hierarquia funcional, mas escala, linhas ou densidade são inconsistentes | Ordem visual clara, tipografia legível e densidade adequada |
| Identidade visual (`identity`) | Estética genérica ou contraditória com o produto | Há sinais de identidade, mas poderiam servir a quase qualquer produto | Escolhas visuais específicas e coerentes com o produto e o público |
| Layout responsivo (`responsive`) | Overflow, conteúdo cortado ou ações inutilizáveis em mobile | Adapta-se, mas há quebras ou fricções visíveis | Conteúdo e ações continuam claros e utilizáveis nos dois viewports |
| Acessibilidade (`accessibility`) | Barreiras evidentes: contraste, foco, labels ou teclado | Alguns fundamentos presentes, mas há falhas observáveis | Semântica, contraste, foco, labels e movimento reduzido têm evidência verificável |
| Interação e estados (`interaction`) | Ações sem feedback ou estados essenciais ausentes | Interações básicas funcionam; alguns estados faltam | Feedback claro e estados relevantes (loading, vazio, erro, sucesso, disabled) tratados |
| Conteúdo e confiança (`trust`) | Claims/dados inventados ou placeholders apresentados como reais | Conteúdo parcialmente específico; incerteza pouco sinalizada | Conteúdo concreto; dados reais, placeholders e suposições são distinguíveis |
| Qualidade de implementação (`implementation`) | Código frágil, erros evidentes ou ausência de estrutura | Estrutura razoável, com inconsistências ou duplicação | Tokens/componentes coerentes, código compreensível e sem erros observados |
| Performance (`performance`) | Imagens/fontes/animações ou renderização causam custo claramente evitável | Custo aceitável, mas há oportunidades óbvias de melhoria | Recursos e animações proporcionais; sem problemas de performance observados |
| Originalidade contextual (`originality`) | Composição copiada ou decoração sem relação com a tarefa | Algumas escolhas contextuais, mas muitos padrões previsíveis | Composição e componentes adequados à tarefa, sem variação decorativa gratuita |

## Evidência obrigatória

Para cada nota, registe uma evidência observável em `evidence[key]`: região da screenshot, viewport, elemento, linha de código ou saída de teste. Se não houver evidência suficiente, deixe a nota como `null` e explique o motivo nas notas. Não converta ausência de evidência em nota 2.

**Penalização por cópia:** se o resultado for um clone reconhecível da referência, reduza a nota de `originality` em 1 ponto (mínimo 0) e explique o motivo.

## Protocolo de comparação

- Use o mesmo prompt, modelo/versão, ferramentas, limite de tokens, conteúdo e condições de renderização em cada par.
- Faça uma tentativa por condição; registe falhas e iterações, não apenas a melhor screenshot.
- Capture desktop a 1440 px e mobile a 390 px.
- Atribua códigos aleatórios às saídas, embaralhe A/B e esconda a condição dos avaliadores.
- Idealmente, use dois avaliadores e reporte a média e as divergências.
- Não declare vitória com menos de cinco pares completos. Publique amostra, limitações e resultados negativos.

## Compatibilidade

O avaliador ainda lê resultados históricos com os oito critérios antigos (`identity`, `hierarchy`, `color`, `rhythm`, `composition`, `copy`, `polish`, `realbrand`). Os resultados antigos são resumidos separadamente; nunca misture totais de escalas diferentes.
