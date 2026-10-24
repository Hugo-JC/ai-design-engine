# O Guia Anti-AI Slop (O Que NUNCA Fazer)

IAs costumam repetir os erros mais fáceis: geração por padrão, cópia vazia, linhas artificiais e design sem identidade. Este documento reúne as práticas proibidas e explica por que prejudicam a qualidade do produto.

## Regra geral

Se a interface parece “bonita” mas não parece pertenecer a um produto real, está muito provavelmente a sofrer de AI Slop. A página foi gerada por estética genérica, não por decisão de marca, de nicho e de conteúdo.

## Anti-patterns proibidos

1. **PROIBIDO: “Padrão Roxo Genérico”**
   - Não use fundos escuros com brilho roxo/neon sem uma justificação explícita de estilo.
   - O efeito visual deve obedecer ao nicho, não à tendência de treino da IA.

2. **PROIBIDO: Divisores de plástico (`---`, `<hr>`, `h-px`)**
   - Linhas horizontais para separar secções são um sinal clássico de rigidez artificial.
   - Use espaçamento, mudança de superfície ou ritmo de composição.

3. **PROIBIDO: Botões retos por preguiça (`border-radius: 0`)**
   - Excepção: estética neo-brutalista deliberada e explicitamente escolhida.
   - Na maioria dos casos, todo botão precisa de curvatura e presença de ação.

4. **PROIBIDO: Texto genérico e sem contexto**
   - Frases como “soluções inovadoras”, “para o seu futuro”, “desbloqueie o potencial” são sinais de abstração vazia.
   - Escreva sobre o nicho, o problema real, o que o utilizador sente e o que ganha.

5. **PROIBIDO: Cards copiados sem variação**
   - Três cards com a mesma altura, mesma cópia e mesmo ícone criam um efeito de lista automática.
   - Dê peso, escala, tipografia e dados diferentes.

6. **PROIBIDO: Tracking apertado em títulos**
   - `tracking-tighter` ou `letter-spacing` abaixo de `-0.03em` faz as letras parecerem coladas.
   - Use `-0.02em` a `0em` e reserve tracking positivo para micro-textos e eyebrow labels.

7. **PROIBIDO: Palavras órfãs e quebras feias**
   - Títulos e parágrafos sem equilíbrio de linha geram sensação de má qualidade.
   - Use `text-wrap: balance` / `text-balance` e `text-wrap: pretty` para copy mais confortável.

8. **PROIBIDO: Número e unidade separados**
   - `72 h` ou `1.200 m` quebrados numa linha nova parecem amadores.
   - Use `&nbsp;` ou um sistema de composição que ligue número e medida.

9. **PROIBIDO: Cards flutuantes a tapar o elemento principal**
   - Badges, chips ou cards sobre a ilustração não devem cobrir o conteúdo principal.
   - O máximo recomendado é 2 elementos flutuantes por hero e sempre fora da zona central de identificação.

10. **PROIBIDO: Divisores disfarçados**
    - `border-t`, `border-b`, `divide-y`, `border-top`, `h-px` usados como “linha solta” continuam a contar como separador.
    - Isso é uma má prática visual e um sintoma de geração por convenção.

11. **PROIBIDO: Ilustração abstrata e irreconhecível**
    - Se o objeto principal não for identificável à primeira vista, a ilustração não está a servir a comunicação.
    - Em vez disso, usar um elemento reconhecível ou uma fotografia melhor contextualizada.

12. **PROIBIDO: Hero genérico por defeito**
    - “Texto à esquerda, imagem à direita” não pode ser o padrão automático.
    - Escolha um arquétipo de layout real e justifique a decisão no design brief.

13. **PROIBIDO: Accent espalhado pela página**
    - A cor de destaque não deve aparecer em texto, ícones, bordas, badges e números ao mesmo tempo.
    - Reserve-a para CTA principal, estado ativo e talvez uma expressão do headline.

14. **PROIBIDO: Headline sem sensação de nicho**
    - “Café orgânico” descreve. “O café que sabe a manhã devagar” evoca sensação.
    - O melhor headline combina concreto, contexto e atmosfera do produto.

15. **PROIBIDO: Visual de mistura sem direção**
    - Misturar vários estilos (luxo editorial + brutalism + glassmorphism + SaaS dark) cria páginas que parecem inconsistentes.
    - O design deve ter uma direção clara e obedecer ao `style_id`.

16. **PROIBIDO: Layout sem prova de raciocínio**
    - Se a IA não consegue explicar por que o hero, as secções e a informação estão ordenadas assim, o design provavelmente está sem intenção.
    - Em design, ordem e ritmo têm a mesma importância que cor e tipografia.

17. **PROIBIDO: Monocultura do próprio repo (v3)**
    - Usar sempre os mesmos 2–3 estilos, pares tipográficos e arquétipos produz um novo “slop”, só que com a assinatura deste repo.
    - Se o utilizador não fixou cores, considere os `accent_alternatives` do estilo. Registe no brief porque este estilo e arquétipo, e não o vizinho.

18. **PROIBIDO: Confundir a cor do produto com o accent de UI (v3)**
    - A lata, a embalagem ou a ilustração podem ocupar grande área com a cor do produto; botões, texto, bordas e faixas mantêm os tokens.
    - Pintar toda a UI com a cor do produto é o erro nº 13 (“accent a pintar a página”) com outro nome.

19. **PROIBIDO: Animação sem controlo (v3)**
    - Loops, marquees e animações ligadas ao scroll sem `prefers-reduced-motion`, ou que escondem conteúdo até a animação correr.
    - O movimento serve a narrativa (revelar, guiar, relacionar), não decora.

20. **PROIBIDO: Aplicar uma regra contra o pedido explícito (v3)**
    - Se o utilizador pede cores ou fontes específicas, a regra “não inventar paletas” não se aplica. Siga o pedido, mantenha o contraste e registe o desvio.

## Teste rápido: “a página parece ser de uma marca real?”

Se a resposta for “não”, provavelmente há AI Slop. Faça esta validação rápida:

- O nicho está visível no olhar e na linguagem?
- Há um foco claro para ação principal?
- Há respiro e ritmo, ou tudo parece montado em linhas e colunas rígidas?
- A página tem uma identidade específica ou parece qualquer SaaS de 2024?
- Há sensação de materialidade, contexto e cuidado?

Se falhar em 2 ou mais destas, o layout precisa de reorientação visual.

## Regra prática para o trabalho

Uma página não precisa de ser “complexa” para ser premium. Precisa de ter intenção, clareza e linguagem certa. O AI Slop nasce quando a IA tenta parecer sofisticada sem conhecer o produto.
