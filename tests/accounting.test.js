import test from "node:test";
import assert from "node:assert/strict";
import { books } from "../assets/js/data.js";
import {
  stageJournal,
  bookData,
  rawConsolidatedBookData,
  consolidatedBookData,
} from "../assets/js/accounting.js";

const balance = (party, name, stage, group = true, combined = false) => {
  const book = books[party].find((book) => book[0] === name);
  return (combined ? consolidatedBookData : bookData)(party, book, stage, group).balance;
};
const close = (actual, expected) =>
  assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);

test("todas as partidas dobradas equilibram débitos e créditos por parte", () => {
  for (const group of [false, true])
    for (let stage = 1; stage <= 11; stage++) {
      const totals = {};
      for (const [party, debit, credit, d, c] of stageJournal(stage, group)) {
        assert.ok(books[party], party);
        assert.ok((!d || debit) && (!c || credit));
        totals[party] = (totals[party] || 0) + d - c;
      }
      for (const net of Object.values(totals)) close(net, 0);
    }
});

test("a cessão, o rendimento e as despesas preservam a sequência dos saldos", () => {
  for (const group of [false, true]) {
    close(balance("F", "Caixa / bancos", 1, group), 85);
    close(balance("F", "Direitos creditórios", 3, group), 85);
    close(balance("F", "Direitos creditórios", 4, group), 100);
    close(balance("F", "Direitos creditórios", 5, group), 0);
    close(balance("F", "Caixa / bancos", 6, group), 99);
    close(balance("T", "Investimento em cotas", 7, group), 99);
    close(balance("T", "Resultado na avaliação das cotas", 7, group), -14);
    close(balance("F", "Despesa de administração e gestão", 6, group), 1);
  }
});

test("a etapa 11 incorpora o PL de D com linha própria no quadro agregado", () => {
  const book = books.T.find((book) => book[0] === "PL de abertura");
  const data = rawConsolidatedBookData("T", book, 8);
  close(data.opening, -85);
  assert.deepEqual(data.rows, [{ stage: 8, debit: 0, credit: 66, balance: -151 }]);
});

test("a correção fiscal elimina os 15 e recompõe o IRPJ/CSLL do cenário B", () => {
  close(balance("T", "Resultado na avaliação das cotas", 9, true, true), 1);
  close(balance("D", "Perda na cessão — resultado financeiro", 9, true, true), 0);
  close(balance("T", "Tributos a pagar", 9, true, true), -34);
  close(balance("D", "Benefício de IRPJ/CSLL na DRE", 9, true, true), 0);
});

test("13 retém e recolhe somente no cenário B, sem duplicar despesa", () => {
  close(balance("T", "IRRF a compensar — come-cotas", 10, false), 0);
  close(balance("F", "Caixa / bancos", 10, false), 99);
  close(balance("T", "IRRF a compensar — come-cotas", 10, true), 2.1);
  close(balance("T", "Investimento em cotas", 10, true), 96.9);
  close(balance("F", "Caixa / bancos", 10, true), 96.9);
  close(balance("F", "IRRF a recolher — cotistas", 10, true), 0);
});

test("12.b parte de 12 e zera todas as contas do fundo, sem incluir come-cotas", () => {
  for (const book of books.F) close(bookData("F", book, 11, true).balance, 0);
  close(balance("T", "Investimento em cotas", 11, true, true), 0);
  close(balance("T", "Resultado na avaliação das cotas", 11, true, true), 0);
  close(balance("T", "IRRF a compensar — come-cotas", 11, true, true), 0);
  close(balance("T", "Caixa / bancos", 11, true, true), 184);
  close(balance("T", "Despesa de administração/gestão do FIDC", 11, true, true), 1);
  close(balance("F", "Caixa / bancos", 11, false), 99);
  for (const book of books.F)
    assert.ok(!bookData("F", book, 11, true).rows.some((r) => r.stage === 10));
});
