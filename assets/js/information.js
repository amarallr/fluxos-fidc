/** Premissas por etapa, notas dos livros e conferência dos saldos. */
import {
  books,
  displayStage,
  stages,
  constitutionStages,
  readingSources,
  stageReadingData,
} from "./data.js";
import { bookData } from "./accounting.js";
function readingLink(key, label) {
  return '<a href="' + readingSources[key] + '" target="_blank" rel="noopener">' + label + "</a>";
}

function renderStageInformation({ step, introStep }) {
  const number = String(introStep === null ? displayStage(step) : introStep + 1);
  const title = introStep === null ? stages[step][0] : constitutionStages[introStep][0];
  const texts = stageReadingData[number];
  const accountingRef =
    number === "6" || number === "3"
      ? readingLink("cpc48", "CPC 48, itens 3.2.6 e 3.2.15")
      : number === "7"
        ? readingLink("cpc48", "CPC 48, itens 5.4.1 e 5.7.1")
        : number === "10"
          ? readingLink("cpc48", "CPC 48, item 5.7.1")
          : "Premissa e lançamentos do exemplo";
  const taxRef =
    number === "13.b"
      ? "Hipótese ilustrativa; desconsideração fiscal não impõe automaticamente estes lançamentos"
      : number === "12" || number === "6" || number === "9"
        ? readingLink(
            "rir",
            "RIR/2018, art. 311 — critérios gerais de despesas no IRPJ; examinar também as regras específicas aplicáveis",
          )
        : number === "13.a"
          ? readingLink("law", "Lei 14.754/2023, arts. 24, 26, 31, I, e 32, II")
          : readingLink("law", "Lei 14.754/2023, arts. 18, 19, 23 e 24") +
            " · " +
            readingLink("cmn", "Resolução CMN 5.111/2023, art. 2º");
  const economicRef =
    number === "11" || number === "12"
      ? readingLink(
          "cpc36",
          "CPC 36, itens 7 e B86 — controle e consolidação; distintos desta agregação econômica",
        )
      : "Hipótese econômica do exemplo; não constitui conclusão normativa sobre operação real";
  document.getElementById("stage-perspectives").innerHTML =
    "<h2>Etapa " +
    number +
    " · " +
    title +
    "</h2>" +
    ["Perspectiva contábil", "Perspectiva tributária", "Leitura econômica do grupo"]
      .map(
        (label, i) =>
          '<section class="reading-perspective"><h3>' +
          label +
          "</h3><p>" +
          texts[i] +
          '</p><p class="reading-reference">' +
          [accountingRef, taxRef, economicRef][i] +
          "</p></section>",
      )
      .join("");
  const fmt = (value) =>
    Math.abs(value) < 1e-8
      ? "0,00"
      : value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fundPL = (group) =>
    books.F.filter((book) =>
      ["Caixa / bancos", "Direitos creditórios", "IRRF a recolher — cotistas"].includes(book[0]),
    ).reduce((sum, book) => sum + bookData("F", book, step, group).balance, 0);
  document.getElementById("closing-check").innerHTML =
    "<h2>Conferência dos saldos · R$ milhões</h2><p>PL do FIDC na etapa selecionada: <strong>A — " +
    fmt(fundPL(false)) +
    "</strong>; <strong>B — " +
    fmt(fundPL(true)) +
    "</strong>. O PL inclui o resultado acumulado; não corresponde somente ao saldo da conta Cotas integralizadas.</p><table><thead><tr><th>Referência final</th><th>PL do FIDC — A</th><th>PL do FIDC — B</th></tr></thead><tbody><tr><td>12 · Antes das alternativas</td><td>99,00</td><td>99,00</td></tr><tr><td>13.a · Come-cotas</td><td>99,00</td><td>96,90</td></tr><tr><td>13.b · Desconsideração ilustrativa</td><td>99,00</td><td>0,00</td></tr></tbody></table><p>Na alternativa B 13.b, investimento e perda nas cotas ficam zerados; Caixa de D + T = 184,00; despesa externa = 1,00; todas as contas de F ficam zeradas. Os saldos ilustram as premissas, não validam a operação ou a base tributável de um fundo real.</p>";
}

export function compactLedgerNotes({ step, introStep }) {
  const panels = [...document.querySelectorAll(".panel")];
  const notes = panels.map((panel, index) => {
    const note = panel.querySelector(".reserved-books>.reason-key:last-child");
    const detail = `<h3>${index === 0 ? "Partes independentes" : "Mesmo grupo econômico"}</h3><p>${note.innerHTML}</p>`;
    let summary =
      "R$ milhões · Primeira linha: abertura · Destaque nas linhas alteradas. PL de abertura não inclui encerramento do resultado. Detalhes em Premissas.";
    if (index === 1 && step === 8)
      summary =
        "Agregação D + T: cotas mantidas e FIDC separado. PL: abertura 85 + incorporação de 66 na etapa 11 = 151. Somente linhas alteradas destacadas.";
    if (index === 1 && step === 9)
      summary =
        "Eliminação D + T: D — resultado na avaliação das cotas 15; C — perda na cessão 15. Ganho eliminado; permanece perda nas cotas de 1. IRPJ/CSLL: 34; benefício revertido: 5,10. Detalhes em Premissas.";
    if (index === 1 && step === 10)
      summary =
        "Come-cotas: 14 × 15% = 2,10. Cotas e caixa de F: 96,90; IRRF a compensar em T: 2,10; Administradora recolhe ao Tesouro com recursos de F. Resultado de F: 14. Detalhes em Premissas.";
    if (step === 11)
      summary =
        index === 1
          ? "13.b a partir de 12: receita reclassificada (15), cotas baixadas (100) e despesas revertidas (0,50 + 0,50). FIDC zerado; D + T: investimento e perda nas cotas zero; caixa 184 e despesa de administração/gestão 1. Sem come-cotas."
          : "Cenário A: saldos da etapa 12 mantidos; sem ajuste de desconsideração.";
    if (index === 0 && step === 10)
      summary =
        "FIDC entidade de investimento: sem come-cotas. Cotas e caixa de F mantidos em 99; sem lançamento de IRRF. Detalhes em Premissas.";
    note.textContent = summary;
    return detail;
  });
  document.getElementById("ledger-notes").innerHTML =
    "<h2>Leitura dos livros razão · etapa " +
    (introStep === null ? displayStage(step) : introStep + 1) +
    "</h2>" +
    notes.join("");
  renderStageInformation({ step, introStep });
}
