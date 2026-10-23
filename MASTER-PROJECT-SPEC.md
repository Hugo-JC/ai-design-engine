# Especificação Mestre do AI Design Engine

## 1. Visão do projeto

O **AI Design Engine** é um conjunto de regras, tokens visuais, referências e instruções para orientar agentes de IA na criação e avaliação de interfaces frontend. O seu propósito é reduzir o *AI Slop*: interfaces visualmente genéricas, sem contexto de produto, com composição repetitiva ou decisões de marca inconsistentes.

O projeto fornece direção e critérios de qualidade; não substitui o briefing, os requisitos funcionais nem o julgamento contextual de quem implementa a interface.

## 2. Objetivos e limites

O motor deve ajudar o agente a:

- compreender o nicho, o público, a personalidade e a intenção do produto;
- escolher deliberadamente uma direção visual coerente, em vez de recorrer a uma estética genérica;
- estruturar a página com um arquétipo apropriado e conteúdo específico do produto;
- manter consistência de tipografia, cor, espaçamento, componentes e hierarquia;
- detetar problemas visuais comuns por revisão e por validação heurística.

O repositório é uma biblioteca de orientação e um validador simples. Não é uma aplicação de geração de interfaces, não escolhe automaticamente todos os requisitos do produto e não substitui testes funcionais, responsivos ou de acessibilidade.

## 3. Princípios de direção visual

1. **Contexto antes da estética:** as decisões devem responder ao produto, ao público e ao nicho.
2. **Uma direção dominante:** escolher um `style_id` e mantê-lo coerente, salvo pedido explícito em contrário.
3. **Estrutura intencional:** escolher um arquétipo de hero e organizar as secções segundo a mensagem e a tarefa do utilizador; o split de texto e imagem não é o padrão obrigatório.
4. **Especificidade:** usar detalhes, linguagem, provas e elementos visuais próprios do produto, evitando copy vaga e imagens abstratas sem função.
5. **Hierarquia e ritmo:** distinguir níveis tipográficos e criar respiro com composição e espaçamento, não com divisores decorativos.
6. **Consistência com acessibilidade:** garantir contraste adequado e estados visíveis de interação, incluindo foco de teclado.
7. **Regras como guardrails:** requisitos funcionais e de acessibilidade prevalecem sobre preferências decorativas. Exceções visuais devem ser intencionais e coerentes com o briefing.

## 4. Componentes atuais do repositório

Os seguintes ficheiros constituem a estrutura existente do projeto:

- `.cursorrules` — instruções rápidas para agentes que trabalham no repositório.
- `01-rules-and-constraints/ai-design-rules.md` — regras de composição, tipografia, espaçamento, cor, layout e qualidade.
- `01-rules-and-constraints/anti-patterns.md` — padrões visuais a evitar e respetivo contexto.
- `02-styles-and-tokens/design-styles.json` — estilos, tokens e regras de seleção de estilo.
- `03-references/personality-extractor.md` — extração de tom e mapeamento de nicho para `style_id`.
- `03-references/layout-archetypes.md` — opções de hero, secções, prova social, navegação e rodapé.
- `03-references/curated-references.md` — referências de marcas e padrões de design.
- `03-references/component-catalog.md` — exemplos e orientação para componentes.
- `03-references/local-presets.json` — catálogo local de presets de nicho e pistas de referência.
- `03-references/reference-router.md` — encaminhamento determinístico com fallback local e pesquisa externa limitada.
- `04-agent-prompts/system-prompt-auditor.md` — prompt de trabalho e auto-auditoria do agente.
- `tools/validate-design.js` — validador heurístico de ficheiros de interface.
- `MASTER-PROJECT-SPEC.md` — esta especificação geral do projeto.

## 5. Fluxo de trabalho do agente

O fluxo completo tem três operações: **análise, geração e auditoria**. O brief e a preparação estrutural são etapas da análise e da geração, não operações substitutas.

### 5.1 Análise e brief

Antes de escrever código, o agente deve:

1. extrair do pedido o nicho, público, objetivo, contexto e tom;
2. identificar requisitos funcionais, conteúdo disponível e quaisquer restrições explícitas;
3. consultar `personality-extractor.md`, `reference-router.md`, `local-presets.json` e `design-styles.json` para selecionar um `style_id` determinístico e adequado;
4. escolher pelo nicho e contexto sem perguntar pela estética só porque ela não foi especificada; usar o fallback local se não houver correspondência e perguntar apenas quando faltar um requisito essencial que impeça uma escolha segura;
5. fixar no **DESIGN BRIEF** o nicho/público, tom, `style_id` e justificação, modo, tipografia, arquétipo de hero, referências, elemento visual principal e riscos de genericidade.

O brief deve ser curto (até 8 linhas, conforme o prompt do auditor) e servir de referência para as decisões seguintes.

### 5.2 Geração da interface

Com o brief definido, o agente deve:

1. selecionar um arquétipo adequado ao conteúdo real e justificar a escolha;
2. definir a ordem e a narrativa das secções antes de implementar, por exemplo: hero, prova de valor, funcionalidades, prova social e CTA final, adaptando-a ao produto;
3. consultar referências relevantes e incorporar padrões como inspiração, sem copiar páginas ou criar um template universal;
4. usar os tokens do estilo escolhido e aplicar as regras de consistência, hierarquia, contraste, interação e especificidade;
5. entregar a interface solicitada (por exemplo, HTML, Tailwind ou React) com uma explicação breve das decisões visuais e o brief.

### 5.3 Auditoria e entrega

Antes da entrega, o agente deve fazer uma revisão visual e contextual com as checklists de `system-prompt-auditor.md` e `ai-design-rules.md`. Deve verificar, entre outros pontos, a aderência ao brief, a clareza da hierarquia, o uso de divisores, o ritmo do layout, a legibilidade, o foco visual, os estados interativos e a especificidade do conteúdo.

O validador pode complementar essa revisão:

```bash
node tools/validate-design.js <ficheiro>
```

Para uma execução rigorosa, o script também aceita `--strict` e pode receber vários ficheiros. Os avisos são heurísticos: devem ser confirmados no contexto e não corrigidos cegamente. A revisão humana/contextual continua necessária, pois o script não avalia a intenção, a qualidade global da composição nem todos os critérios de acessibilidade.

## 6. Requisitos de qualidade

Uma interface produzida com esta orientação deve cumprir, no contexto aplicável, os seguintes critérios:

- **Identidade:** nicho, público e tom são reconhecíveis; o `style_id`, modo, fontes e paleta mantêm coerência.
- **Tipografia:** escala com hierarquia clara; títulos equilibrados e sem tracking excessivamente apertado.
- **Espaçamento:** usar múltiplos de 8 px; desvios só se justificam por necessidade funcional ou de acessibilidade.
- **Cor e contraste:** usar a cor de destaque com moderação e cumprir WCAG AA (4,5:1 para texto normal e 3:1 para texto grande).
- **Ações:** distinguir CTA primário de ações secundárias e fornecer estados de hover e foco visíveis.
- **Composição:** escolher o arquétipo pelo conteúdo e evitar divisores soltos, grids repetitivos ou elementos flutuantes que ocultem o foco principal.
- **Conteúdo:** copy concreta e própria do produto; números e unidades devem permanecer juntos quando necessário.
- **Acabamento:** elementos, componentes e secções parecem pertencer à mesma direção visual.

Estas regras orientam decisões de design, mas não devem degradar a funcionalidade nem impor uma estética incompatível com um requisito legítimo do produto.

## 7. Critérios de aceitação do projeto

O AI Design Engine cumpre a sua finalidade quando um agente que siga os materiais atuais consegue:

- produzir um brief fundamentado antes da implementação;
- selecionar e manter uma direção visual apropriada ao nicho;
- estruturar a interface com intenção, em vez de repetir automaticamente um layout;
- justificar as principais decisões de design com base no produto e nas referências;
- rever o resultado segundo critérios claros e usar o validador como apoio, não como substituto do julgamento.
