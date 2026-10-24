# Rubrica de avaliação visual (cega)

Cada resultado recebe **0, 1 ou 2** em 8 critérios (máx. 16). Avalie em 1440 px e 390 px, sem saber qual é “com repo”.

| Critério (`key`) | 0 | 1 | 2 |
| :--- | :--- | :--- | :--- |
| Identidade de nicho (`identity`) | Serve qualquer negócio | Nicho reconhecível mas genérico | Nicho e tom inconfundíveis |
| Hierarquia tipográfica (`hierarchy`) | Tamanhos/pesos sem lógica | Hierarquia clara mas previsível | Hierarquia forte, com escala e contraste deliberados |
| Cor e contraste (`color`) | Cor a pintar tudo / texto ilegível | Aceitável, accent algo espalhado | Paleta disciplinada, accent com função, AA cumprido |
| Espaçamento e ritmo (`rhythm`) | Apertado ou irregular | Consistente mas monótono | Ritmo variado e consistente, respira |
| Composição (`composition`) | Template “texto+imagem+3 cards” | Alguma variação | Arquétipo escolhido e adequado ao conteúdo |
| Copy específica (`copy`) | Placeholders/frases genéricas | Parcialmente específica | Concreta, sensorial, do produto |
| Acabamento (`polish`) | Sem estados, quebra em mobile | Estados e responsivo básicos | Hover/foco, mobile, movimento controlado |
| “Parece marca real?” (`realbrand`) | Claramente gerado por IA | Duvidoso | Convence como site real |

**Penalização por cópia:** se o resultado parecer um clone reconhecível da referência, retire 1 ponto em `realbrand`.

**Regras do teste:** mesmo modelo/ferramenta, mesmo prompt, uma tentativa por condição, sem iterações extra. Embaralhe a ordem A/B. Idealmente 2 avaliadores; usar a média.
