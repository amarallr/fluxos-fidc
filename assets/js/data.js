/** Premissas didáticas, etapas, contas, partidas e referências. Valores em R$ milhões. */
export const stages = [
  [
    "Preparação",
    "O FIDC está constituído e os contratos estão preparados. T dispõe de 85; D possui recebíveis de 100.",
    "Preparação",
  ],
  [
    "Aporte de T",
    "T integraliza 85 em F e reconhece o investimento em cotas. O caixa de T diminui e o caixa de F aumenta.",
    "1. Aporte",
  ],
  [
    "Emissão de cotas",
    "Formalização das cotas de 85 já reconhecidas no aporte, sem novo lançamento. O aporte não é receita do fundo.",
    "2. Cotas",
  ],
  [
    "Cessão e pagamento",
    "D transfere créditos de 100; F paga 85. As duas pernas integram a mesma operação.",
    "3. Cessão",
  ],
  [
    "Apropriação do rendimento",
    "Ao longo do prazo, o ativo de F evolui de 85 para 100, no exemplo ao custo amortizado. As cotas refletem esse rendimento.",
    "4. Rendimento",
  ],
  [
    "Liquidação pelos devedores",
    "Os clientes de D pagam 100 a F. O fundo troca os recebíveis por caixa.",
    "5. Liquidação",
  ],
  [
    "Pagamento das despesas",
    "F paga 0,5 a A e 0,5 a G. O resultado líquido acumulado é 14 e o valor das cotas é 99.",
    "6. Despesas",
  ],
  [
    "Resultado nas cotas",
    "T mantém cotas de 99: capital de 85 mais resultado líquido de 14. Nenhum resgate é presumido.",
    "7. Resultado",
  ],
  [
    "Visão agregada do grupo",
    "Cenário 2: agregam-se somente Cedentes (D) + Cotistas (T). O FIDC permanece separado; base tributável inicial hipotética de R$ 100 milhões.",
    "8. Grupo",
  ],
  [
    "Correção Fiscal IRPJ",
    "Cenário B: eliminação econômica no quadro D + T — débito no ganho nas cotas e crédito na perda na cessão, 15, zerando ambas as contas. Recomposição fiscal: base de 85 para 100 e reversão do benefício de 5,10. FIDC separado.",
    "12.a Correção Fiscal IRPJ",
  ],
  [
    "IRRF Come cotas no FIDC",
    "Cenário A: entidade de investimento, sem come-cotas. Cenário B: premissa de FIDC não enquadrado como entidade de investimento, na data semestral. Rendimento de 14 × 15% = 2,10 de IRRF, com redução de cotas e recolhimento. Cotista PJ reconhece IRRF a compensar.",
    "13 Come-cotas",
  ],
  [
    "Desconsideração do FIDC",
    "Alternativa do cenário B a partir da etapa 12.a: sem come-cotas. Débito de 15 em Receita financeira e crédito de 15 em Cotas integralizadas — patrimônio do fundo. Em seguida: débito de 100 em Cotas integralizadas e crédito de 100 em Caixa; débito de 1 em Caixa e créditos de 0,50 em Despesa de administração e de 0,50 em Despesa de gestão. Todas as contas do FIDC ficam zeradas. Em D + T: reversão da perda nas cotas (1), baixa do investimento contra caixa (100) e reconhecimento de despesa de administração/gestão contra caixa (1). Investimento e perda nas cotas zero; caixa agregado 184 e despesa 1. Ajuste ilustrativo, sem liquidação jurídica do fundo.",
    "12.b Desconsideração do FIDC",
  ],
];

export const displayStage = (value) =>
  value === 9 ? "12.a" : value === 10 ? 13 : value === 11 ? "12.b" : value + 3;

export const menuLabels = [
  "Beneficiários",
  "Constituição",
  "Contratos",
  "Aporte",
  "Cotas",
  "Cessão",
  "Rendimento",
  "Liquidação",
  "Despesas",
  "Resultado",
  "Grupo",
  "Correção Fiscal IRPJ",
  "Come-cotas",
  "Desconsideração do FIDC",
];

export const constitutionStages = [
  [
    "Identificação dos beneficiários",
    "No cenário 2, Cedentes (D) e Cotistas (T) representam o mesmo beneficiário econômico, sob a premissa de titularidade integral. Os recursos de T são do próprio grupo.",
    "0.1 · Beneficiários",
  ],
  [
    "Constituição do FIDC",
    "T participa da estruturação do FIDC. No cenário 2, as cotas e seus rendimentos pertencerão ao mesmo grupo de D. A constituição, isoladamente, não movimenta os 85.",
    "2 · Constituição",
  ],
  [
    "Regulamento e contratos",
    "A estrutura define Administradora (A), Gestora (G), regras das cotas e condições de cessão. Esses preparativos antecedem o aporte; não há novo lançamento nas contas do exemplo.",
    "3 · Contratos",
  ],
];

export const journalStages = [
  {
    rows: [],
    note: "Saldos iniciais no recorte: T, caixa e PL de 85; D, recebíveis de 100, tributos a pagar de 34 e PL de 66; F, zero. As demais contas e a origem desses saldos não são simuladas.",
    tax: "Sem novo efeito tributário nesta etapa.",
  },
  {
    rows: [
      ["T", "Investimento em cotas", "Caixa / bancos", 85, 85],
      ["F", "Caixa / bancos", "Cotas integralizadas — patrimônio do fundo", 85, 85],
    ],
    note: "Integralização e reconhecimento do investimento ocorrem juntos. A etapa 5 apenas mostra a formalização das cotas, sem duplicar o aporte.",
    tax: "O aporte troca caixa por investimento em T e não gera receita da cessão em F. Nenhuma redução de base em D.",
  },
  {
    rows: [],
    note: "Formalização das cotas já reconhecidas na integralização. Sem novo lançamento de 85.",
    tax: "Sem novo efeito tributário; a base ilustrativa de D permanece 100.",
  },
  {
    rows: [
      ["D", "Caixa / bancos", "Contas a receber", 85, 0],
      ["D", "Perda na cessão — resultado financeiro", "Contas a receber", 15, 100],
      ["F", "Direitos creditórios adquiridos", "Caixa / bancos", 85, 85],
    ],
    note: "Lançamento composto de D: débito em caixa de 85, débito em perda de 15 e crédito em recebíveis de 100. Pressupõe cessão que permite a baixa dos créditos.",
    tax: "D: perda dedutível de 15 reduz a base ilustrativa de IRPJ/CSLL de 100 para 85. A hipótese é a mesma nos dois cenários. Se indedutível, a adição fiscal de 15 mantém a base em 100.",
  },
  {
    rows: [
      ["F", "Direitos creditórios — rendimento apropriado", "Receita financeira", 15, 15],
      ["T", "Investimento em cotas", "Ganho na avaliação das cotas", 15, 15],
    ],
    note: "Resumo da apropriação ao longo do prazo em F. Para T, o exemplo presume pessoa jurídica e cotas avaliadas ao valor justo por meio do resultado; outros tratamentos exigem ajustes.",
    tax: "D: base de IRPJ/CSLL permanece em 85 no exemplo. F: rendimento integra a valorização das cotas. T: ganho contábil de 15 não define sozinho a base fiscal ou o momento de tributação; verificar os ajustes e o regime do cotista.",
  },
  {
    rows: [["F", "Caixa / bancos", "Direitos creditórios", 100, 100]],
    note: "Liquidação dos créditos pelos devedores. Os 100 recebidos não são uma nova receita integral: o rendimento de 15 já foi apropriado.",
    tax: "Não há nova redução de base em D. O recebimento em F não representa um segundo ganho de 100. Não se presume amortização ou resgate em T.",
  },
  {
    rows: [
      ["F", "Despesa de administração", "Caixa / bancos", 0.5, 0.5],
      ["F", "Despesa de gestão", "Caixa / bancos", 0.5, 0.5],
      ["T", "Perda na avaliação das cotas", "Investimento em cotas", 1, 1],
    ],
    note: "Taxas de A e G são despesas de F, reconhecidas e pagas na etapa. As DREs dos prestadores não são exibidas. F tem resultado líquido de 14; as cotas de T passam de 100 para 99.",
    tax: "D: base de IRPJ/CSLL permanece em 85. As despesas reduzem o resultado de F para 14; T acumula ganho contábil de 14. Nenhum imposto é quantificado sem as premissas fiscais.",
  },
  {
    rows: [],
    note: "Etapa de apresentação dos saldos finais, sem novo lançamento: D recebeu 85 e reconheceu perda de 15; T mantém cotas de 99 e nenhum tributo corrente a pagar no fluxo; F tem caixa de 99. Resultados incrementais após tributos: D −9,90; T +14; F +14.",
    tax: "D: redução ilustrativa de 15 na base comum de IRPJ/CSLL. A carga tributária total do grupo ainda depende da tributação de T e dos ajustes fiscais. A base reduzida em D não prova, isoladamente, economia tributária do grupo.",
  },
];

export const economicReadings = [
  "Antes da estrutura: D possui créditos de 100 e T possui caixa de 85. Recursos econômicos agregados: 185.",
  "T aporta 85 em F. O dinheiro que financiará a cedente vem do próprio beneficiário econômico, sob a premissa adicional.",
  "O caixa aportado em F tem como contrapartida as cotas de T. Ainda não há rendimento decorrente da cessão.",
  "T → F → D: os 85 saem de um bolso do beneficiário e chegam ao outro. D reconhece perda de 15, sob a hipótese de baixa dos créditos; F adquire por 85.",
  "D: perda artificial deduzida de 15; investimento de T em F: +15. Antes de despesas e tributos, a soma econômica D + T é zero. O resultado foi realocado dentro da estrutura.",
  "Os 100 recebidos vêm dos devedores externos. O recebimento liquida os créditos adquiridos; não cria um segundo rendimento de 100.",
  "D: perda artificial deduzida de 15; investimento de T em F: +14. Soma econômica D + T: −1, correspondente aos custos externos ilustrativos.",
  "Sem F, o conjunto D + T teria caixa de 185 após o recebimento dos créditos. Com F, tem caixa em D de 85 e cotas em T de 99: total de 184. Antes de tributos e sem custo de oportunidade, a diferença é o custo de 1. Eventual vantagem tributária depende de comprovação separada.",
];

export const readingSources = {
  law: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14754.htm",
  cmn: "https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=5111&tipo=Resolu%C3%A7%C3%A3o+CMN",
  cpc48: "https://www.cpc.org.br/Arquivos/Documentos/530_CPC_48_rev_19.pdf",
  cpc36: "https://www.cpc.org.br/Arquivos/Documentos/448_CPC_36_R3_rev%2008.pdf",
  rir: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/decreto/d9580.htm",
};

export const stageReadingData = {
  1: [
    "Identificam-se as partes e os saldos de abertura, sem nova operação contábil. No cenário A, D e T são independentes; no B, pressupõe-se beneficiário econômico final comum e titularidade integral.",
    "A identidade do beneficiário não comprova, por si só, artificialidade, indedutibilidade ou ausência de enquadramento como entidade de investimento.",
    "A análise compara os fluxos de cada parte e a leitura econômica de D + T; deve verificar cotistas externos, minoritários e quem suporta os riscos.",
  ],
  2: [
    "A constituição jurídica do FIDC antecede o aporte. Esta etapa não movimenta os 85 nem reconhece rendimento.",
    "O enquadramento tributário depende dos requisitos legais e da gestão efetiva. A é tratado como entidade de investimento; B só assume o regime não enquadrado na alternativa 13.",
    "Constituir um fundo não demonstra transferência efetiva de riscos, nem cria, isoladamente, resultado econômico.",
  ],
  3: [
    "Regulamento e contratos definem direitos e obrigações. O exame da transferência dos recebíveis deve considerar riscos, benefícios e controle, conforme CPC 48, itens 3.2.6 e 3.2.15.",
    "A classificação como entidade de investimento e a dedutibilidade da despesa exigem análises próprias; a forma contratual não basta.",
    "Devem ser examinados coobrigação, recompra, garantias, subordinação, gestão efetiva e destino dos rendimentos.",
  ],
  4: [
    "T troca 85 de Caixa por Investimento em cotas; F recebe 85 e reconhece o patrimônio correspondente. Aporte é capital, não receita do fundo.",
    "Não se simula rendimento tributável ou retenção nesta etapa. Aporte não se confunde com distribuição, amortização ou resgate.",
    "Os recursos são de T; no cenário B, pertencem ao beneficiário econômico comum pressuposto no exemplo.",
  ],
  5: [
    "A emissão das cotas confirma o investimento e o patrimônio registrados no aporte; não há segunda entrada de 85 nem nova receita.",
    "O regime fiscal das cotas depende do enquadramento e dos eventos previstos na Lei 14.754/2023.",
    "A representação jurídica em cotas não adiciona riqueza aos recursos aportados.",
  ],
  6: [
    "A operação registrada mostra D recebendo 85, baixando Contas a receber de 100 e reconhecendo perda de 15; F reconhece créditos por 85. Em B, os registros representam a operação declarada sob a hipótese de despesa artificial, não a validação do tratamento adequado. Havendo retenção substancial de riscos e benefícios, o CPC 48, item 3.2.15, exige manter o recebível e reconhecer passivo pelos recursos recebidos.",
    "No exemplo, D deduz os 15 e reduz a base de 100 para 85. Em A pressupõe-se dedução admissível; em B pressupõe-se dedução indevida, corrigida na etapa 12. Contabilização, substância e dedutibilidade devem ser examinadas separadamente.",
    "A circulação de 85 entre T, F e D não comprova, isoladamente, despesa fictícia. Prazo, financiamento efetivo, risco e beneficiários precisam ser demonstrados.",
  ],
  7: [
    "A etapa resume a apropriação de 15 ao longo do prazo em F e a valorização correspondente das cotas em T. Custo amortizado utiliza juros efetivos, quando essa for a classificação aplicável. T é mensurado ao valor justo por meio do resultado neste exemplo; não se utiliza equivalência patrimonial.",
    "A valorização, por si só, não gera o IRRF do regime do art. 24. Até a etapa 12.a não se simula incidência periódica. Tributos correntes e diferidos adicionais do cotista PJ não são calculados.",
    "O resultado do fundo e a valorização das cotas representam a mesma geração econômica e não devem ser somados como ganhos independentes.",
  ],
  8: [
    "Os devedores pagam 100 a F: o fundo troca Direitos creditórios por Caixa. Não reconhece novamente os 15 de rendimento já apropriados.",
    "O recebimento dos créditos pelo FIDC não se confunde com distribuição, amortização ou resgate das cotas. O regime de IRRF é examinado separadamente.",
    "Os devedores são externos ao grupo no exemplo. A entrada de caixa realiza o ativo de F, preservando o resultado já reconhecido.",
  ],
  9: [
    "F registra despesas de administração e gestão de 0,50 cada e paga 1. T reconhece perda na avaliação das cotas de 1. O resultado líquido de F é 14 e seu PL é 99.",
    "O custo externo é distinto da hipótese de deságio artificial. Sua dedutibilidade no contribuinte competente requer exame próprio.",
    "O custo econômico externo total é 1. Sua repercussão no valor das cotas não constitui segundo custo para o mesmo beneficiário.",
  ],
  10: [
    "T mantém cotas de 99, correspondentes ao aporte de 85 mais resultado líquido de 14. Ganho de 15 e perda de 1 mostram momentos diferentes da avaliação ao valor justo.",
    "Não se presume resgate ou distribuição. A comparação de carga futura e o cálculo hipotético das premissas não substituem a apuração fiscal efetiva.",
    "Não somar os 14 de F aos 14 de T. A valorização das cotas reflete o patrimônio do fundo.",
  ],
  11: [
    "O quadro B agrega economicamente D + T, mantendo F separado e o investimento em cotas. PL de abertura: 85 + 66 = 151. Não é demonstração consolidada segundo CPC 36.",
    "Agregação econômica não unifica contribuintes nem elimina obrigações tributárias de D e T.",
    "Consolidação efetiva depende do controle e do perímetro aplicável. Incluindo F, eliminações abrangem investimento contra patrimônio e efeitos intragrupo, evitando duplicar o resultado do fundo.",
  ],
  "12.a": [
    "No quadro agregado B, elimina-se o ganho nas cotas e zera-se a perda na cessão com ajuste econômico de 15. O livro unificado Resultado na avaliação das cotas mantém perda de 1, referente aos custos externos. Separadamente, reverte-se o benefício tributário de 5,10. Essas eliminações não são lançamentos obrigatórios nas contas individuais de toda operação relacionada.",
    "A hipótese de despesa indevidamente deduzida determina adição fiscal de 15: base de 85 para 100 e IRPJ/CSLL de 28,90 para 34,00. A adição no e-Lalur/e-Lacs não impõe, por si só, apagar a despesa contábil; a correção contábil depende do erro efetivamente identificado.",
    "A eliminação econômica mostra a permanência do resultado em D + T. Ela não prova despesa fictícia nem substitui a avaliação de riscos, contratos e dedução efetiva.",
  ],
  13: [
    "Somente B reconhece IRRF de 2,10, reduz as cotas e registra a obrigação de recolher; a administradora recolhe com recursos de F. T reconhece IRRF a compensar contra o investimento. PL e Caixa de F passam de 99 para 96,90.",
    "Em B, pressupõe-se FIDC não enquadrado como entidade de investimento, data semestral, rendimento tributável de 14 e nenhuma retenção anterior: 14 × 15% = 2,10. Para T, PJ no regime indicado, trata-se de antecipação de IRPJ. A permanece sem come-cotas.",
    "Em B, cotas de 96,90 e IRRF a compensar de 2,10 somam ativos de 99 em T. A retenção não cria despesa definitiva de 2,10 neste recorte.",
  ],
  "12.b": [
    "A alternativa parte da etapa 12.a e exclui os lançamentos de 13. Reclassifica a receita de F para cotas, baixa as cotas contra caixa e transfere a representação dos custos para D + T. Os créditos nas despesas de F não significam devolução comprovada dos valores por administrador e gestor.",
    "A desconsideração fiscal não determina automaticamente dissolução do fundo, pagamento, restituição de despesas ou esses lançamentos individuais. Mantém-se a correção fiscal da etapa 12.a; a alternativa demonstra apenas a recomposição ilustrativa escolhida.",
    "F fica zerado. Em D + T: investimento e perda nas cotas zero, Caixa 184, despesa de administração/gestão 1, IRPJ/CSLL a pagar 34 e PL final 150. O custo externo de 1 permanece no grupo; sua eliminação no quadro F evita dupla contagem.",
  ],
};

export const books = {
  T: [
    ["Caixa / bancos", 85, []],
    ["Investimento em cotas", 0, []],
    ["PL de abertura", -85, []],
    [
      "Resultado na avaliação das cotas",
      0,
      ["Ganho na avaliação das cotas", "Perda na avaliação das cotas"],
    ],
    ["Tributos a pagar", 0, []],
    ["IRRF a compensar — come-cotas", 0, []],
    ["Despesa de administração/gestão do FIDC", 0, []],
  ],
  D: [
    ["Caixa / bancos", 0, []],
    ["Contas a receber", 100, []],
    ["PL de abertura", -66, []],
    ["Perda na cessão — resultado financeiro", 0, []],
    ["Tributos a pagar — IRPJ/CSLL", -34, []],
    ["Benefício de IRPJ/CSLL na DRE", 0, []],
  ],
  F: [
    ["Caixa / bancos", 0, []],
    [
      "Direitos creditórios",
      0,
      ["Direitos creditórios adquiridos", "Direitos creditórios — rendimento apropriado"],
    ],
    ["Cotas integralizadas — patrimônio do fundo", 0, []],
    ["Receita financeira", 0, []],
    ["Despesa de administração e gestão", 0, ["Despesa de administração", "Despesa de gestão"]],
    ["IRRF a recolher — cotistas", 0, []],
  ],
};
