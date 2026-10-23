# Guia de Extração de Personalidade e Tom do Prompt

A IA deve ler o prompt do utilizador e extrair os **Adjetivos de Tom** para personalizar a interface.

## Tabela de Conversão: Prompt do Utilizador → Decisões Visuais

| Palavras-chave no Prompt do User | Estilo Visual Recomendado | Tipografia | Raios de Borda (`radius`) | Sensação da Paleta |
| :--- | :--- | :--- | :--- | :--- |
| "Agressivo", "Rápido", "Crypto", "Web3" | Neo-Brutalism ou Dark High Contrast | Fonte Display angular (Space Grotesk) | `0px` a `4px` com bordas marcadas | Cores saturadas (Amarelo, Rosa Neon, Preto) |
| "Acolhedor", "Orgânico", "Café", "Saúde" | Minimalist Warm | Serifa elegante + Sans limpa | `12px` a `20px` (suave e curvo) | Tons terrosos, creme, verde oliva, bege |
| "Enterprise", "Segurança", "Bancário" | Minimalist Corporate | Sans-serif sóbria (Inter, Roboto) | `8px` a `10px` | Tons frios (Azul escuro, Cinza, Branco) |
| "Moderno", "SaaS", "Dashboard", "IA" | SaaS Dark Modern ou Glassmorphism | Sans-serif moderna (Geist, Plus Jakarta) | `12px` a `16px` | Fundo dark escuro com luzes e bordas sutis |

### Regra de Ouro da Personalidade:
Se o utilizador disser: *"Quero uma landing page para o meu estúdio de tatuagem"*, a IA NUNCA deve entregar uma página azul corporativa com botões redondos de banco. Ela deve adotar o tom escuro, artesanal, com tipografia forte e alto contraste!

---

## Mapa Determinístico: Nicho → `style_id` (adicionado)

Objetivo: o mesmo prompt deve levar sempre ao mesmo estilo. Os `style_id` correspondem às chaves de `02-styles-and-tokens/design-styles.json`.

| Nicho / palavras-chave | `style_id` por defeito | Variantes (quando o prompt sugerir) |
| :--- | :--- | :--- |
| Café, torrefação, padaria, chá, alimentar artesanal | `minimalist_warm` | "sofisticado", "premium", "noturno", "torra escura" → `minimalist_warm_dark`; "orgânico", "origem", "natureza", "sustentável" → `organic_forest_dark` |
| Saúde, bem-estar, moda, arquitetura, e-commerce | `minimalist_warm` | "luxo", "premium" → `clean_editorial` |
| Tatuagem, barbearia, bar, rock, couro | `dark_craft_ink` | — |
| SaaS, API, dashboard, startup, IA | `saas_dark_modern` | "futurista" → `glassmorphism_tech`; "vários recursos / mosaico" → `bento_grid_layout` |
| Enterprise, banco, finanças, seguros | `minimalist_corporate` | — |
| Imobiliário, marketplace, confiança | `minimalist_corporate` | "moderno", "tecnológico" → `saas_dark_modern` |
| Blog, portfólio, revista, educativo, conteúdo | `clean_editorial` | "tecnológico" → `saas_dark_modern` |
| Crypto, web3, jovem, agressivo, ousado | `bold_neobrutalism` | — |

### Regras de aplicação
1. **Nunca improvisar paleta.** Se o `style_id` existe, usar as cores, raio e fontes do token. Só mudar se o utilizador pedir cores ou fontes específicas.
2. **Modo (dark/light):** seguir o campo `mode` do estilo. Só usar a variante do outro modo quando o prompt o sugerir (ver coluna "Variantes").
3. **Nicho sem linha na tabela:** escolher o estilo cuja `description` e `keywords` mais se aproximam, e registar a justificação no DESIGN BRIEF. Nunca sortear.
4. **Conflito entre palavras-chave** (ex: "agressivo" + "bancário"): privilegiar o nicho (quem paga e quem usa) e usar o tom apenas para ajustar tipografia e detalhes.
