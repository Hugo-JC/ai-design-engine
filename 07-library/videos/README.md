# Vídeos, talks e transcrições — fluxo seguro

O objetivo é transformar talks em **conhecimento de design pesquisável**, sem transformar o repositório numa cópia de conteúdo alheio.

## Fontes de partida

- [Figma — YouTube](https://www.youtube.com/@Figma): talks sobre design systems, produto e processos de equipa.
- [Nielsen Norman Group — YouTube](https://www.youtube.com/@NNgroup): investigação e heurísticas de usabilidade.
- [Google Chrome Developers — YouTube](https://www.youtube.com/@ChromeDevs): acessibilidade, performance e APIs web.
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/): normas, tutoriais e materiais de acessibilidade.
- [web.dev](https://web.dev/): guias técnicos sobre experiência web, acessibilidade e performance.
- [Smashing Magazine](https://www.smashingmagazine.com/): artigos e talks sobre design e engenharia frontend.

Verifique sempre o título, autor, data, licença e URL exatos antes de adicionar uma entrada. Esta lista aponta para canais/fontes, não afirma que cada vídeo específico foi revisto.

## Política para transcrições

1. Preferir legendas/transcrições oficiais disponibilizadas pelo autor ou plataforma.
2. **Não** guardar transcrições completas, legendas integrais, capítulos de livros, nem dumps de cursos pagos.
3. Criar notas originais e resumidas, em palavras próprias. Citações curtas só quando necessárias, com atribuição e respeito pela lei/licença aplicável.
4. Não automatizar downloads nem contornar controlos de acesso.
5. Separar afirmações do apresentador, evidência citada e interpretação do engine.
6. Cada nota deve ter URL, título, autor, data de acesso e timestamps aproximados para que uma pessoa possa rever o contexto original.
7. Se a licença permitir reutilização, registar o tipo de licença e preservar a atribuição exigida.

## Modelo de nota de vídeo

Guardar cada nota como `07-library/videos/<slug>.md`:

```md
# [Título exato do vídeo]

- Autor/canal:
- URL:
- Publicado em:
- Consultado em:
- Timestamps úteis:
- Transcrição: URL oficial, se disponível
- Licença/reutilização:
- Tags: accessibility, forms, navigation, typography, motion...

## Resumo original
Escrever 3–7 pontos curtos, sem reproduzir a fala do apresentador.

## Princípios aplicáveis
- Princípio em palavras próprias:
  - Quando é útil:
  - Trade-off/contraexemplo:
  - Como validar:

## Heurística proposta
- Regra:
- Gravidade se falhar:
- Verificação manual ou automática:
- Caso de teste associado:

## Evidência e incerteza
- Afirmações sustentadas por pesquisa/fontes:
- Opiniões ou exemplos pessoais do autor:
- O que ainda precisa de validação:

## Impacto no AI Design Engine
- Ficheiro/estilo/preset afetado:
- Teste de regressão proposto:
- Decisão: adotar / experimentar / rejeitar
```

## Critério para promover uma nota a regra

Não adicionar uma regra global por causa de um único vídeo. Confirmar a fonte, identificar o contexto, criar um exemplo contraintuitivo e testar se a regra melhora resultados sem prejudicar outros nichos. Regras globais precisam de exceções explícitas quando a acessibilidade, a plataforma ou o pedido do utilizador exigem outra decisão.
