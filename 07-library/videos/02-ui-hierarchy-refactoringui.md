# 🎨 2. Princípios Fundamentais de UI & Hierarquia Visual
*Canal / Fonte: Refactoring UI (Adam Wathan & Steve Schoger)*

---

## Regras Práticas (SE / ENTÃO)

### 2.1. Hierarquia Tipográfica sem Depender Apenas do Tamanho
- **SE** precisar criar contraste entre títulos e textos secundários, **ENTÃO** NÃO dependa apenas do tamanho da fonte (`font-size`).
- **Ação:** Combine tamanho, peso da fonte (`font-weight`) e cor/opacidade.
  - Título: Preto Puro/Branco Puro, Bold (`font-bold`).
  - Texto Secundário: Cinza Médio (`#64748B` / `#A1A1AA`), Regular/Medium.

### 2.2. Layouts sem Depender de Linhas e Divisores (`<hr>`)
- **SE** precisar separar dois blocos ou elementos dentro de uma interface, **ENTÃO** EVITE desenhar linhas horizontais ou bordas escuras.
- **Ação:** Use **Espaço em Branco (White Space)** no grid de 8px ou altere a cor de fundo do container (`background-color`).

### 2.3. Cores de Destaque e a Regra 60-30-10
- **SE** estiver a aplicar a cor de destaque da marca (*accent color*), **ENTÃO** NUNCA preencha grandes superfícies ou fundos de cards com essa cor.
- **Ação:** Reserve a cor de destaque estritamente para elementos de ação primária (botões de conversão, badges ativas, links e indicadores de foco).

### 2.4. Profundidade Real através de Sombras em Camadas
- **SE** for aplicar sombras (`box-shadow`) em modais ou cards flutuantes, **ENTÃO** EVITE sombras pretas duras e concentradas.
- **Ação:** Combine duas ou três sombras suaves com blur elevado e opacidade baixa (ex: `shadow-2xl shadow-black/5`), simulação de luz natural.

### 2.5. Ajuste Proporcional de Raios de Borda (*Border Radius*)
- **SE** um container curvo tiver elementos internos com borda (ex: botões dentro de um card), **ENTÃO** o raio de borda interno deve ser menor que o raio do container pai.
- **Fórmula:** `Radius_Interno = Radius_Externo - Padding_Interno`.
