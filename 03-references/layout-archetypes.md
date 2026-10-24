# Arquétipos de Layout (Opções de Fuga do Genérico)

Objetivo: impedir que toda a página seja "texto à esquerda + imagem à direita + 3 cards". A IA deve escolher UM arquétipo de hero e justificá-lo no DESIGN BRIEF. Os arquétipos não substituem o `style_id`: este define a aparência, o arquétipo define a estrutura.

## 1. Arquétipos de Hero

| ID | Nome | Descrição | Bom para | Cuidado |
| :--- | :--- | :--- | :--- | :--- |
| H1 | Split assimétrico | Texto e visual em colunas 7/5, com o visual a sangrar para a margem | Produtos com visual forte | Não usar 50/50; máx. 2 elementos flutuantes |
| H2 | Tipográfico puro | Título gigante, sem imagem, com uma linha de apoio | Editorial, luxo, portfólio | Exige copy excelente |
| H3 | Full-bleed | Fotografia ou vídeo a ecrã inteiro, texto ancorado a um canto | Hospitalidade, moda, viagens | Garantir contraste do texto (overlay) |
| H4 | Bento hero | Título + mosaico de 3 a 5 células com dados, produto e prova | SaaS, produtos com várias funcionalidades | Células com tamanhos diferentes |
| H5 | Produto em escala | Produto enorme e cortado pela margem, texto mínimo | Embalagens, hardware, calçado | Produto tem de ser reconhecível |
| H6 | Pesquisa primeiro | Barra de pesquisa/filtros como elemento principal | Marketplaces, imobiliário, viagens | Máx. 3 campos visíveis |
| H7 | Marquee/ticker | Título + faixa de texto/ícones em movimento lento | Cultura, eventos, marcas jovens | Respeitar `prefers-reduced-motion` |
| H8 | Índice editorial | Título + lista numerada de secções/projetos | Portfólio, publicações | Hover claro em cada linha |
| H9 | Narrativo | Título curto que abre uma história em capítulos ao fazer scroll | Marcas com história, origem | Só com ritmo e conteúdo reais |

## 2. Arquétipos de Secção de Funcionalidades
- **F1 Bento:** células de tamanhos diferentes, uma "principal" e as restantes de apoio.
- **F2 Linhas alternadas:** texto e visual alternam, cada linha com visual diferente.
- **F3 Passos numerados:** 01/02/03 com ilustração mínima, ideal para "como funciona".
- **F4 Abas:** um painel por aba, com demonstração real.
- **F5 Comparação:** tabela "antes vs. depois" ou "nós vs. alternativa".
- **F6 Sticky scroll:** texto fixo de um lado, visuais a mudar do outro.

## 3. Prova Social
- **S1 Mural de citações:** 4 a 6 citações com alturas diferentes, nome e contexto reais.
- **S2 Métricas:** 3 a 4 números grandes com legenda curta.
- **S3 Estudo de caso:** cartão grande com resultado concreto.
- **S4 Logos com contexto:** logos acompanhados de uma frase do que fizeram.

## 4. Navegação
- **N1 Barra mínima:** logo + 2 a 3 links + CTA.
- **N2 Pill flutuante:** barra em cápsula centrada, com blur subtil.
- **N3 Lateral:** menu vertical para dashboards e conteúdo extenso.

## 5. Rodapé
- **R1 Wordmark gigante:** nome da marca em tamanho enorme no fundo.
- **R2 Colunas limpas:** 3 colunas de links, sem divisores, com fundo ligeiramente diferente.

## 6. Matriz Nicho → Arquétipos Recomendados

| Nicho | Hero | Funcionalidades | Prova social |
| :--- | :--- | :--- | :--- |
| Café / alimentar artesanal | H1 (visual forte), H3 ou H5 | F3 (processo), F2 | S1, S4 |
| Bem-estar / cosmética | H2 ou H3 | F2 | S1 |
| Moda / e-commerce | H3 ou H5 | F1 | S2 |
| SaaS / IA | H4 ou H1 | F1, F4, F6 | S2, S3 |
| Fintech / enterprise | H1 ou H4 | F5, F3 | S3, S4 |
| Imobiliário / marketplace | H6 | F3, F1 | S2, S1 |
| Portfólio | H2 ou H8 | F2 | S4 |
| Educação / blog | H2 ou H8 | F1 | S2 |
| Comunidade / jogos | H1 ou H7 | F1 | S2 |
| Tatuagem / barbearia | H3 ou H2 | F2 | S1 |
| Jovem / crypto | H7 ou H1 | F1 | S2 |
| Restaurante | H3 | F2 | S1 |
| Bebidas / embalagem de consumo | H5 (H7, H3) | F2, F1 | S2 |
| Hardware / engenharia / arquitetura | H1 (H2, H8) | F3, F5, F6 | S3, S4 |
| Clínicas / saúde | H1 (H2) | F3, F2 | S1, S2 |

## 7. Regra de Escolha
1. Procurar o nicho na matriz.
2. Escolher o arquétipo cujo requisito de conteúdo a página realmente cumpre (ex: H5 só se existir produto reconhecível).
3. Registar no brief: `Arquétipo de hero: H? — porquê`.
4. `node tools/route.js "<pedido>" --context` já devolve as linhas destes arquétipos para o nicho (hero, alternativas, funcionalidades, prova, navegação, rodapé).
4. Se for H1, indicar a assimetria usada (ex: 7/5) e quais são os (máx. 2) elementos flutuantes.
