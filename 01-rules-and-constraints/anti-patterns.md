# O Guia Anti-AI Slop (O Que NUNCA Fazer)

IAs costumam repetir erros de treino. Este documento lista as práticas proibidas:

1. **PROIBIDO: "Padrão Roxo Genérico"**
   - Não use fundos pretos com sombras roxas/neons flutuantes sem solicitação explícita de temas cyberpunk/saas dark específico.

2. **PROIBIDO: Excesso de Divisores (`---` / `<hr>`)**
   - Se precisa separar duas áreas, aumente o `gap` ou mude a cor de superfície do container. Linhas horizontais poluem a interface.

3. **PROIBIDO: Botões sem Curvatura por Preguiça (`border-radius: 0`)**
   - A menos que o estilo seja atipicamente quadrado/brutalista, sempre aplique curvatura (`rounded-md` ou `rounded-lg`).

4. **PROIBIDO: Falta de Contexto Humano e Textos Genéricos**
   - Evite preencher a página com "Lorem Ipsum" ou frases vagas como "Inovação para o seu futuro". Adapte a cópia ao nicho do projeto.

5. **PROIBIDO: Componentes Copiados sem Variação**
   - Não gere 3 cards com a mesma altura, o mesmo texto e o mesmo ícone. Crie dinamicidade nos dados e na hierarquia.

## Anti-patterns adicionados após testes reais (mesmo prompt, resultados diferentes)

6. **PROIBIDO: Tracking Demasiado Apertado em Títulos**
   - Nada de `tracking-tighter` nem `letter-spacing` abaixo de `-0.03em`. As letras não podem tocar-se. Intervalo recomendado: `-0.02em` a `0em`.

7. **PROIBIDO: Palavras Órfãs e Quebras Feias**
   - Títulos com `text-wrap: balance`, parágrafos com `text-wrap: pretty`. Ligar número e unidade com `&nbsp;` (ex: `1.200&nbsp;m`). Nunca deixar uma unidade sozinha na linha seguinte.

8. **PROIBIDO: Cards Flutuantes a Tapar o Elemento Principal**
   - Badges/cards sobre uma ilustração só podem sobrepor a margem (máx. ~20%). Máximo de 2 por hero.

9. **PROIBIDO: Divisores Disfarçados**
   - `border-t`, `border-b`, `divide-y`, `border-top`, `h-px` usados como linha solta entre blocos contam como `<hr>`. Bordas em contentores (cards, inputs, botões) são permitidas.

10. **PROIBIDO: Ilustração SVG Genérica ou Irreconhecível**
    - Uma forma abstrata que "quase parece" o produto (ex: grão de café que parece um ovo) é pior do que não ter ilustração. Se o objeto não ficar reconhecível, use placeholder de fotografia com indicação de enquadramento.

11. **PROIBIDO: Hero Split por Defeito**
    - "Texto à esquerda, imagem à direita" não pode ser a escolha automática. Escolha o arquétipo em `03-references/layout-archetypes.md` e justifique-o no brief.

12. **PROIBIDO: Accent Espalhado**
    - A cor de destaque aparece em no máximo: 1 palavra/expressão do título, o CTA primário, badges e estados ativos. Não pintar números, ícones, bordas e textos ao mesmo tempo.

13. **PROIBIDO: Headline Descritiva Sem Imagem Sensorial**
    - "Café orgânico, torrado devagar" descreve. "O café que sabe a manhã devagar" faz sentir. O título deve evocar uma sensação, um momento ou um detalhe concreto do nicho.
