# Design Intelligence Playbook
## Referências de qualidade, não templates

Este playbook converte observação de sites reais em decisões de design. Estuda princípios transferíveis; nunca replica composição, copy, ativos, identidade ou componentes proprietários. As referências são pontos de contraste, não uma estética única a aplicar a tudo.

## 1. Dossiês de referência

### Tim Wendelboe — craft editorial e produto com espaço
Fonte: https://timwendelboe.no/
- **O que observar:** hierarquia de loja orientada pelo produto, navegação por categorias claras, fotografia de produto e origem, tom contido, conteúdo editorial que explica processo e proveniência.
- **Princípio transferível:** deixar que o produto, os materiais e a história conduzam a página; não preencher cada área com badges, cartões, sombras ou slogans.
- **Quando usar:** café, gastronomia, artesanato, moda, beleza, marcas de autor e comércio com história real.
- **Não copiar:** estrutura da loja, fotografia, nomenclatura, cores exatas ou arranjo de secções.

### Aesop — contenção sensorial e contexto
Fonte: https://www.aesop.com/philosophy-on-design.html
- **O que observar:** sistema visual contido, linguagem precisa, fotografia tratada como composição, materiais e contexto a reforçar a marca; a simplicidade não depende de eliminar personalidade.
- **Princípio transferível:** usar poucos elementos, mas fazer cada um ter intenção; permitir variação editorial e contextual em vez de aplicar uma grelha rígida a tudo.
- **Quando usar:** skincare, perfumaria, hospitalidade, lifestyle, produtos premium e marcas com narrativa material.
- **Não copiar:** paleta, rótulos, embalagem, identidade verbal ou composição das páginas.

### Apple — demonstração focada no produto
Fonte: https://www.apple.com/
- **O que observar:** foco por secção, títulos legíveis, demonstração visual do produto, progressão narrativa e hierarquia clara entre informação e ação.
- **Princípio transferível:** cada secção deve responder a uma pergunta do utilizador; a escala visual e a imagem devem demonstrar o benefício, não decorar.
- **Quando usar:** hardware, tecnologia de consumo, produtos com atributos visuais demonstráveis e páginas de lançamento.
- **Não copiar:** hero, slogans, sequência exata de secções, imagens ou linguagem de marca.

### Linear — clareza de produto digital e detalhe funcional
Fonte: https://linear.app/homepage
- **O que observar:** interface demonstrada dentro do contexto, tipografia controlada, hierarquia de produto, contraste disciplinado e movimento ao serviço da compreensão.
- **Princípio transferível:** mostrar o produto real cedo; usar detalhes e motion para explicar estado, fluxo ou valor, nunca como ruído.
- **Quando usar:** SaaS, ferramentas para equipas, developer tools e produtos digitais com interface própria.
- **Não copiar:** composição do site, gradientes, ilustrações, paleta ou componentes específicos.

### Stripe — complexidade organizada
Fonte: https://stripe.com/
- **O que observar:** informação densa organizada por níveis, provas e casos de uso ligados à mensagem principal, mistura de explicação e demonstração.
- **Princípio transferível:** complexidade não exige amontoar elementos; agrupar por intenção, criar pausas e deixar claro o próximo passo.
- **Quando usar:** fintech, APIs, plataformas B2B, infraestruturas e produtos com várias audiências.
- **Não copiar:** layout, métricas, marcas de clientes, gradientes ou estrutura exata.

## 2. Anti-monocultura: escolha uma direção, não um preset visual universal

Antes do código, regista no DESIGN BRIEF:
1. **Essência da marca:** três atributos concretos, sem adjetivos vazios como “moderno”.
2. **Emoção e energia:** quieta/editorial, técnica/precisa, calorosa/humana, expressiva/lúdica, luxuosa/sensorial, etc.
3. **Comportamento do conteúdo:** produto em foco, leitura editorial, demonstração de software, exploração, conversão ou ferramenta de trabalho.
4. **Estratégia tipográfica:** escolha justificada para o nicho. Define display, texto e, apenas se necessário, uma terceira fonte funcional. Não reutilizes automaticamente a mesma família ou par de fontes.
5. **Estratégia de composição:** hero e ritmo de secções escolhidos pelo conteúdo. Evita usar o split esquerda/direita como resposta automática.
6. **Paleta:** base, superfície, texto e um accent disciplinado; permite que fotografia e produto tragam as suas próprias cores.
7. **Movimento:** escolhe no máximo 2–3 famílias de motion relevantes para a história da página.
8. **Assinatura própria:** um gesto visual específico e útil (recorte fotográfico, escala tipográfica, composição assimétrica, detalhe de material, visualização de produto, etc.).

Não escolhas um estilo só porque parece premium. Um site de uma padaria, um SaaS de infraestrutura e um estúdio de arquitetura não devem receber a mesma tipografia, hero, cartões, raio, paleta ou animação.

## 3. Espaço e ritmo — regras práticas

- Usa um container com largura de leitura definida e margens laterais generosas; em ecrãs largos, não estiques parágrafos por toda a viewport.
- Usa uma escala de espaçamento coerente baseada em 8 px (com 4 px para ajustes pequenos). Secções principais precisam de espaço vertical perceptível; não basta separar os elementos por 16 px.
- Define distância por relação: título → texto, texto → ação, ação → visual, e secção → secção. Não uses o mesmo gap em todas as relações.
- Alterna densidade de forma deliberada: secção de impacto visual, conteúdo editorial, demonstração, detalhes ou prova. Não transformes tudo em grelhas de cartões iguais.
- Uma secção pode ser só título, texto e uma imagem forte. Espaço vazio é estrutura, não espaço desperdiçado.
- Limita a largura de parágrafos longos; usa line-height confortável e quebra de linhas pensada.
- Usa divisões de superfície, composição e espaço em vez de linhas horizontais decorativas.
- Em mobile, mantém margens e respiro; não reduzas tudo até parecer comprimido.

## 4. Tipografia com personalidade

- Escolhe a tipografia a partir da voz e do conteúdo, não de uma lista de fontes da moda.
- Considera combinações distintas: serif editorial + sans neutra; sans humanista + mono técnica; grotesk expressiva + texto legível; ou uma única família bem usada. A combinação deve fazer sentido, não cumprir uma fórmula.
- Não uses Inter, Poppins, DM Sans, Space Grotesk ou qualquer outra fonte como default universal. São opções, não identidade.
- Cria escala com contraste claro entre display, headings, corpo, legenda e labels. Evita usar o mesmo peso e tamanho em quase tudo.
- Usa display grande apenas quando o conteúdo e a marca o suportam. Um headline enorme não torna automaticamente um site premium.
- Ajusta comprimento de linha, line-height, tracking e quebras para o texto real; usa text-wrap: balance em títulos e text-wrap: pretty em parágrafos quando suportado.
- Se a fonte externa falhar, inclui fallbacks coerentes e evita esconder conteúdo enquanto a fonte carrega.

## 5. Motion e microinterações — intenção antes do efeito

### Princípios
- Cada movimento deve comunicar hierarquia, continuidade, feedback ou descoberta. Se não melhorar compreensão ou sensação de controlo, remove-o.
- Usa uma curva e uma duração consistentes por família de interação. Como ponto de partida: feedback de controlo 120–200 ms; transições de estado 180–280 ms; revelações de secção 350–650 ms. Ajusta ao contexto e não atrases ações.
- Prefere transform e opacity a animar propriedades que provoquem layout ou repintura cara.
- Não animes cada cartão em sequência longa. Usa stagger discreto só quando ajuda a perceber um grupo.
- Não uses cursor personalizado, tilt, parallax forte, blobs em loop, contadores falsos ou hover que mexa no layout por defeito.
- Não escondas conteúdo essencial até o JavaScript ou o IntersectionObserver funcionar.
- Respeita prefers-reduced-motion: reduce; a versão reduzida deve continuar completa e compreensível.

### Padrões recomendados
- **Entrada de página:** uma transição curta e subtil num ou dois elementos principais, não uma coreografia de toda a página.
- **Scroll reveal:** revelar secções ou imagens quando isso ajuda o ritmo. Uma única aparição discreta; não repetir a animação sempre que o utilizador cruza o limiar.
- **Imagem de produto:** escala ou deslocamento muito pequeno apenas se reforçar materialidade ou foco; nunca competir com a informação.
- **Links e botões:** mudança subtil de cor, sublinhado ou posição de ícone; alvo estável e foco visível.
- **Controlos:** feedback imediato de pressionado, selecionado, carregamento, sucesso, erro e disabled.
- **Navegação:** transição curta e previsível, sem bloquear acesso ao conteúdo.

## 6. Checklist anti-AI-slop antes de entregar

Responder honestamente:
- Se removermos o logótipo, a página ainda parece pertencer a esta marca?
- A tipografia foi escolhida para esta marca ou é a combinação usada na última geração?
- Existe espaço real entre secções e uma hierarquia de densidade?
- O hero é a melhor forma de mostrar este conteúdo, ou apenas o padrão mais fácil?
- Cada cartão, badge, linha, sombra e efeito tem uma função clara?
- As animações melhoram a compreensão e respeitam movimento reduzido?
- O mobile mantém o mesmo cuidado de composição e espaçamento?
- As referências foram traduzidas em princípios e não copiadas?
- A página tem pelo menos uma decisão visual específica que não seria adequada a qualquer outro pedido?

Se duas ou mais respostas forem “não”, rever a composição antes de polir o código.

## 7. Registo das referências no brief

Formato recomendado:
- Tim Wendelboe → produto e história com espaço editorial | não copiados: layout, copy, imagens
- Aesop → contenção sensorial e contexto | não copiados: paleta, embalagem, identidade
- Linear → demonstração de produto e motion funcional | não copiados: composição, gradientes, componentes

Usa no máximo três referências por projeto e escolhe-as por necessidade real. Se a referência não acrescenta um princípio novo, não a incluas.
