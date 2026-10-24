# 💵 5. Arquitetura e Design de Tabelas de Preços de Alta Conversão
*Canal / Fonte: Flux Academy (Ran Segall)*

---

## Regras Práticas (SE / ENTÃO)

### 5.1. Destaque Visual do Plano Recomendado
- **SE** apresentar 3 ou mais planos de preços numa tabela, **ENTÃO** faça o plano central (Mais Popular) sobressair visualmente.
- **Ação:** Aumente ligeiramente a escala do card (`scale-105`), adicione uma borda colorida com a cor de destaque (*accent*) e inclua uma badge superior (ex: *"Ideal para Equipas"*).

### 5.2. Ancoragem de Preços (Price Anchoring)
- **SE** houver opção de pagamento Anual vs. Mensal, **ENTÃO** exiba o seletor com o preço equivalente mensal do plano anual em destaque, mostrando a percentagem de economia (ex: *"Economize 20%"* em badge verde).

### 5.3. Clareza nos Recursos Incluídos
- **SE** listar recursos incluídos em cada plano, **ENTÃO** use ícones marcadores distintos (Check verde para incluído, traço cinza suave para não incluído).
- **Ação:** Ordene os recursos do mais valioso para o mais comum.
