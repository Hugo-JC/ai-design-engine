# ✨ 4. Micro-interações e Animações Orientadas a UX
*Canal / Fonte: Juxtopposed (Creative Frontend & UI)*

---

## Regras Práticas (SE / ENTÃO)

### 4.1. Animação com Propósito
- **SE** adicionar animações em botões, modais ou transições de página, **ENTÃO** NUNCA use animações puramente decorativas com duração superior a `300ms`.
- **Ação:** Mantenha a duração entre `150ms` e `250ms` com curvas de aceleração naturais (`cubic-bezier(0.16, 1, 0.3, 1)` ou `ease-out`).

### 4.2. Feedback Visual Imediato para Ações do Utilizador
- **SE** o utilizador clicar num botão de submissão ou cópia de link, **ENTÃO** altere instantaneamente o estado visual do botão (ex: ícone de check ✅ + alteração sutil da cor do fundo).
- **Objetivo:** Eliminar a incerteza do utilizador sobre se o clique foi registrado.

### 4.3. Hover Effects em Cards
- **SE** um card for totalmente clicável, **ENTÃO** aplique um efeito de transição tridimensional suave (ex: elevação vertical de `translate-y-[-4px]` + brilho sutil na borda `border-white/20`).
