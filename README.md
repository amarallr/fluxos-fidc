# Fluxos do FIDC

## Abrir o fluxo online

**[Abrir Fluxos do FIDC](https://amarallr.github.io/fluxos-fidc/)**

Acesse diretamente no navegador, no computador ou celular, sem baixar arquivos ou instalar programas. O link é público e pode ser compartilhado.

Simulação interativa e hipotética dos fluxos de um FIDC, com comparação entre partes independentes e Cedentes (D) + Cotistas (T) do mesmo grupo econômico.

## Abrir localmente

1. No GitHub, escolha **Code → Download ZIP**.
2. Extraia o ZIP.
3. Sirva a pasta por HTTP, por exemplo com `python -m http.server 8000`.
4. Abra `http://localhost:8000` em um navegador atualizado.

A página usa HTML, CSS e módulos nativos de JavaScript, sem framework, banco de dados ou servidor de aplicação. O servidor HTTP local é necessário para carregar os módulos; abrir por `file://` pode ser bloqueado pelo navegador.

## Leiaute e navegação

No computador em paisagem, o menu tem 13 colunas, com 13 acima de 12.b e a simulação se ajusta à página. A numeração começa em 1 (Beneficiários), seguida de Constituição e Contratos. Os livros razão e diagramas usam a mesma numeração. Explicações detalhadas estão em nos ícones de informação de cada etapa.

## Etapas finais

- **11. Grupo:** agregação somente de Cedentes (D) + Cotistas (T), com FIDC (F) separado e cotas mantidas no ativo.
- **12.a Correção Fiscal IRPJ:** sob a hipótese de perda indedutível, reversão do benefício de R$ 5,10 milhões e recomposição dos tributos a pagar de R$ 28,90 milhões para R$ 34 milhões.

- **13 Come-cotas:** no cenário B, premissa expressa de FIDC não classificado como entidade de investimento, sujeito ao art. 26 da Lei 14.754/2023. Rendimento tributável de R$ 14 milhões × 15% = R$ 2,10 milhões, no último dia útil de maio ou novembro, sem retenções anteriores. O vínculo societário não determina esse enquadramento.

Lançamentos da etapa 13 (R$ milhões):

| Entidade | Débito | Crédito | Valor |
| --- | --- | --- | ---: |
| Cotista PJ | IRRF a compensar — come-cotas | Investimento em cotas | 2,10 |
| FIDC — retenção | Cotas integralizadas — patrimônio do fundo | IRRF a recolher — cotistas | 2,10 |
| FIDC — recolhimento | IRRF a recolher — cotistas | Caixa / bancos | 2,10 |

Após o recolhimento: cotas e caixa do FIDC de R$ 96,90 milhões; crédito de IRRF do cotista de R$ 2,10 milhões; IRRF a recolher zerado. O resultado do fundo permanece R$ 14 milhões. Para o cotista PJ da premissa, o IRRF é antecipação compensável com IRPJ (art. 32, II), sem nova despesa tributária e sem compensação com CSLL. A correção da etapa 12.a permanece. No cenário A, o FIDC é entidade de investimento, enquadrado nos arts. 18 e 24: sem come-cotas e sem lançamentos de IRRF na etapa 13; caixa e cotas permanecem em 99. No cenário B, o livro IRRF a recolher mostra crédito de 2,10 na retenção e débito de 2,10 no pagamento, com saldo final zero.

Base tributável inicial hipotética de R$ 100 milhões. Os números e tratamentos são premissas didáticas; não constituem apuração de fundo real. A marca PRELIMINAR · DRAFT integra a simulação.

## Organização e manutenção

- `assets/js/data.js`: premissas, etapas, contas e partidas.
- `assets/js/accounting.js`: regras de cálculo e agregação, independentes da interface.
- `assets/js/ledger.js`, `diagram.js` e `information.js`: apresentação.
- `assets/js/layout.js`: alinhamento e zoom proporcional.
- `assets/js/app.js`: navegação e controles.
- `assets/css/styles.css`: estilos organizados e regras responsivas.

Consulte [o guia de manutenção](docs/manutencao.md). Para verificar as regras contábeis, execute `npm test` com Node.js 20 ou superior; não é necessário instalar dependências.

A etapa **12.b Desconsideração do FIDC** é uma alternativa a 13: parte da etapa 12.a, sem come-cotas, e demonstra os ajustes ilustrativos que zeram as contas do FIDC. Mantém o investimento em cotas e a perda nas cotas zerados em D + T, caixa de 184 e despesa de administração/gestão de 1.

A versão anterior à reorganização está preservada na branch `backup/antes-modularizacao-2026-10-06`.

