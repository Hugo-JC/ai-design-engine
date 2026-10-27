# Regras Essenciais de Web Design

> Guia prático de regras de design para criação de websites modernos, acessíveis, rápidos e centrados no usuário.  
> Atualizado para web design atual: mobile-first, performance, acessibilidade, design systems e IA.

---

## 1. Princípios fundamentais

### 1.1 Clareza antes de estética

Um site bonito que confunde o usuário falhou. Antes de escolher cores, fontes ou animações, defina:

- Qual é o objetivo da página?
- Qual ação principal o usuário deve realizar?
- Quem é o usuário e qual problema ele quer resolver?

**Regra:** cada página deve ter um objetivo claro e uma ação principal evidente.

### 1.2 Hierarquia visual

A hierarquia guia o olhar do usuário do elemento mais importante para o menos importante.

Use estes recursos para criar hierarquia:

- Tamanho: títulos maiores que textos de apoio.
- Peso: negrito para informações essenciais.
- Cor: destaque para botões, links e alertas.
- Espaço: elementos importantes isolados chamam mais atenção.
- Posição: conteúdo crítico no topo ou em áreas de maior atenção.

**Regra:** em cada seção, o usuário deve identificar rapidamente o que é título, apoio, ação e informação secundária.

### 1.3 Menos é mais

Evite excesso de elementos, textos, cores, ícones e animações.

- Remova tudo que não apoia o objetivo da página.
- Prefira uma mensagem forte a várias mensagens fracas.
- Use espaço em branco como ferramenta de organização.
- Limite cada seção a uma ideia principal.

**Regra:** se um elemento não ajuda o usuário a entender, decidir ou agir, considere removê-lo.

### 1.4 Consistência

Padrões consistentes reduzem o esforço cognitivo.

Mantenha consistência em:

- Tipografia.
- Cores.
- Espaçamentos.
- Botões.
- Ícones.
- Estados de interação.
- Navegação.
- Tom de voz.

**Regra:** componentes com a mesma função devem ter a mesma aparência e comportamento em todo o site.

---

## 2. Layout e composição

### 2.1 Use uma grade

A grade organiza o conteúdo e cria alinhamento previsível.

- Use uma grade de 12 colunas para layouts desktop.
- Adapte para 8, 6, 4 ou 2 colunas conforme o breakpoint.
- Alinhe textos, imagens, cards e botões à grade.
- Evite posicionamentos aleatórios.

**Regra:** nada deve parecer “colocado por acaso”; cada elemento deve se conectar visualmente a outro.

### 2.2 Mobile-first

Projete primeiro para telas pequenas e depois expanda para telas maiores.

- Priorize conteúdo essencial.
- Use botões grandes o suficiente para toque.
- Evite menus complexos no mobile.
- Garanta que a ação principal apareça sem rolagem excessiva.
- Teste em telas de 320px a 1920px ou mais.

**Regra:** se não funciona bem no celular, o design ainda não está pronto.

### 2.3 Espaçamento consistente

O espaço em branco melhora legibilidade, foco e percepção de qualidade.

- Defina uma escala de espaçamento, por exemplo: 4, 8, 12, 16, 24, 32, 48, 64, 96 e 128px.
- Use espaçamento maior entre grupos diferentes.
- Use espaçamento menor entre itens relacionados.
- Não comprima textos e botões para “caber” mais conteúdo.

**Regra:** proximidade agrupa; distância separa.

### 2.4 Alinhamento intencional

- Alinhe textos à esquerda na maioria dos casos.
- Centralize apenas títulos curtos, hero sections e chamadas isoladas.
- Evite texto justificado na web, pois cria espaçamentos irregulares.
- Mantenha uma largura de leitura confortável.

**Regra:** para parágrafos, use aproximadamente 45 a 75 caracteres por linha.

---

## 3. Tipografia

### 3.1 Escolha poucas fontes

- Use no máximo duas famílias tipográficas.
- Uma para títulos e outra para texto corrido é suficiente.
- Evite fontes decorativas em textos longos.
- Prefira fontes com boa legibilidade em telas.

**Regra:** a tipografia deve comunicar antes de decorar.

### 3.2 Crie escala tipográfica

Use uma escala consistente, por exemplo:

| Função          | Tamanho sugerido |
| --------------- | ---------------: |
| Display / Hero  |          48–72px |
| H1              |          36–48px |
| H2              |          28–36px |
| H3              |          22–28px |
| Corpo de texto  |          16–18px |
| Texto pequeno   |             14px |
| Legenda / label |          12–13px |

**Regra:** nunca use corpo de texto menor que 16px em conteúdo principal.

### 3.3 Legibilidade

- Use contraste adequado entre texto e fundo.
- Evite cinza muito claro sobre fundo branco.
- Use `line-height` entre 1.4 e 1.6 para textos corridos.
- Evite linhas muito longas ou muito curtas.
- Não use caixa alta em parágrafos longos.

**Regra:** se o usuário precisa se esforçar para ler, a tipografia falhou.

---

## 4. Cor

### 4.1 Limite a paleta

Uma paleta eficiente normalmente contém:

- 1 cor primária.
- 1 ou 2 cores de apoio.
- 1 cor de destaque para ações.
- Tons neutros para fundo, texto, bordas e superfícies.
- Cores semânticas: sucesso, erro, aviso e informação.

**Regra:** use cor com propósito, não como decoração.

### 4.2 Hierarquia por cor

- Use a cor primária para a identidade da marca.
- Use a cor de destaque principalmente para ações importantes, como “Comprar”, “Enviar” ou “Começar”.
- Não use a mesma cor intensa para tudo.
- Cores saturadas chamam atenção; use-as com moderação.

**Regra:** se tudo é destacado, nada é destacado.

### 4.3 Contraste e acessibilidade

Siga as diretrizes WCAG:

- Texto normal: contraste mínimo de 4.5:1.
- Texto grande: contraste mínimo de 3:1.
- Elementos de interface e ícones importantes: contraste mínimo de 3:1.
- Não use apenas cor para comunicar estado; combine com ícone, texto ou padrão.

**Regra:** teste o contraste antes de aprovar o design.

---

## 5. Navegação e arquitetura

### 5.1 Navegação previsível

- Mantenha o menu principal no mesmo lugar em todas as páginas.
- Use rótulos claros, como “Serviços”, “Preços”, “Contato” e “Sobre”.
- Evite nomes criativos que confundem o usuário.
- Destaque a página atual no menu.
- Inclua uma forma simples de voltar à página inicial.

**Regra:** o usuário deve sempre saber onde está e como chegar a outro lugar.

### 5.2 Regra dos três cliques

O usuário deve conseguir chegar às informações principais com poucos cliques.

- Não esconda conteúdo essencial em menus profundos.
- Use páginas de categorias, filtros e links contextuais.
- Crie atalhos para ações frequentes.

**Regra:** quanto menos passos entre intenção e ação, melhor.

### 5.3 Breadcrumbs e busca

Para sites grandes, adicione:

- Breadcrumbs em páginas internas.
- Busca visível quando houver muito conteúdo.
- Filtros claros em catálogos, blogs e e-commerces.
- Resultados de busca úteis, com destaques e filtros.

**Regra:** navegação deve reduzir esforço, não criar labirintos.

---

## 6. UI e componentes

### 6.1 Botões

- Um botão primário por seção ou contexto.
- Botões secundários para ações menos importantes.
- Botões terciários ou links para ações discretas.
- Área de toque mínima recomendada: 44 x 44px.
- Deixe claro o que o botão faz.

Exemplos bons:

- “Agendar demonstração”
- “Adicionar ao carrinho”
- “Baixar guia gratuito”
- “Criar conta”

Exemplos vagos:

- “Clique aqui”
- “Saiba mais”
- “Enviar”

**Regra:** o texto do botão deve descrever a ação com clareza.

### 6.2 Formulários

- Peça apenas informações necessárias.
- Use labels visíveis, não apenas placeholders.
- Agrupe campos relacionados.
- Mostre erros perto do campo com mensagem clara.
- Indique campos obrigatórios.
- Use botão de envio com texto específico.

**Regra:** cada campo extra reduz a taxa de conclusão.

### 6.3 Estados de interface

Todo componente interativo deve ter estados definidos:

- Padrão.
- Hover.
- Foco.
- Ativo / pressionado.
- Desabilitado.
- Carregando.
- Sucesso.
- Erro.

**Regra:** o site deve responder visualmente a cada ação do usuário.

### 6.4 Feedback imediato

- Confirme cliques e envios.
- Mostre carregamento quando houver espera.
- Informe sucesso ou erro de forma clara.
- Use mensagens humanas, específicas e úteis.

Exemplo ruim: “Erro.”  
Exemplo bom: “Não foi possível enviar o formulário. Verifique seu e-mail e tente novamente.”

---

## 7. UX e psicologia

### 7.1 Não me faça pensar

O usuário não deve precisar decifrar a interface.

- Torne links e botões visualmente clicáveis.
- Use linguagem simples.
- Evite jargões desnecessários.
- Mostre o próximo passo com clareza.
- Reduza escolhas desnecessárias.

**Regra:** a melhor interface é aquela que parece óbvia.

### 7.2 Lei de Hick

Quanto mais opções, mais tempo para decidir.

- Limite opções visíveis por tela.
- Agrupe alternativas em categorias.
- Destaque a opção recomendada.
- Use filtros em vez de listas longas.

**Regra:** ofereça escolhas, mas facilite a decisão.

### 7.3 Lei de Fitts

Alvos maiores e mais próximos são mais fáceis de usar.

- Botões principais devem ser grandes.
- Evite áreas de clique muito pequenas.
- Posicione ações importantes onde o usuário espera encontrá-las.
- No mobile, coloque ações principais ao alcance do polegar.

### 7.4 Prova social

Use com honestidade:

- Depoimentos.
- Avaliações.
- Números de clientes.
- Logos de parceiros.
- Estudos de caso.

**Regra:** prova social deve ser real, específica e relevante.

### 7.5 Reduza atrito

- Permita navegar sem cadastro sempre que possível.
- Ofereça checkout como visitante.
- Reduza campos obrigatórios.
- Evite pop-ups agressivos.
- Não interrompa o usuário no meio de uma tarefa.

**Regra:** cada obstáculo entre o usuário e seu objetivo reduz conversão.

---

## 8. Acessibilidade

### 8.1 Estrutura semântica

- Use um único `h1` por página.
- Mantenha uma hierarquia lógica de títulos.
- Use `nav`, `main`, `header`, `footer`, `section` e `article` corretamente.
- Use texto alternativo descritivo em imagens relevantes.
- Marque imagens decorativas como decorativas.

### 8.2 Navegação por teclado

- Todos os elementos interativos devem ser acessíveis por teclado.
- O foco deve ser sempre visível.
- A ordem de tabulação deve seguir a ordem visual.
- Evite remover o outline de foco sem substituí-lo por outro indicador claro.

### 8.3 Conteúdo acessível

- Use links descritivos.
- Não dependa apenas de cor.
- Ofereça contraste suficiente.
- Escreva textos alternativos úteis.
- Teste com leitores de tela quando possível.

**Regra:** acessibilidade não é recurso extra; é parte da qualidade do design.

---

## 9. Performance

### 9.1 Velocidade é design

Um site lento prejudica experiência, SEO e conversão.

- Comprima imagens.
- Use formatos modernos como WebP ou AVIF.
- Carregue fontes com cuidado.
- Evite scripts desnecessários.
- Use lazy loading para imagens abaixo da dobra.
- Minimize animações pesadas.

**Regra:** performance faz parte da experiência de design.

### 9.2 Imagens

- Use dimensões corretas para cada dispositivo.
- Evite imagens gigantes em containers pequenos.
- Prefira SVG para ícones, logotipos e ilustrações simples.
- Defina largura e altura para evitar layout shift.
- Use `alt` adequado.

### 9.3 Animações

Animações devem ajudar, não distrair.

- Use animações curtas, entre 150ms e 400ms.
- Anime apenas propriedades eficientes, como transform e opacity.
- Evite animações longas em ações repetitivas.
- Respeite `prefers-reduced-motion`.

**Regra:** animação deve explicar uma mudança, não chamar atenção para si mesma.

---

## 10. Conteúdo e copywriting

### 10.1 Escreva para escanear

Usuários geralmente escaneiam páginas.

- Use títulos claros.
- Escreva parágrafos curtos.
- Use listas quando apropriado.
- Destaque informações essenciais.
- Vá direto ao ponto.

### 10.2 Linguagem centrada no usuário

Fale sobre o benefício do usuário, não apenas sobre a empresa.

Em vez de:

> “Nossa plataforma utiliza tecnologia avançada.”

Escreva:

> “Crie seu site em minutos, sem precisar de código.”

**Regra:** o texto deve responder “o que eu ganho com isso?”.

### 10.3 CTA claro

Cada página deve ter uma chamada para ação principal.

- Use verbos de ação.
- Seja específico.
- Coloque o CTA em local visível.
- Repita o CTA em páginas longas.
- Evite CTAs concorrentes demais.

---

## 11. Design responsivo

### 11.1 Breakpoints

Não projete apenas para “desktop” e “mobile”. Considere:

- Mobile pequeno: até 480px.
- Mobile grande: 481–767px.
- Tablet: 768–1024px.
- Laptop: 1025–1440px.
- Desktop grande: acima de 1440px.

### 11.2 Adaptação de conteúdo

- Reorganize colunas em telas menores.
- Reduza menus para navegação mobile.
- Ajuste tamanhos de fonte proporcionalmente.
- Garanta que imagens não sejam cortadas de forma estranha.
- Evite tabelas largas sem rolagem ou adaptação.

**Regra:** responsivo não é apenas encolher o site; é reorganizar a experiência.

---

## 12. Design system

### 12.1 Crie tokens de design

Documente e padronize:

- Cores.
- Tipografia.
- Espaçamentos.
- Raios de borda.
- Sombras.
- Ícones.
- Botões.
- Formulários.
- Cards.
- Estados de interação.

Exemplo de tokens:

```css
--color-primary: #2563eb;
--color-text: #111827;
--color-background: #ffffff;
--radius-md: 8px;
--space-4: 16px;
--font-body: 16px;
```

### 12.2 Componentes reutilizáveis

Crie componentes com variações previsíveis:

- Botão: primário, secundário, fantasma, ícone.
- Card: simples, com imagem, com CTA.
- Input: padrão, erro, desabilitado, com ícone.
- Alerta: sucesso, erro, aviso, informação.

**Regra:** um design system economiza tempo e garante consistência.

---

## 13. Tendências atualizadas

### 13.1 Design limpo e funcional

A tendência atual privilegia:

- Interfaces simples.
- Muito espaço em branco.
- Tipografia forte.
- Contraste bem definido.
- Menos ruído visual.
- Microinterações úteis.

### 13.2 Dark mode

Se oferecer modo escuro:

- Não inverta cores automaticamente.
- Evite preto puro como fundo principal; prefira tons como `#0f172a` ou `#111827`.
- Reduza saturação de cores vibrantes.
- Teste contraste nos dois modos.

### 13.3 Microinterações

Use microinterações para dar vida e feedback:

- Hover em botões.
- Transição de menu.
- Confirmação de formulário.
- Animação de carregamento.
- Feedback ao adicionar item ao carrinho.

**Regra:** microinteração deve comunicar algo, não apenas enfeitar.

### 13.4 Personalização e IA

Sites modernos podem usar personalização, recomendações e assistentes de IA, mas com cuidado:

- Seja transparente sobre o uso de IA.
- Ofereça controle ao usuário.
- Evite respostas genéricas.
- Não substitua clareza por automação.
- Garanta privacidade e segurança dos dados.

---

## 14. Checklist final antes de publicar

### Estrutura

- [ ] O objetivo da página está claro?
- [ ] Existe uma ação principal visível?
- [ ] A hierarquia visual está correta?
- [ ] O conteúdo está organizado em blocos claros?

### Visual

- [ ] As fontes são legíveis?
- [ ] A paleta de cores é limitada e consistente?
- [ ] Os espaçamentos seguem uma escala?
- [ ] Os elementos estão alinhados?
- [ ] O contraste é suficiente?

### UX

- [ ] A navegação é previsível?
- [ ] Os botões têm textos claros?
- [ ] Os formulários são curtos e claros?
- [ ] Há feedback para todas as ações?
- [ ] O site funciona bem no mobile?

### Acessibilidade

- [ ] É navegável por teclado?
- [ ] O foco está visível?
- [ ] As imagens têm `alt` adequado?
- [ ] A cor não é o único indicador de estado?
- [ ] Os textos têm contraste adequado?

### Performance

- [ ] As imagens estão otimizadas?
- [ ] As fontes estão otimizadas?
- [ ] Não há scripts desnecessários?
- [ ] As animações são leves?
- [ ] O site foi testado em conexão lenta?

### Conversão

- [ ] O CTA está claro?
- [ ] O texto explica o benefício para o usuário?
- [ ] Há prova social quando relevante?
- [ ] O formulário pede apenas o necessário?
- [ ] O caminho até a conversão é curto?

---

## 15. Regras de ouro

1. Design existe para resolver problemas, não apenas para enfeitar.
2. O usuário é mais importante que a preferência estética do designer.
3. Clareza vence complexidade.
4. Consistência cria confiança.
5. Hierarquia orienta a atenção.
6. Espaço em branco é parte do design.
7. Mobile-first é o padrão, não uma opção.
8. Acessibilidade é requisito básico.
9. Performance é experiência.
10. Todo elemento deve ter um propósito.
11. Teste com pessoas reais.
12. Simples não significa vazio; significa essencial.

---

_Use este documento como base para criar um design system, revisar layouts ou padronizar a criação de novos websites._
