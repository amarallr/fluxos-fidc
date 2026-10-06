/** Motor contábil puro: não depende do DOM nem do estado da interface. */
import { books, journalStages } from "./data.js";
export function stageJournal(s, group = true) {
  if (s === 11)
    return group
      ? [
          ["F", "Receita financeira", "Cotas integralizadas — patrimônio do fundo", 15, 15],
          ["F", "Cotas integralizadas — patrimônio do fundo", "Caixa / bancos", 100, 100],
          ["F", "Caixa / bancos", "Despesa de administração", 0.5, 0.5],
          ["F", "Caixa / bancos", "Despesa de gestão", 0.5, 0.5],
          ["T", "Investimento em cotas", "Perda na avaliação das cotas", 1, 1],
          ["T", "Caixa / bancos", "Investimento em cotas", 100, 100],
          ["T", "Despesa de administração/gestão do FIDC", "Caixa / bancos", 1, 1],
        ]
      : [];
  if (s === 8) return [];
  if (s === 9)
    return group
      ? [["D", "Benefício de IRPJ/CSLL na DRE", "Tributos a pagar — IRPJ/CSLL", 5.1, 5.1]]
      : [];
  if (s === 10)
    return group
      ? [
          ["T", "IRRF a compensar — come-cotas", "Investimento em cotas", 2.1, 2.1],
          [
            "F",
            "Cotas integralizadas — patrimônio do fundo",
            "IRRF a recolher — cotistas",
            2.1,
            2.1,
          ],
          ["F", "IRRF a recolher — cotistas", "Caixa / bancos", 2.1, 2.1],
        ]
      : [];
  const rows = [...journalStages[s].rows];
  if (s === 3)
    rows.push(["D", "Tributos a pagar — IRPJ/CSLL", "Benefício de IRPJ/CSLL na DRE", 5.1, 5.1]);
  return rows;
}

export function bookData(party, book, until = 0, group = true) {
  const [name, opening, aliases] = book;
  let balance = opening;
  const rows = [];
  for (let i = 1; i <= until; i++) {
    if (until === 11 && i === 10) continue;
    let debit = 0,
      credit = 0;
    for (const [p, d, c, dv, cv] of stageJournal(i, group)) {
      if (p !== party) continue;
      if (d === name || aliases.includes(d)) debit += dv;
      if (c === name || aliases.includes(c)) credit += cv;
    }
    if (debit || credit) {
      balance += debit - credit;
      rows.push({ stage: i, debit, credit, balance });
    }
  }
  return { opening, rows, balance };
}

export function rawConsolidatedBookData(party, book, until = 8) {
  const shared = {
    "Caixa / bancos": "Caixa / bancos",
    "PL de abertura": "PL de abertura",
    "Tributos a pagar": "Tributos a pagar — IRPJ/CSLL",
  };
  const data = bookData(party, book, until);
  if (party !== "T" || !shared[book[0]]) return data;
  const other = bookData(
    "D",
    books.D.find((b) => b[0] === shared[book[0]]),
    until,
  );
  if (book[0] === "PL de abertura") {
    if (until < 8) return data;
    const debit = Math.max(other.balance, 0),
      credit = Math.max(-other.balance, 0);
    return {
      opening: data.opening,
      rows: [...data.rows, { stage: 8, debit, credit, balance: data.balance + other.balance }],
      balance: data.balance + other.balance,
    };
  }
  const rows = [];
  for (let i = 1; i <= until; i++) {
    const a = data.rows.find((r) => r.stage === i),
      b = other.rows.find((r) => r.stage === i);
    if (a || b)
      rows.push({
        stage: i,
        debit: (a?.debit || 0) + (b?.debit || 0),
        credit: (a?.credit || 0) + (b?.credit || 0),
      });
  }
  let balance = data.opening + other.opening;
  for (const row of rows) {
    balance += row.debit - row.credit;
    row.balance = balance;
  }
  return { opening: data.opening + other.opening, rows, balance };
}

export function consolidatedBookData(party, book, until = 8) {
  const data = rawConsolidatedBookData(party, book, until);
  if (until < 9) return data;
  const debit =
    party === "T" &&
    (book[0] === "Ganho na avaliação das cotas" || book[2].includes("Ganho na avaliação das cotas"))
      ? 15
      : 0;
  const credit = party === "D" && book[0] === "Perda na cessão — resultado financeiro" ? 15 : 0;
  if (!debit && !credit) return data;
  const rows = [...data.rows, { stage: 9, debit, credit }].sort((a, b) => a.stage - b.stage);
  let balance = data.opening;
  for (const row of rows) {
    balance += row.debit - row.credit;
    row.balance = balance;
  }
  return { ...data, rows, balance };
}

export function correctedBookData(party, book, until = 0) {
  return consolidatedBookData(party, book, until);
}

export function taxGroup(rate = 15) {
  return {
    cRelief: 15 * 0.34,
    tTax: (14 * rate) / 100,
    groupDifference: 15 * 0.34 - (14 * rate) / 100,
    afterCorrection: (-14 * rate) / 100,
    afterCosts: 15 * 0.34 - (14 * rate) / 100 - 1,
  };
}
