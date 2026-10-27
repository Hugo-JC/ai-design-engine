# 🌙 12. Design de Sistemas Dark Mode e Acessibilidade

_Canal / Fonte: Material Design 3 & WebAIM Guidelines_

---

## Regras Práticas (SE / ENTÃO)

### 12.1. Fundo Preto Puro vs. Cinza Profundo

- **SE** desenhar um tema Dark Mode, **ENTÃO** EVITE usar fundo preto puro (`#000000`) em todas as superfícies.
- **Ação:** Use cinza escuro profundo (ex: `#09090B` ou `#121212`). O cinza reduz a fadiga visual e permite criar camadas de elevação usando tons ligeiramente mais claros para os cards (`#18181B`, `#27272A`).

### 12.2. Prevenção de Deslumbramento Visual (Glare)

- **SE** colocar texto sobre fundo escuro, **ENTÃO** NÃO use texto em branco puro (`#FFFFFF`) com opacidade de 100% em grandes blocos de texto.
- **Ação:** Use branco suave com 90% a 95% de opacidade (`#FAFAFA` ou `text-zinc-100`) para evitar o efeito de halo e cansaço visual.

### 12.3. Teste de Contraste Obrigatório (WCAG 2.1 AA)

- **SE** definir combinações de cores para texto e fundo, **ENTÃO** valide que a taxa de contraste é superior a `4.5:1` para texto normal e `3:1` para títulos grandes.
