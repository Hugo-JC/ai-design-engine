# Caso de estudo: site da Refri (energético) — v1 vs v2 vs v3

Pedido original: *“site para a Refri, marca de refrigerantes energéticos, bem animado e moderno, com uma lata reta ao fundo e animações de scroll, em HTML/CSS/JS”.*

| Versão | Ficheiro | Como foi feita |
| :--- | :--- | :--- |
| v1 | `v1-sem-regras.html` | só o README do repo; escolhas improvisadas |
| v2 | `v2-com-regras.html` | repo lido por completo; brief; tokens `dark_craft_ink`; correções da auditoria |
| v3 | (recomendação) | `loud_beverage_dark` + `H5`, ver abaixo |

## O que o repo apanhou (v1 → v2)
- Accent lima a pintar a página inteira (texto, faixa, números, ícones): contra o anti-pattern 13 e a regra do accent.
- Tracking −0.05em/−0.03em nos títulos; espaçamentos fora da grelha (6 px, 10 px, 13 px…); `text-wrap: balance` em falta.
- Número e unidade partíveis (`160 mg`); bug de hover no botão do menu; lista de bullets iguais e 3 números com o mesmo peso.
- Faltava rodapé tipo R1 e hierarquia entre números.

## O que o repo **não** deu
- **Nenhum preset para bebidas.** Pelo router da v2 o resultado seria o fallback `clean_editorial` (claro, serifado), sem relação com uma lata de energia. Foi preciso escolher por parecer (regra 3 do extrator).
- **Contradição entre ficheiros:** o extrator mandava “jovem/agressivo” para neo-brutalismo; o router só o mapeava para “crypto”.
- **Custo estético:** seguir `dark_craft_ink` à letra (accent vermelho, preto neutro) tirou energia visual à v1.

## O que a v3 resolve
```bash
$ node tools/route.js "Quero um site para a Refri, uma marca de refrigerantes energéticos, jovem e bem animado, com a lata em destaque."
style_id:   loud_beverage_dark
caminho:    preset — preset "beverage-packaging-loud" (termos: refrigerante, energético)
intensidade:loud
hero:       H5  features: F2/F1  prova: S2  nav: N1  rodapé: R1
```
`loud_beverage_dark` tem `accent_mode: "product"` e `intensity: loud` (accent até 25%): o lima (cor do produto) volta a ser legítimo, mas a UI mantém tokens, e as alternativas `#FF7A00` e `#FF3D6E` dão as cores dos sabores. É a solução do dilema v1 (energia, mas indisciplinada) vs v2 (disciplinada, mas sem energia).

## Validador: antes e depois
| Ficheiro | Validador v2 | Validador v3 |
| :--- | :--- | :--- |
| v1 | 5 avisos (3 reais + 2 falsos positivos de hover/foco em CSS puro) | 3 avisos reais (tracking, `text-wrap`, grelha) + 1 info; com `--style … --accent #b6ff00` também `accent-spread` (12 usos, 3 tipos) |
| v2 | 2 avisos (falsos positivos de hover/foco) | 0 avisos + 2 info: números em SVG e **5 cores fora do token** (`#0a0a0b`, `#f4f4ef` e cinzentos da lata) que a auditoria manual não viu |

Para reproduzir:
```bash
node tools/validate-design.js 06-case-studies/refri/v1-sem-regras.html
node tools/validate-design.js 06-case-studies/refri/v1-sem-regras.html --style minimalist_corporate --accent "#b6ff00"
node tools/validate-design.js 06-case-studies/refri/v2-com-regras.html --style dark_craft_ink --allow "#b6ff00"
```

## Limites desta análise
- É **um** caso, sem avaliação cega: prova que o repo serve de checklist, não que melhora o design de forma geral. Use `05-evals/` para isso.
- Foi corrida a auditoria renderizada (`tools/render-audit.js`, Chromium) na v2: achou o botão do menu com 32 px de altura em mobile (< 40 px). Com fontes e GSAP bloqueados no sandbox, o render não é representativo: o rótulo “REFRI” da lata corta-se quando a fonte não carrega (sugestão: `textLength` no SVG). O que só se vê com tudo carregado (ritmo do scroll, legibilidade do texto sobre a lata em mobile) continua por verificar à mão.
