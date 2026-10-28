# AI Design Engine v4 (alpha)

Uma ferramenta para orientar IA e designers na criação de interfaces com melhor direção visual, consistência e contexto de nicho.

O objetivo do projeto é simples: reduzir "AI slop" e fazer com que a geração de UI comece a partir de padrões reais, linguagem de marca, arquitetura de página e restrições visualmente úteis.

## O que é o projeto

O AI Design Engine combina:

- roteamento determinístico de prompts para estilos e padrões;
- tokens visuais por nicho e intenção;
- validação de acessibilidade e contraste;
- um playbook de referências reais para tipografia, composição, espaçamento e motion sem copiar layouts;
- contextos prontos para agentes de IA gerar interfaces melhores;
- referências e heurísticas que ajudam a evitar layouts genéricos.

Em vez de pedir para "criar um site bonito", o projeto ajuda a responder primeiro:

- qual é o nicho?
- qual é o tom da marca?
- que tipo de layout faz sentido?
- que padrões visuais e de conteúdo são adequados?

## Para quem é

- designers que querem um ponto de partida mais firme;
- agentes de IA que geram interfaces e precisam de contexto;
- times que querem reduzir retrabalho visual e improviso;
- founders e PMs que precisam de protótipos com direção clara.

## Como funciona em 3 passos

1. O pedido entra no router.
2. O sistema identifica o nicho, tom e estilo mais adequados.
3. O agente recebe contexto, tokens, arquétipos e regras de validação antes de construir.

Isso melhora a qualidade da base sobre a qual a interface é gerada, em vez de partir de um "prompt genérico".

## Casos de uso

- ecommerce de beleza, skincare ou lifestyle
- landing pages de SaaS B2B
- protótipos de aplicações internas
- páginas de produtos de nicho
- interfaces de startups com identidade clara

## Exemplos de prompts que funcionam melhor

```bash
node tools/route.js "Loja online de cosméticos naturais" --brief
node tools/bundle.js "Loja online de cosméticos naturais" --out ADE-CONTEXT.md
node tools/validate-design.js index.html --style minimalist_warm
```

Exemplos de intenção de produto:

- "Landing page premium para marca de suplementos naturais"
- "App de agendamento para clínica estética premium"
- "Site institucional para startup de automação de marketing"
- "Marketplace de produtos artesanais com estética editorial"

## O que diferencia este projeto

- foco em direção visual, não só em geração de HTML;
- regras para acessibilidade e contraste;
- uso de nicho e contexto para reduzir designs amplos demais;
- validação antes da entrega final;
- estrutura pensada para agentes e humanos trabalharem juntos.

## Ver em ação

Veja o guia de showcase com prompts, padrões e exemplos de aplicação praticados:

- [Playbook de direção visual](03-references/design-intelligence-playbook.md)
- [SHOWCASE.md](SHOWCASE.md)

## Estrutura rápida

```text
├── agents/              # protocolo e instruções para agentes
├── 02-styles-and-tokens/ # estilos visuais e tokens
├── 03-references/       # presets, padrões e dossiês de nicho
├── tools/               # router, bundle, validação e utilitários
├── tests/               # validações automatizadas
├── SHOWCASE.md          # exemplos visuais e prompts prontos
├── README.md            # visão geral do projeto
└── package.json         # scripts principais
```

## Estado do projeto

Este repositório está em fase alpha, com foco em qualidade de direcionamento visual e contexto para agentes. O objetivo principal não é apenas "gerar telas", mas gerar telas com melhor identidade e menor improviso.

## Começar

```bash
npm test
npm run lint
npm run agents:check
```

Se quiseres usar o router diretamente:

```bash
node tools/route.js "Loja online de cosméticos naturais" --context
```

## Regra de ouro

Adicionar mais conteúdo não basta. O que realmente importa é transformar conhecimento em heurísticas testáveis, com contexto útil para o design e para a IA.

---

Se quiseres, o próximo passo pode ser transformar este repositório em um projeto mais "de produto" com páginas de destaque, exemplos visuais, arquitetura de demonstração e narrativa mais forte para quem entra pela primeira vez.
