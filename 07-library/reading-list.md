# Design engineering — leitura curada

Esta lista é um **índice de aprendizagem**, não um corpus de livros copiados. Não guardar PDFs pirateados, capítulos digitalizados ou texto integral de livros. Registar apenas notas próprias, pequenos excertos permitidos pela licença e links para fontes legítimas.

## Como transformar leitura em decisões de interface

Para cada recurso, extrair:
1. **Princípio** — a ideia em palavras próprias.
2. **Quando usar** — contexto e contraexemplo.
3. **Heurística verificável** — algo que uma revisão ou teste pode observar.
4. **Exemplo antes/depois** — código ou wireframe original do projeto.
5. **Limites** — quando a regra não se aplica.
6. **Tags** — nicho, componente, acessibilidade, conteúdo, interação, evidência.

Não adicionar uma regra ao CORE só porque aparece num livro. Testar primeiro num caso real e acrescentar um prompt de regressão em `05-evals/prompts.json`.

## Livros e referências fundamentais

| Recurso | O que extrair | Aplicação no engine |
| --- | --- | --- |
| [Don't Make Me Think — Steve Krug](https://sensible.com/dont-make-me-think/) | Clareza, reconhecimento em vez de memorização, navegação previsível | Hierarquia, rótulos, orientação e teste rápido de usabilidade |
| [Refactoring UI — Adam Wathan e Steve Schoger](https://www.refactoringui.com/) | Decisões visuais práticas: espaçamento, hierarquia, cor, profundidade | Heurísticas para composição e consistência; evitar transformar exemplos em templates |
| [Designing Interfaces — Jenifer Tidwell et al.](https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/) | Padrões de interação e contexto de uso | Catálogo de padrões com benefícios, custos e alternativas |
| [Universal Principles of Design — Lidwell, Holden e Butler](https://www.rockportpublishers.com/universal-principles-of-design/) | Princípios transversais e trade-offs | Vocabulário para justificar decisões sem impor uma estética única |
| [Laws of UX — Jon Yablonski](https://lawsofux.com/) | Carga cognitiva, feedback, proximidade e expectativas | Hipóteses de UX que precisam de validação contextual, não “leis” cegas |
| [Inclusive Design Patterns — Heydon Pickering](https://inclusive-components.design/) | Componentes robustos e acessíveis | Estados, semântica, teclado, leitores de ecrã e conteúdo inclusivo |
| [A Web for Everyone — Sarah Horton e Whitney Quesenbery](https://rosenfeldmedia.com/books/a-web-for-everyone/) | Design inclusivo orientado a necessidades reais | Checklist de inclusão e testes com diferentes capacidades |
| [Design Systems — Alla Kholmatova](https://www.smashingmagazine.com/design-systems/) | Linguagem visual consistente sem bloquear evolução | Tokens, componentes e governança do sistema |
| [Grid Systems in Graphic Design — Josef Müller-Brockmann](https://www.niggli.ch/en/) | Alinhamento, ritmo e composição editorial | Layouts e grelhas; aplicar com flexibilidade, não como fórmula fixa |
| [The Design of Everyday Things — Don Norman](https://jnd.org/books/) | Affordances, feedback, mapeamento e prevenção de erros | Estados de interação e feedback explícito |

Os links podem mudar e alguns recursos são pagos. Use bibliotecas, editoras e páginas dos autores; não contorne paywalls.

## Fontes normativas e gratuitas

- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/): critérios de conformidade para acessibilidade web.
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/): padrões de widgets e interação por teclado.
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility): semântica, HTML e acessibilidade.
- [web.dev — Learn Accessibility](https://web.dev/learn/accessibility/): aprendizagem prática e exemplos.
- [Material Design](https://m3.material.io/): padrões e comportamento de componentes; referência, não estilo obrigatório.
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/): interação e plataformas Apple; aplicar apenas quando o contexto fizer sentido.
- [GOV.UK Design System](https://design-system.service.gov.uk/): conteúdo claro, formulários e padrões acessíveis.
- [Nielsen Norman Group](https://www.nngroup.com/articles/): pesquisa de usabilidade e artigos explicativos; distinguir evidência, opinião e heurística.

## Ficha para notas próprias

Copiar esta estrutura para um ficheiro em `07-library/books/`:

```md
# [Título] — notas originais

- Autor:
- URL legítimo:
- Data de leitura:
- Temas:
- Contextos em que é útil:

## Princípios (paráfrase própria)
- ...

## Heurísticas que posso testar
- ...

## Contraexemplos e limites
- ...

## Exemplo original do engine
- ...

## Efeito observado
- Caso de avaliação:
- Resultado com/sem a heurística:
- Decisão: manter / rever / rejeitar
```
