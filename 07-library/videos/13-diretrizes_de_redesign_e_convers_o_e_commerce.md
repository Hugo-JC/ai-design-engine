# 🎯 Diretrizes Práticas de UI/UX para Alta Conversão (E-Commerce)

Documento condensado de regras técnicas extraídas da análise de redesign de páginas de produto (Product Detail Page - PDP), otimizado para eliminar fricção e aumentar taxas de conversão.

---

## 1. Galeria e Imagens Principais (Hero Section)

- **SE** o produto possui variações de detalhes (texturas, embalagens, uso na vida real):
  - **ENTÃO** utilize uma galeria composta com _thumbnails_ interativas visíveis sem necessidade de rolagem.
  - **E** inclua pelo menos uma imagem com elemento de escala humana ou contexto de uso real.
- **SE** a imagem principal do produto for exibida:
  - **ENTÃO** garanta fundo neutro de alto contraste em relação ao produto para destacar a silhueta principal.
  - **NUNCA** use imagens genéricas de banco sem tratamento de cor coerente com a paleta da marca.

---

## 2. Prova Social e Confiança (Social Proof)

- **SE** houver avaliações de clientes disponíveis:
  - **ENTÃO** posicione a pontuação média (ex: `4.9 ★`) e o número total de avaliações imediatamente abaixo do título do produto, na dobrada superior da página (_above the fold_).
- **SE** o produto tiver destaques de imprensa, prêmios ou certificações:
  - **ENTÃO** exiba micro-badges ou logotipos simplificados em opacidade reduzida (`opacity-70`) próximos ao CTA principal para reforçar autoridade no momento da compra.
- **SE** for incluir depoimentos na página:
  - **ENTÃO** priorize avaliações com fotos reais de clientes, nome completo e destaque para o benefício principal no título do card.

---

## 3. Preço e Opções de Compra (Subscription & One-Time)

- **SE** o produto oferecer opção de compra única vs. assinatura recorrente:
  - **ENTÃO** crie cards com hierarquia visual distinta, destacando a opção de **Assinatura** com uma tag de economia (ex: `Economize 15%`).
  - **E** defina a opção de maior valor LTV (Assinatura) como pré-selecionada (_default state_), utilizando borda ativa (`border-2 border-accent`).
- **SE** o preço original possui desconto:
  - **ENTÃO** exiba o preço antigo rasurado com tom atenuado e o preço final em destaque tipográfico (peso `font-bold` ou `font-semibold`).

---

## 4. Botão de Ação Principal (CTA - Add to Cart)

- **SE** o utilizador estiver na seção do CTA principal:
  - **ENTÃO** o botão deve possuir o maior contraste visual da tela (cor de acento primária que não se repete em elementos secundários).
  - **E** o texto do botão deve ser claro e imperativo (ex: `Adicionar ao Cesto` ou `Experimentar Agora`).
  - **NUNCA** divida a atenção do CTA principal com botões secundários de mesmo peso visual. Botões secundários devem ser em estilo `outline` ou `ghost`.
- **SE** a página for rolada além do botão principal:
  - **ENTÃO** ative uma barra de compra fixa no rodapé ou topo (_sticky add-to-cart bar_) em telas móbile para manter a conversão a um clique de distância.

---

## 5. Transparência de Entrega e Garantia

- **SE** o usuário estiver avaliando o produto no bloco final antes da decisão:
  - **ENTÃO** apresente ícones vetoriais simples acompanhados de microtextos com:
    - Prazo estimado de entrega com base na localização ou janela de envio (ex: `Envio em 24h-48h`).
    - Política de devolução ou garantia (ex: `30 dias de garantia de reembolso`).
    - Selo de frete grátis (se aplicável, indicando o valor restante para elegibilidade).

---

## 6. Arquitetura de Informação e Respiro Visual

- **SE** houver grande volume de especificações técnicas ou ingredientes:
  - **ENTÃO** organize o conteúdo em sanfonas interativas (_accordions_) para evitar poluição visual e rolagem excessiva.
- **SE** a página possuir múltiplas seções consecutivas:
  - **ENTÃO** aplique alternância de superfícies de fundo (`surface colors`) e espaçamento vertical proporcional ao grid de 8px (mínimo `py-16` / `64px`) para segmentar visualmente o fluxo de leitura sem o uso de linhas divisórias rígidas (`<hr>`).

```

---

### Resumo da Integração
Este arquivo já está no formato ideal para ser inserido na pasta `01-rules-and-constraints/` ou `03-references/` do repositório **AI Design Engine**, permitindo que a IA consulte diretamente regras de conversão para páginas e-commerce.
```
