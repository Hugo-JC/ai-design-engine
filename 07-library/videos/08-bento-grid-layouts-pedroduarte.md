# 🍱 8. Padrões de Bento Grid e Mosaico Visual
*Canal / Fonte: Pedro Duarte & Vercel Design Patterns*

---

## Regras Práticas (SE / ENTÃO)

### 8.1. Hierarquia de Tamanho nos Cards do Bento Grid
- **SE** organizar recursos num layout no estilo Bento Grid, **ENTÃO** crie um card principal de destaque (Hero Feature) ocupando 2 colunas e 2 linhas (ou 60% da área).
- **Ação:** Reserve os cards menores (1x1) para métricas rápidas, gráficos pontuais ou ilustrações secundárias.

### 8.2. Consistência de Raio de Borda e Padding
- **SE** alinhar múltiplos cards num mosaico, **ENTÃO** mantenha o mesmo raio de borda em todos os cards (`rounded-2xl` / `24px`) e o mesmo espaçamento de separação (`gap-4` ou `gap-6`).

### 8.3. Iluminação sutil no Fundo do Grid
- **SE** o tema do Bento Grid for Dark Mode, **ENTÃO** adicione um ponto de luz desfocado ao fundo (`bg-gradient-to-b` com `blur-3xl` sutil) para dar tridimensionalidade sem poluir o texto.
