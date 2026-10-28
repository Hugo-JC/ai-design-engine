# Relatório de roteamento (catálogo v3.2)

Medição: `node --test tests/routing-corpus.test.js` e o corpus `routing-corpus.json`.

| Conjunto                                                                |   n | Catálogo 3.1 (14 presets)               | Catálogo 3.2 (61 presets)                       |
| :---------------------------------------------------------------------- | --: | :-------------------------------------- | :---------------------------------------------- |
| dev                                                                     |  70 | preset correto 17% · estilo correto 33% | 100% · 100%                                     |
| held-out                                                                |  65 | preset correto 9% · estilo correto 17%  | 100% · 100%                                     |
| fresh (escrito depois da afinação, **1.ª execução** com a 3.2 já feita) |  24 | —                                       | 100% (24/24)                                    |
| negativos (nichos fora do catálogo; não devem casar)                    |  23 | —                                       | **21/23 na 1.ª execução** → 23/23 após corrigir |
| conflitos de tom (ex.: "advogado com visual energético")                |   8 | —                                       | **7/8 na 1.ª execução** → 8/8 após corrigir     |
| ambíguos (devem devolver alternativas)                                  |   4 | —                                       | 4/4                                             |

## Como ler estes números (leitura honesta)

- O corpus foi escrito por **uma só pessoa (eu, Claude)**, que também escreveu os termos. O held-out **não é independente**: os termos foram escritos depois de o ver. Medem consistência, não generalização.
- Os negativos e os conflitos só chegam a 100% **depois** de eu ver os erros e os corrigir (loja de ferragens → moda via termo genérico "loja"; "design gráfico" → agência; "energético" a competir com "consultório"). Os números da 1.ª execução (21/23 e 7/8) são a medida limpa; os de depois são regressão.
- A linha de base 3.1 é naturalmente baixa porque o corpus inclui nichos que a 3.1 não tinha.
- **Falta a medida que importa:** 30+ pedidos reais, escritos por pessoas que não viram os termos. Cole-os em `05-evals/routing-corpus.json` (chave `real`) e corra a medição.

## Limitações conhecidas

- Termos são por palavra/expressão inteira com plural regular (+s/+es); géneros e plurais irregulares têm de estar listados.
- Pedidos multi-nicho (ex.: loções + frutas) devolvem `alternatives` e `confidence` medium/low: o agente tem de confirmar o nicho; o router não decide sozinho.
- Os dossiês novos são orientações gerais; **não têm marcas de referência verificadas** (`sources: []`), só `ref_queries` para pesquisa.
