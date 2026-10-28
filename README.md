# Fluxos do FIDC — simulação contábil, econômica e tributária

**[Abrir a simulação interativa](https://amarallr.github.io/fluxos-fidc/)** · **[Consultar o código-fonte](https://github.com/amarallr/fluxos-fidc)** · **[Manutenção técnica](docs/manutencao.md)**

> **PRELIMINAR · DRAFT** — Estudo didático com valores hipotéticos, em **R$ milhões**. Não descreve um FIDC real nem constitui conclusão de auditoria, parecer jurídico ou apuração tributária definitiva. A correção contábil e fiscal de cada operação exige documentação, análise dos fatos, contratos, riscos, beneficiários e legislação aplicável.

## 1. Objetivo e cenários

A página acompanha, etapa por etapa, a estruturação de um **Fundo de Investimento em Direitos Creditórios (FIDC)**, a integralização de cotas, a cessão de recebíveis, a apropriação de rendimento, a liquidação por devedores, os custos do fundo e os possíveis efeitos tributários. Apresenta simultaneamente o **diagrama dos fluxos** e os **livros razão**, permitindo acompanhar os saldos de cada conta.

- **Cenário A — partes independentes:** cedente (**D**) e cotista (**T**) são independentes. Pressupõe-se, para fins didáticos, uma cessão que permita a baixa dos créditos e, na alternativa de tributação, FIDC enquadrado como **entidade de investimento**, cumpridos os demais requisitos legais. Não há come-cotas na etapa 13.
- **Cenário B — beneficiário econômico final comum:** D e T são pessoas jurídicas distintas, mas têm o mesmo beneficiário econômico final e titularidade integral dos interesses considerados. Para ilustrar risco fiscal, assume-se que a perda de 15 reconhecida por D é **artificial e indevidamente deduzida**. Essa premissa deve ser provada em qualquer caso real: grupo econômico, titularidade comum ou circulação de caixa **não bastam** para concluir pela artificialidade.
- **F** = FIDC; **A** = administradora; **G** = gestora. A e G são prestadores externos ao perímetro econômico simplificado D + T. Os devedores dos recebíveis também são externos.

**Números-base:** T começa com caixa de **85**; D possui recebíveis de **100**, IRPJ/CSLL provisionados de **34** e patrimônio líquido inicial de **66**. O fundo inicia zerado; adquire recebíveis de valor nominal **100** por **85**. O deságio/rendimento bruto simulado é **15**; os custos do fundo são **1** (0,50 para A e 0,50 para G), de modo que o resultado líquido é **14**. A base tributável inicial hipotética de D é **100**, com alíquota combinada de IRPJ/CSLL de **34%**. T é pessoa jurídica e, neste recorte, avalia as cotas ao valor justo por meio do resultado.

## 2. Fluxo completo — etapa por etapa

O menu apresenta três etapas preparatórias, as etapas de movimentação e duas alternativas finais. **12.b e 13 não são passos consecutivos**: ambas partem da correção da etapa 12.a, conforme as respectivas premissas.

| Etapa exibida | O que acontece | Efeito contábil / econômico / fiscal |
| --- | --- | --- |
| **1 — Beneficiários** | Identificar D, T, F, A, G e os beneficiários finais. | Em B, pressupõe-se titularidade integral comum de D e T; em A, independência. Sem lançamento; confirmar estrutura societária e direitos econômicos. |
| **2 — Constituição** | Constituir juridicamente o FIDC e definir seus participantes. | Nenhuma movimentação dos 85 ou receita; a constituição isolada não comprova entidade de investimento nem transferência de riscos. |
| **3 — Contratos** | Preparar regulamento, contratos de cessão, administração e gestão. | Sem lançamento neste recorte. Verificar coobrigação, recompra, garantias, subordinação e poderes efetivos de investimento/desinvestimento. |
| **4 — Aporte** | T integraliza 85 no fundo. | **T:** débito Investimento em cotas / crédito Caixa, **85**. **F:** débito Caixa / crédito Cotas integralizadas, **85**. Aporte não é receita do fundo. |
| **5 — Cotas** | Formalizar as cotas do aporte. | Sem novo lançamento: a integralização e o investimento já foram contabilizados na etapa 4, evitando duplicidade de 85. |
| **6 — Cessão** | D transfere os recebíveis nominais de 100 e F paga 85. | **D:** débito Caixa **85** + débito Perda na cessão **15** / crédito Contas a receber **100**. **F:** débito Direitos creditórios / crédito Caixa **85**. Na simulação, a base de D passa de 100 para **85** antes da correção; em B, essa dedução é hipoteticamente indevida. |
| **7 — Rendimento** | Ao longo do prazo, os créditos de F passam de 85 para 100 e as cotas valorizam. | **F:** débito Direitos creditórios / crédito Receita financeira **15**. **T:** débito Investimento em cotas / crédito Ganho na avaliação **15**. O ganho de T reflete o rendimento do fundo, não outro ganho econômico independente. |
| **8 — Liquidação** | Devedores externos liquidam os direitos creditórios. | **F:** débito Caixa / crédito Direitos creditórios **100**. Troca-se o ativo por dinheiro; não se contabiliza outra receita de 100. Não há resgate de cotas. |
| **9 — Despesas** | Fundo paga administradora e gestora. | **F:** despesa de administração **0,50** + despesa de gestão **0,50**, contra Caixa **1**. **T:** perda na avaliação das cotas **1**. Resultado líquido de F = **14**; valor das cotas = **99**. |
| **10 — Resultado** | Apresentar os saldos finais das operações anteriores. | Sem novo lançamento. T mantém cotas de **99** (85 + 15 − 1); F mantém caixa **99**. Não se presumem amortização, distribuição ou resgate. |
| **11 — Grupo** | Exibir a agregação econômica de **D + T**, com F separado. | Em B, a circulação T → F → D evidencia o percurso de recursos do beneficiário comum. O investimento em cotas permanece no quadro; **não** é consolidação formal pelo CPC 36 nem unificação de contribuintes. |
| **12.a — Ajuste IRPJ/CSLL** | Corrigir a hipótese de perda artificial indevidamente deduzida em B. | No quadro D + T, eliminação econômica ilustrativa de **15** entre ganho em cotas e perda na cessão; a despesa externa de **1** permanece. **Fiscalmente**, adicionar **15** à base: **85 → 100**; IRPJ/CSLL **28,90 → 34,00**, reversão do benefício de **5,10**. A adição fiscal não implica necessariamente estornar a despesa na contabilidade individual. |
| **13 — Come-cotas (alternativa)** | Em B, **somente se** o FIDC não se enquadrar como entidade de investimento, demonstrar IRRF periódico no último dia útil de maio ou novembro. | Base hipotética **14 × 15% = 2,10** de IRRF, sem retenção anterior. Administradora retém/recolhe por conta dos cotistas; F reduz cotas, reconhece e quita o IRRF; T reconhece crédito de **IRRF a compensar**. Após pagamento, caixa e cotas de F = **96,90** e IRRF a recolher = **0**. Em A, pressupõe-se entidade de investimento: **sem come-cotas**. |
| **12.b — Desconsideração do FIDC (alternativa a 13)** | Partir de 12.a em B, **sem** aplicar o come-cotas; apresentar recomposição econômica ilustrativa. | Reclassificar resultado em F, baixar cotas contra caixa e representar custos externos em D + T. Na demonstração hipotética, **F termina com contas zeradas**; em D + T, investimento e perda nas cotas = **0**, caixa agregado = **184**, despesa externa = **1** e IRPJ/CSLL a pagar = **34**. **Não** significa liquidação jurídica, restituição de taxas ou lançamentos individuais automáticos. |

### 2.1. Desdobramento das movimentações principais

**Aporte e cessão:** T transfere **85** para F; F paga **85** a D em troca de direitos creditórios de **100**. Em B, a origem e o destino dos recursos pertencem ao beneficiário econômico final comum por premissa, mas o fundo permanece uma entidade jurídica distinta. A perda de **15** em D só tem a natureza fiscal atribuída na simulação porque isso foi **assumido**, não deduzido apenas da participação comum.

**Rendimento e custos:** a apropriação de **15** em F ao longo do prazo aumenta seu ativo; a valorização em T espelha essa evolução. O recebimento de **100** pelos devedores externos extingue os créditos, e o pagamento das despesas de **1** faz o fundo encerrar esse bloco com **caixa e patrimônio de 99**. Somar os 14 de F aos 14 de T duplicaria a mesma geração econômica.

**Ajuste 12.a:** na hipótese B, a despesa artificial de 15 reduz inicialmente a base de D de 100 para 85, gerando diferença provisória de **5,10** (15 × 34%). A adição fiscal recompõe a base e os tributos. A eliminação econômica do quadro D + T é explicativa; escrituração individual, ajustes extracontábeis e demonstrações consolidadas obedecem a regras distintas.

**Alternativa 13 — lançamentos do IRRF (R$ milhões):**

| Participante | Débito | Crédito | Valor |
| --- | --- | --- | ---: |
| T (cotista PJ) | IRRF a compensar — come-cotas | Investimento em cotas | 2,10 |
| F (retenção) | Cotas integralizadas — patrimônio do fundo | IRRF a recolher — cotistas | 2,10 |
| F (recolhimento) | IRRF a recolher — cotistas | Caixa / bancos | 2,10 |

O IRRF de T é tratado, na premissa adotada para pessoa jurídica no regime legal indicado, como **antecipação compensável com IRPJ**, não como nova despesa definitiva nem como crédito automático de CSLL. O regime do art. 24 para fundos enquadrados no art. 18 pressupõe retenção nos eventos previstos, não come-cotas apenas pela valorização das cotas.

**Alternativa 12.b:** é **mutuamente excludente** com 13, parte da situação ajustada em 12.a e demonstra uma recomposição hipotética: (i) débito em Receita financeira e crédito em Cotas integralizadas de **15**; (ii) débito em Cotas integralizadas e crédito em Caixa de **100**; (iii) débito em Caixa de **1** e créditos nas despesas de administração e gestão de **0,50** cada, com representação correspondente em D + T. Esses lançamentos não afirmam devolução efetiva do dinheiro por A e G, nem autorização geral para desconsiderar fundos.

## 3. Pontos de verificação em uma análise real

1. **Titularidade e beneficiários:** identificar cedentes, cotistas, classes, percentuais, minoritários, cotistas externos e beneficiários finais, com lastro documental.
2. **Substância e riscos:** examinar contratos, coobrigação, recompras, garantias, subordinação, inadimplência, pagamentos efetivos e quem assume riscos e benefícios. Pelo **CPC 48**, retenção substancial pode impedir a baixa do recebível e exigir reconhecimento de passivo.
3. **Preço e deságio:** testar prazo, taxa, risco de crédito, laudos e comparáveis. Um desconto de 15 ou uma taxa de mercado, por si só, **não provam** ficção nem legitimidade.
4. **Contabilidade e tributos:** reconciliar razão/ECD, ECF, e-Lalur/e-Lacs, apurações de IRPJ/CSLL, tributação de T, IRRF efetivamente retido e créditos compensados. Distinguir despesa inexistente, despesa real contabilizada incorretamente e despesa real indedutível.
5. **Enquadramento do FIDC:** conferir critérios da Lei 14.754/2023, gestão profissional e discricionariedade efetiva, além de condições específicas do regime. **Vínculo entre D e T não determina automaticamente** a classificação como entidade de investimento ou a incidência de come-cotas.

## 4. Como usar a página

Acesse **https://amarallr.github.io/fluxos-fidc/** em um navegador atualizado. Use **Reproduzir**, **Etapa anterior**, **Próxima etapa**, **Reiniciar**, **Tela cheia**, o seletor de **Intervalo** ou os botões de etapas. Os ícones de informação e as premissas contextualizam os registros; os livros razão apresentam débitos, créditos e saldos. A exibição em **paisagem** é prioritária. A página dispõe de link **README · Fluxo completo** no cabeçalho para consultar esta explicação.

Para executar localmente, baixe o ZIP ou clone o repositório e sirva a pasta por HTTP:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. A aplicação usa HTML, CSS e módulos nativos de JavaScript; o acesso via `file://` pode bloquear módulos.

## 5. Arquitetura e testes

| Caminho | Função |
| --- | --- |
| `index.html` | Interface, controles, premissas e link para este README |
| `assets/js/data.js` | Etapas, cenários, descrições, contas, saldos e partidas |
| `assets/js/accounting.js` | Cálculo contábil, saldos, agregações e alternativas |
| `assets/js/ledger.js` | Livros razão e lançamentos |
| `assets/js/diagram.js` | Fluxos e diagrama SVG |
| `assets/js/information.js` | Leituras e detalhamento das etapas |
| `assets/js/layout.js` | Ajuste proporcional e composição paisagem |
| `assets/js/app.js` | Navegação, reprodução e atualização da interface |
| `assets/css/styles.css` | Estilos e responsividade |
| `tests/accounting.test.js` | Testes de regras e saldos |
| `docs/manutencao.md` | Orientações para manutenção e validação |

Com **Node.js 20+**, execute `npm test` para validar as regras. Após mudanças em CSS/JS, use `npm run version:assets` para atualizar a versão de cache. A aplicação não exige instalação de dependências para execução estática. A versão pré-modularização está na branch `backup/antes-modularizacao-2026-10-06`.

## 6. Referências normativas e limites

- [Lei 14.754/2023](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14754.htm) — arts. 18, 19, 23, 24, 26, 31 e 32: enquadramento e tributação dos fundos, retenção e compensação, conforme pressupostos aplicáveis.
- [Resolução CMN 5.111/2023](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=5111&tipo=Resolu%C3%A7%C3%A3o+CMN) — critérios de entidade de investimento.
- [CPC 48](https://www.cpc.org.br/Arquivos/Documentos/530_CPC_48_rev_19.pdf) — reconhecimento, mensuração e baixa de ativos financeiros; atenção a riscos e benefícios.
- [CPC 36 (R3)](https://www.cpc.org.br/Arquivos/Documentos/448_CPC_36_R3_rev%2008.pdf) — controle e consolidação (diferentes da agregação D + T aqui demonstrada).
- [RIR/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/decreto/d9580.htm) — requisitos e comprovação de despesas, especialmente art. 311.

**Limites deliberados:** não se simula inadimplência, remuneração do caixa, outros custos, tributação diferida, detalhamento da tributação futura de T, amortização, resgate ou distribuição de cotas. O enquadramento de A e B, a artificialidade de despesas e os ajustes fiscais são **premissas didáticas condicionais**. Não se deve inferir, a partir do exemplo, a situação tributária de qualquer fundo ou grupo real.
