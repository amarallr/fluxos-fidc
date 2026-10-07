# Manutenção da simulação FIDC

A página é estática e usa módulos nativos de JavaScript, sem framework ou etapa de compilação.

## Organização

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura da página e conteúdo estático das premissas |
| `assets/js/data.js` | Etapas, rótulos, partidas, contas, saldos de abertura e referências |
| `assets/js/accounting.js` | Cálculo das partidas, saldos, agregação D + T e alternativas fiscais |
| `assets/js/ledger.js` | Renderização dos livros razão, linhas reservadas e destaques |
| `assets/js/diagram.js` | Diagrama SVG |
| `assets/js/information.js` | Informações por etapa e conferência dos saldos |
| `assets/js/layout.js` | Alinhamento dos grupos e escala proporcional em paisagem |
| `assets/js/app.js` | Navegação, reprodução e composição dos cenários |
| `assets/css/styles.css` | Aparência, responsividade, impressão e dimensões das caixas |
| `tests/accounting.test.js` | Verificação das regras e dos saldos principais |

## Convenções contábeis

- Os valores estão em R$ milhões. Saldo positivo representa débito; negativo, crédito.
- Cada partida tem a forma `[parte, conta debitada, conta creditada, débito, crédito]`.
- Cada livro tem a forma `[nome, saldo de abertura, nomes alternativos]`.
- Os índices internos 1 a 9 correspondem às etapas visíveis 4 a 12; 10 e 11 correspondem a 13 e 12.b. As três etapas preparatórias são separadas.
- A alternativa 12.b parte de 12 e exclui os registros de 13.
- O quadro agregado D + T mantém o FIDC separado. Não equivale à consolidação contábil integral pelo CPC 36.
- As regras contábeis recebem a etapa como argumento e não acessam o DOM. Não inserir regras de cálculo nos arquivos de aparência.

## Alterações e verificação

Para ampliar o exemplo, ajuste primeiro os dados e o motor contábil, depois a apresentação. Após editar CSS ou JavaScript, execute `npm run version:assets` para renovar os identificadores de cache dos arquivos e evitar que o navegador misture versões. Rode `npm test` com Node.js 20 ou superior; os testes não precisam de dependências instaladas. Confira também os cenários A e B nas etapas 11, 12, 13 e 12.b, os ícones de informação, a reprodução, o zoom e a ausência de cortes nas tabelas.

Para testar a página localmente, sirva a pasta por HTTP, por exemplo `python -m http.server 8000`, e abra `http://localhost:8000`. Módulos nativos devem ser carregados por HTTP; abrir `index.html` diretamente por `file://` pode ser bloqueado pelo navegador.

O CSS usa uma composição fluida com pontos de quebra baseados na largura do viewport. Edite a regra responsável por cada componente, evitando sobrescritas acumuladas. O modo `data-view="reading"` não aplica zoom; `data-view="overview"` ativa a escala de apresentação em computador em paisagem. A escolha `data-scenario` altera somente a visibilidade dos painéis, preservando o estado contábil.

## Restauração

A versão anterior à separação está preservada na branch `backup/antes-modularizacao-2026-10-06`, no commit `c4b4f12eb517f66a165e1fecd91b379b93f74b44`. Ela permite restaurar integralmente a apresentação anterior à separação dos arquivos.

## Proporções visuais

O padrão em computador em paisagem ajusta a composição inteira a uma única tela. A leitura confortável é opcional e conserva o tamanho do texto com rolagem vertical. Livros razão usam altura conforme os lançamentos existentes; linhas de reserva aparecem somente em visão geral. O resumo da etapa usa `stageSummaries`, mantendo o detalhamento no diálogo. Os indicadores vêm de `bookData`, sem regras fiscais novas na interface.

A reprodução segue até 13 e termina. 12.b é uma alternativa selecionada no menu, com retorno para 12.a. Conferir também os filtros A/B, ambas as exibições, foco de teclado, abertura/fechamento das premissas e telas estreitas. O cabeçalho do grupo usa “agregação econômica”, pois o perímetro exclui F e não representa consolidação integral pelo CPC 36.

A composição anterior à revisão visual está preservada em `backup/antes-revisao-visual-2026-10-07`, commit `e206f097c59b04456bb6823fc58d5bc5a7d1a48c`.
