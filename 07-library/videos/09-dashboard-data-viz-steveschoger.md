# 📊 9. Design de Dashboards e Visualização de Dados
*Canal / Fonte: Steve Schoger (Refactoring UI)*

---

## Regras Práticas (SE / ENTÃO)

### 9.1. Cartões de KPI com Tendência Clara
- **SE** exibir métricas principais (KPIs) num dashboard, **ENTÃO** mostre o número em tamanho grande acompanhado do indicador de variação percentual com cor e ícone de direção (ex: `▲ +12.5%` em verde sutil para crescimento).

### 9.2. Tabelas de Dados Legíveis
- **SE** criar tabelas de dados complexas, **ENTÃO**:
  - Alinhe textos à **esquerda**.
  - Alinhe números e valores monetários à **direita**.
  - Use fontes numéricas monoespaçadas ou `font-variant-numeric: tabular-nums` para que os números não oscilem ao mudar.

### 9.3. Cores em Gráficos
- **SE** desenhar gráficos de linha ou barras, **ENTÃO** NÃO use uma cor diferente para cada barra sem motivo funcional. Use tons da mesma cor primária e reserve cores contrastantes apenas para destacar dados anómalos ou metas.
