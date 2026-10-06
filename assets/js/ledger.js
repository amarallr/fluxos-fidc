/** Apresentação dos livros razão; os cálculos vêm de accounting.js. */
import { books, displayStage } from "./data.js?v=24091f3dc908";
import { stageJournal, bookData, consolidatedBookData, correctedBookData } from "./accounting.js?v=140a3a046e39";
export function renderReason(
  consolidated = false,
  correction = false,
  group = true,
  { step = 0, introStep = 0 } = {},
) {
  const amount = (v) =>
    Math.abs(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const balance = (v) =>
    `<span class="${v > 0 ? "debit-line" : v < 0 ? "credit-line" : "zero-value"}">${amount(v)}${v ? " " + (v > 0 ? "D" : "C") : ""}</span>`;
  const category = (book) => {
    const name = book[0];
    if (
      [
        "Caixa / bancos",
        "Contas a receber",
        "Direitos creditórios",
        "Investimento em cotas",
        "IRRF a compensar — come-cotas",
      ].includes(name)
    )
      return "assets";
    if (
      ["Tributos a pagar", "Tributos a pagar — IRPJ/CSLL", "IRRF a recolher — cotistas"].includes(
        name,
      )
    )
      return "liabilities";
    if (["PL de abertura", "Cotas integralizadas — patrimônio do fundo"].includes(name))
      return "equity";
    return "results";
  };

  const card = (party, book) => {
    const data = correction
      ? correctedBookData(party, book, step)
      : consolidated
        ? consolidatedBookData(party, book)
        : bookData(party, book, step, group);
    const rowCount = (rows) =>
      rows.reduce((total, r) => total + (r.debit ? 1 : 0) + (r.credit ? 1 : 0), 0);
    const remaining = Math.max(
      0,
      Math.max(
        rowCount(consolidatedBookData(party, book, 10).rows),
        rowCount(consolidatedBookData(party, book, 11).rows),
      ) - rowCount(data.rows),
    );
    const previousStage = step === 11 ? 9 : Math.max(0, step - 1);
    const previous =
      group && previousStage >= 8
        ? consolidatedBookData(party, book, previousStage)
        : bookData(party, book, previousStage, group);
    const changed = (value, old) => introStep === null && step > 0 && Math.abs(value - old) > 1e-8;
    const hidden =
      consolidated &&
      party === "D" &&
      ["Caixa / bancos", "PL de abertura", "Tributos a pagar — IRPJ/CSLL"].includes(book[0]);
    const movement = (value, type) =>
      value
        ? '<span class="' +
          (type === "D" ? "debit-line" : "credit-line") +
          '">' +
          amount(value) +
          " " +
          type +
          "</span>"
        : "";
    return `<article class="reason-card ${consolidated && party === "T" && book[0] === "Investimento em cotas" ? "combined-quota-investment " : ""}${consolidated && party === "T" && book[0] === "IRRF a compensar — come-cotas" ? "combined-irrf-credit " : ""}${(!group || step < 8) && party === "T" && book[0] === "IRRF a compensar — come-cotas" ? "compact-irrf-credit " : ""}${hidden ? "consolidated-placeholder" : ""}" ${hidden ? 'aria-hidden="true"' : ""}><h4>${consolidated && party === "T" && book[0] === "Tributos a pagar" ? "Tributos a pagar — IRPJ/CSLL" : book[0]}</h4><table><thead><tr><th>Et.</th><th>Movimento</th><th>Saldo</th></tr></thead><tbody><tr class="opening-row ${changed(data.opening, previous.opening) ? "changed-posting" : ""}"><td></td><td>${movement(Math.abs(data.opening), data.opening > 0 ? "D" : "C")}</td><td>${balance(data.opening)}</td></tr>${data.rows
      .map((r) => {
        const old = previous.rows.find((v) => v.stage === r.stage);
        const oldDebitBalance = old ? old.balance + old.credit : previous.balance;
        const debitBalance = r.balance + r.credit;
        const line = (value, type, currentBalance, oldValue, oldBalance) => {
          const altered = changed(value, oldValue) || changed(currentBalance, oldBalance);
          return (
            '<tr class="' +
            (altered ? "changed-posting" : "") +
            '"><td>' +
            displayStage(r.stage) +
            "</td><td>" +
            movement(value, type) +
            "</td><td>" +
            balance(currentBalance) +
            "</td></tr>"
          );
        };
        const names = [book[0], ...book[2]];
        const firstEntry = stageJournal(r.stage, group).find(
          ([p, d, c]) => p === party && (names.includes(d) || names.includes(c)),
        );
        const creditFirst =
          r.debit &&
          r.credit &&
          firstEntry &&
          !names.includes(firstEntry[1]) &&
          names.includes(firstEntry[2]);
        if (creditFirst)
          return (
            line(
              r.credit,
              "C",
              r.balance - r.debit,
              old?.credit || 0,
              old ? old.balance - old.debit : previous.balance,
            ) + line(r.debit, "D", r.balance, old?.debit || 0, old?.balance ?? previous.balance)
          );
        return (
          (r.debit ? line(r.debit, "D", debitBalance, old?.debit || 0, oldDebitBalance) : "") +
          (r.credit
            ? line(r.credit, "C", r.balance, old?.credit || 0, old?.balance ?? previous.balance)
            : "")
        );
      })
      .join(
        "",
      )}${Array.from({ length: remaining }, () => '<tr class="reserved-posting" aria-hidden="true"><td>&nbsp;</td><td></td><td></td></tr>').join("")}</tbody></table></article>`;
  };
  const entities = consolidated
    ? [
        { id: "combined", label: "Cedentes (D) + Cotistas (T)", parties: ["T", "D"] },
        { id: "F", label: "FIDC (F)", parties: ["F"] },
      ]
    : [
        { id: "T", label: "Cotistas (T)", parties: ["T"] },
        { id: "D", label: "Cedentes (D)", parties: ["D"] },
        { id: "F", label: "FIDC (F)", parties: ["F"] },
      ];
  return `<div class="reason-columns financial-books ${consolidated ? "financial-combined" : ""}">${entities
    .map((entity) => {
      const items = entity.parties.flatMap((party) =>
        books[party]
          .filter(
            (book) =>
              !(party === "T" && book[0] === "Tributos a pagar" && !consolidated) &&
              (group || book[0] !== "Despesa de administração/gestão do FIDC") &&
              !(
                consolidated &&
                party === "D" &&
                ["Caixa / bancos", "PL de abertura", "Tributos a pagar — IRPJ/CSLL"].includes(
                  book[0],
                )
              ),
          )
          .map((book) => ({ party, book })),
      );
      return `<section class="reason-party reason-entity book-party-${entity.id}"><h3 class="${entity.id === "combined" ? "combined-party-heading" : "party-" + entity.id}">${entity.label}</h3><div class="financial-grid">${[
        ["assets", "Ativo"],
        ["liabilities", "Passivo"],
        ["equity", "Patrimônio líquido"],
        ["results", "Resultado"],
      ]
        .map(
          ([kind, label]) =>
            `<section class="account-group group-${kind}" aria-label="${label} · ${entity.label}"><h4 class="account-group-heading">${label}</h4><div class="account-group-cards">${items
              .filter((item) => category(item.book) === kind)
              .map((item) => card(item.party, item.book))
              .join("")}</div></section>`,
        )
        .join("")}</div></section>`;
    })
    .join(
      "",
    )}</div><p class="reason-key">${step === 11 && group ? "Alternativa 12.b — Desconsideração do FIDC: parte dos saldos da etapa 12.a e exclui todos os lançamentos de 13. Débito em Receita financeira e crédito em Cotas integralizadas — patrimônio do fundo, 15. Em seguida: débito de 100 em Cotas integralizadas e crédito de 100 em Caixa / bancos; débito de 1,00 em Caixa / bancos e créditos de 0,50 em Despesa de administração e de 0,50 em Despesa de gestão. Todas as contas do FIDC têm saldo final zero, inclusive caixa, cotas, receitas, despesas e IRRF. Em Cedentes + Cotistas: D — Investimento em cotas 1 / C — Perda na avaliação das cotas 1; D — Caixa / bancos 100 / C — Investimento em cotas 100; D — Despesa de administração/gestão do FIDC 1 / C — Caixa / bancos 1. Saldo do investimento e da perda nas cotas: zero; caixa agregado: 85 + 100 − 1 = 184; despesa de administração/gestão: 1; tributos a pagar: 34; PL final: 150. Ajustes ilustrativos da hipótese apresentada; não representam pagamentos ou reembolsos comprovados. Sem retenção, recolhimento ou crédito de IRRF. Ajuste ilustrativo da hipótese apresentada, sem dissolução jurídica do fundo. Destaques comparados à etapa 12. " : ""}${step === 10 && group ? "Come-cotas: T debita IRRF a compensar e credita cotas, 2,10. F debita patrimônio de cotistas e credita IRRF a recolher, 2,10; a administradora efetua o recolhimento ao Tesouro com recursos de F, que debita IRRF a recolher e credita caixa, 2,10. Cotas e caixa de F: 96,90; patrimônio líquido de F: 96,90 (85 − 2,10 + 14). Crédito de IRRF em T: 2,10; IRRF a recolher em F: zero após pagamento. IRRF não é despesa de F nem nova despesa de T. " : ""}${correction ? "Etapa 12.a — ajuste de eliminação econômica no quadro agregado D + T: débito em Resultado na avaliação das cotas, 15, e crédito em Perda na cessão — resultado financeiro, 15. O ganho de 15 é eliminado e a perda na cessão fica zerada; o resultado na avaliação das cotas mantém saldo devedor de 1 pelos custos externos. Ajuste apenas do quadro agregado sob a premissa de ausência de ganho e perda econômicos para o beneficiário comum; não é lançamento individual nas empresas nem consolidação completa pelo CPC 36, pois F permanece separado. Os registros individuais anteriores são preservados. Correção fiscal de D: débito no benefício de IRPJ/CSLL e crédito em tributos a pagar, 5,10. A eliminação econômica não substitui o ajuste fiscal na apuração individual de D. Benefício: zero; tributos: 34; resultado incremental D + T: −1, referente aos custos externos; PL final D + T: 150. FIDC separado. " : consolidated ? "Grupo D + T: caixa, PL de abertura e tributos somados; cotas mantidas. FIDC separado. Base inicial hipotética: 100; declarada: 85; corrigida: 100. " : ""}${step === 7 ? "Etapa 10: saldos mantidos, sem alteração ou novo lançamento. " : step === 8 && consolidated ? "Etapa 11: somente linhas alteradas pela agregação de D + T destacadas. No PL, a linha 11 incorpora os 66 de D ao saldo inicial de 85 de T: saldo agregado de 151. É movimentação do quadro agregado, sem novo lançamento nas empresas. " : ""}Primeira linha: saldos de abertura. PL de abertura não inclui encerramento das contas de resultado. ${correction ? "Correção fiscal ilustrativa reconhecida nesta etapa, sob premissa de perda indedutível." : "Correção fiscal ainda não lançada."} ${step === 11 && group ? "D + T: baixa integral do investimento contra caixa e reconhecimento direto da despesa de 1, sem IRRF." : step === 10 && group ? "T: IRRF antecipado de 2,10, compensável com IRPJ; não se compensa com CSLL. O rendimento tributável é 14, não o PL de 99." : "T: sem IRRF lançado; não há resgate, amortização ou distribuição no fluxo."} ${correction ? "Base tributável de D: 85 + 15 = 100. Reversão tributária de 5,10 apenas no cenário 2; sem resgate de cotas e sem incluir F no grupo." : "Registros individuais iguais nos dois cenários sob as premissas."}</p>`;
}
