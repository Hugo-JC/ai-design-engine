# Guia de Extração de Personalidade e Tom do Prompt (v3)

A IA lê o pedido e separa duas coisas que antes se misturavam:

- **Nicho** (o que é o produto, quem o usa) → decide o `style_id`. Fonte única: `03-references/local-presets.json`, executada por `node tools/route.js`.
- **Tom** (adjetivos do pedido) → ajusta a **intensidade** (`calm`, `balanced`, `loud`) e detalhes de tipografia e movimento. **Nunca troca o nicho.**

> v3: a antiga tabela “Nicho → `style_id`” foi removida deste ficheiro porque duplicava `local-presets.json` e já tinha divergido dele. `node tools/lint-repo.js` falha se ela reaparecer.

## Tabela de tom → intensidade e detalhes

Lista completa e executável em `local-presets.json` → `tones`. Resumo:

| Tom (palavras no pedido)                                                                                  | Intensidade               | O que ajusta                                                                                                   |
| :-------------------------------------------------------------------------------------------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------- |
| agressivo, ousado, explosivo, energético, jovem, rápido, irreverente, rebelde, intenso, vibrante, atitude | `loud`                    | Accent até 25% da superfície, tipografia de display maior, movimento mais marcado, contraste de cor mais forte |
| calmo, acolhedor, elegante, sereno, minimalista, sofisticado, suave, discreto, tranquilo                  | `calm`                    | Accent até 10%, mais espaço negativo, movimento mínimo, tipografia mais contida                                |
| (nenhum ou empate)                                                                                        | a do estilo (`intensity`) | —                                                                                                              |

## Regras de aplicação

1. **Nunca improvisar paleta.** Com um `style_id`, usar cores, raio e fontes do token. Só mudar se o utilizador pedir cores ou fontes específicas. Sem cores pedidas, pode usar-se um `accent_alternatives` do estilo.
2. **Modo (dark/light):** seguir o campo `mode` do estilo; a variante do outro modo só se o pedido a sugerir (`variants[].when_any`).
3. **Nicho sem preset:** o router pontua as `keywords` dos estilos (ignorando adjetivos de tom listados em `non_niche_terms`); a melhor pontuação decide e a razão vai para o brief. Sem pontuação, usa-se o `fallback`. Nunca sortear.
4. **Conflito entre palavras-chave** (ex.: “agressivo” + “bancário”): o nicho decide o estilo; o tom só ajusta a intensidade. (O router tem um teste automático para isto.)
5. **Cor do produto ≠ accent de UI.** Se o produto tem cor própria (lata, embalagem), declare-a no brief; ela não conta para o limite de accent.

## Regra de ouro da personalidade

Se o utilizador pede “uma landing page para o meu estúdio de tatuagem”, a IA nunca entrega uma página azul corporativa com botões redondos de banco: adota o tom escuro, artesanal, com tipografia forte e alto contraste (`dark_craft_ink`). Se pede “refrigerantes energéticos”, a embalagem é o herói (`loud_beverage_dark`, H5), não um hero com “texto à esquerda + imagem à direita”.

## Como correr

```bash
node tools/route.js "Landing page para um estúdio de tatuagem"            # resumo
node tools/route.js "<pedido>" --brief                                    # esqueleto do DESIGN BRIEF
node tools/route.js "<pedido>" --context                                  # brief + tokens + arquétipos + dossiê
node tools/route.js "<pedido>" --json                                     # tudo, para scripts
```
