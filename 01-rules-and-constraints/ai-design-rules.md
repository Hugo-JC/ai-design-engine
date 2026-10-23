# Diretrizes Científicas e Práticas de UI/UX Design

Este documento reúne regras extraídas de sistemas de design consolidados (Material Design 3, Human Interface Guidelines, Radix UI, Tailwind CSS) e artigos de usabilidade (Nielsen Norman Group).

---

## 1. Tipografia e Ritmo Vertical
- **Escala Modular:** Utilize razões de proporção claras (ex: `1.25` Major Third ou `1.333` Perfect Fourth).
  - H1: `2.5rem` (40px) a `3.5rem` (56px) - Peso: Bold / ExtraBold
  - H2: `1.75rem` (28px) a `2.25rem` (36px) - Peso: SemiBold
  - Body: `1rem` (16px) - Line-height: `1.5` a `1.6` (nunca inferior a 1.4)
  - Small / Caption: `0.875rem` (14px) - Line-height: `1.4`
- **Hierarquia:** Combine variação de tamanho COM variação de peso e opacidade de cor (ex: Título em `#FFFFFF`, Subtítulo em `#A1A1AA`).

## 2. Espaçamento e Respiro (Grid de 8px)
- **Regra Fundamental:** Todos os valores de `padding`, `margin` e `gap` devem ser múltiplos de 8px (8, 16, 24, 32, 48, 64, 96, 128).
- **Sem Linhas Desnecessárias (`---` ou `<hr>`):**
  - NÃO use linhas divisórias para separar seções.
  - A separação entre seções deve ser feita por alteração no tom do fundo (`background`) ou com grandes blocos de respiro (`padding-y: 64px` a `128px`).

## 3. Botões e Raios de Borda (Border Radius)
- **Fim dos Botões Quadrados Sem Propósito:**
  - Botões normais devem possuir um `border-radius` harmonioso com o restante da interface (`6px`, `8px` ou `12px` para um visual moderno; `9999px` para estilo *Pill*).
  - O valor `0px` só é permitido em estética Neo-Brutalista com bordas pretas sólidas e sombras de projeção dura.
- **Hierarquia de Botões:**
  - **Primary:** Preenchimento sólido, maior contraste.
  - **Secondary:** Fundo sutil / tom de cinza.
  - **Ghost / Tertiary:** Apenas texto, com efeito hover visível.

## 4. Teoria e Aplicação Proporcional de Cor (60-30-10)
- **60% Fundo / Neutros:** Cores de fundo (Canvas) e superfícies principais.
- **30% Estrutura:** Cards, bordas, divisores discretos, texto secundário.
- **10% Accent (Ação):** Reservado EXCLUSIVAMENTE para botões primários, badges de destaque e estados ativos. NUNCA preencha fundos grandes com a cor de destaque.
- **Acessibilidade (WCAG 2.1):**
  - Texto Normal: Contraste mínimo de `4.5:1`.
  - Texto Grande (H1/H2): Contraste mínimo de `3:1`.

---

## Secções adicionadas (acabamento e consistência)

## 5. Tipografia Avançada (Acabamento)
- **Tracking (letter-spacing) de títulos:** manter entre `-0.02em` e `0em`. Valores como `-0.04em` ou `tracking-tighter` fazem as letras tocar-se. Em texto MAIÚSCULO e eyebrows pequenos, usar tracking positivo (`0.04em` a `0.12em`).
- **Quebras de linha:** títulos com `text-wrap: balance` (Tailwind 3.4+: `text-balance`); parágrafos com `text-wrap: pretty`. Evitar palavras órfãs na última linha.
- **Número + unidade:** ligar com espaço não separável (`1.200&nbsp;m`, `72&nbsp;h`).
- **Medida de leitura:** parágrafos entre 45 e 75 caracteres por linha (`max-w-prose` ou `max-w-[60ch]`).
- **Ênfase em títulos:** no máximo UMA palavra/expressão em itálico ou cor de destaque por título.

## 6. Composição e Elementos Flutuantes
- Cards/badges flutuantes sobre uma ilustração só podem sobrepor a margem do elemento principal (máx. ~20%). Nunca cobrir a parte que identifica o objeto.
- Máximo de 2 elementos flutuantes por hero.
- Listas curtas de factos/bullets (até 4 itens) usam `grid` com colunas fixas ou uma única fila, nunca `flex-wrap` que gere quebras desiguais.
- A ilustração principal tem de ser reconhecível à primeira vista. Se não for possível com SVG, usar placeholder de fotografia com orientação de enquadramento.

## 7. Divisores Disfarçados
- A regra "Sem Linhas Desnecessárias" também vale para `border-t`, `border-b`, `divide-y`, `border-top` e `h-px` usados como separador entre blocos. Bordas são permitidas em contentores (cards, inputs, botões), não como linha solta.

## 8. Consistência entre Gerações
- Decisões de estilo (style_id, modo, fontes, arquétipo de layout) são tomadas UMA vez, no DESIGN BRIEF, e depois seguidas à letra.
- Valores de espaçamento arbitrários devem ser múltiplos de 4px no mínimo, e de 8px sempre que possível.
