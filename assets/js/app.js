/** Estado de navegação, controles e composição da página. */
import { stages, displayStage, menuLabels, constitutionStages, economicReadings } from "./data.js?v=24091f3dc908";
import { taxGroup } from "./accounting.js?v=140a3a046e39";
import { graphic } from "./diagram.js?v=a3febcae65f3";
import { renderReason } from "./ledger.js?v=238e5b398701";
import { compactLedgerNotes } from "./information.js?v=7a42f4596a1b";
import { fitLandscape } from "./layout.js?v=d4db82a7ff41";
let step = 0,
  timer = null,
  introStep = 0;
function advance() {
  if (introStep !== null) {
    if (introStep < 2) introStep++;
    else {
      introStep = null;
      step = 1;
    }
  } else step = Math.min(stages.length - 1, step + 1);
}

function retreat() {
  if (introStep !== null) introStep = Math.max(0, introStep - 1);
  else if (step === 1) {
    step = 0;
    introStep = 2;
  } else step = Math.max(1, step - 1);
}

function groupAlternativeSteps() {
  const menu = document.getElementById("steps");
  const alternatives = document.createElement("div");
  alternatives.className = "step-alternatives";
  alternatives.setAttribute("role", "group");
  alternatives.setAttribute("aria-label", "Correção fiscal e desconsideração do FIDC");

  const correction = menu.querySelector('[data-step="9"]').closest(".step-item");
  menu.insertBefore(alternatives, correction);
  for (const number of [9, 11])
    alternatives.append(menu.querySelector('[data-step="' + number + '"]').closest(".step-item"));
}
function panel(group) {
  const events = [
    "T tem recursos disponíveis; D tem créditos a receber.",
    "85 passam de T para F; T reconhece o investimento em cotas.",
    "Formalização das cotas já reconhecidas: sem duplicar o aporte.",
    "85 passam de F para D; créditos passam de D para F.",
    "15 de rendimento acumulado em F refletem-se nas cotas.",
    "Os devedores externos entregam 100 a F.",
    "Despesas de 1 reduzem as cotas de 100 para 99.",
    "Resultado líquido de F: 14. Valorização de T: 14.",
  ];
  return `<article class="panel ${group && step === 9 ? "fiscal-correction" : ""} ${group ? "same-group" : ""}"><div class="panel-top"><div class="group-banner ${group ? "" : "independent-banner"}">${group ? "GRUPO ECONÔMICO · Cedentes (D) + Cotistas (T) · Beneficiário comum" : '<span><span class="header-cedente">Cedentes (D)</span> e <span class="header-cotista">Cotistas (T)</span> são partes independentes</span>'}</div><div class="panel-head"><h2>${group ? "B · Mesmo grupo econômico" : "A · Partes independentes"}</h2><p>${group ? "O caixa sai de T e chega a D, empresa do mesmo grupo, por meio de F." : "T financia a aquisição dos créditos de uma cedente independente."}</p></div></div>${graphic(group, { step, introStep })}<div class="event">${introStep === null ? (step >= 8 ? (group ? (step === 11 ? "FIDC zerado; D + T: investimento e perda nas cotas zero, caixa 184 e despesa de administração/gestão 1." : step === 10 ? "Administradora recolhe IRRF de 2,10 ao Tesouro com recursos de F; cotas e caixa 96,90." : step === 9 ? "D + T: ganho e perda de 15 eliminados; saldos zero. IRPJ/CSLL recomposto para 34,00." : "Agregação D + T: destaque somente nas linhas alteradas; cotas mantidas e FIDC separado.") : step === 11 ? "Desconsideração não aplicada ao cenário A; saldos da etapa 12.a mantidos." : step === 10 ? "FIDC entidade de investimento: sem come-cotas; cotas e caixa de F mantidos em 99." : "Partes independentes: não se apresenta um grupo econômico comum.") : events[step]) : group ? ["D e T: empresas do mesmo grupo, com beneficiário econômico comum.", "T estrutura F; D será cedente e o grupo deterá integralmente as cotas.", "Contratos preparados. Recursos e recebíveis permanecem no grupo antes do aporte."][introStep] : ["D e T: beneficiários independentes.", "T estrutura F para adquirir créditos de D, parte independente.", "Contratos preparados entre partes independentes."][introStep]}</div><section class="all-reasons ${group && step >= 8 ? "aggregate-phase" : ""}"><h2>${group && step >= 8 ? (step === 11 ? "Desconsideração do FIDC" : step === 10 ? "IRRF Come cotas no FIDC" : step === 9 ? "Ajuste IRPJ/CSLL" : "Consolidação de Cedentes (D) e Cotistas (T)") : "Livros razão · Cotistas, Cedente e FIDC"}</h2><p class="reason-key">R$ milhões · <span class="debit-line">D: débito</span> · <span class="credit-line">C: crédito</span> · Linhas com lançamentos ou saldos alterados em relação à etapa anterior destacadas</p><div class="reason-stage-body"><div class="reserved-books">${renderReason(group && step >= 8, group && step >= 9, group, { step, introStep })}</div></div></section></article>`;
}
function taxGroupPanel() {
  const raw = document.getElementById("group-t-rate").value;
  const rate = Number(raw);
  if (raw === "" || !Number.isFinite(rate) || rate < 0 || rate > 100)
    return "<p>Informe uma alíquota de 0 a 100%. Não se presume isenção ou alíquota reduzida para T.</p>";
  const t = taxGroup(rate);
  return `<p>Comparação futura, fora dos livros razão, supondo realização do ganho: premissas da simulação: D a 34%; T a ${rate.toLocaleString("pt-BR")}%; perda em D de 15; ganho líquido em T de 14. Não é apuração de um fundo real.</p><table><tbody><tr><th>Redução declarada de IRPJ/CSLL em D</th><td>15 × 34% = <strong>${t.cRelief.toFixed(2).replace(".", ",")}</strong></td></tr><tr><th>Tributação futura estimada de T</th><td>14 × ${rate.toLocaleString("pt-BR")}% = <strong>${t.tTax.toFixed(2).replace(".", ",")}</strong></td></tr><tr><th>Diferença tributária declarada do grupo</th><td><strong>${t.groupDifference.toFixed(2).replace(".", ",")}</strong></td></tr><tr><th>Após adicionar a despesa artificial em D</th><td><strong>${t.afterCorrection.toFixed(2).replace(".", ",")}</strong></td></tr></tbody></table><p><strong>5,10 em D não são 5,10 de economia definitiva do grupo.</strong> Em evento futuro, estima-se para T ${t.tTax.toFixed(2).replace(".", ",")}; a diferença declarada é ${t.groupDifference.toFixed(2).replace(".", ",")}. Se D e T forem tributados a 34%, a diferença de 0,34 corresponde a 34% do custo externo de 1.</p><p>Após custo de 1, a diferença econômica líquida antes da correção é ${t.afterCosts.toFixed(2).replace(".", ",")}. Se T pagar em outro período, pode haver diferimento. A adição fiscal de 15 elimina a redução indevida em D; a diferença após a correção é ${t.afterCorrection.toFixed(2).replace(".", ",")}, frente à referência sem FIDC, sob estas premissas.</p><p>A alíquota de T é assumida como carga efetiva total neste exemplo. A aplicação de 15% ao cotista real precisa considerar seu regime; para pessoa jurídica, IRRF pode ser antecipação e não carga definitiva. IRRF compensável não se soma novamente ao IRPJ. A carga total futura de T não foi lançada. A etapa 13 do cenário 2 registra apenas IRRF antecipado de 2,10, sem duplicar esse valor como despesa. A mera valorização fora da data de incidência não é tratada como evento de IRRF; não foram apurados tributos diferidos do cotista. A DRE de D mostra o benefício incremental de 5,10 frente à provisão inicial de 34. A etapa 12.a registra a reversão do benefício em D no cenário 2, preservada na etapa 13.</p>`;
}
function render() {
  document
    .querySelector(".current")
    .classList.toggle("fiscal-correction", introStep === null && step === 9);
  document
    .querySelector(".current")
    .classList.toggle("come-cotas", introStep === null && step === 10);
  requestAnimationFrame(fitLandscape);
  document.getElementById("group-tax-content").innerHTML = taxGroupPanel();
  document.getElementById("entry-content").innerHTML =
    `<div class="top-group-result"><strong>Cenário 2 · Hipótese de despesa artificial</strong><p>${step >= 4 ? (step >= 6 ? "Perda em D: 15 · Valorização de T antes dos tributos: 14 · Custos externos: 1." : "Perda em D: 15 · Ganho nas cotas de T: 15, antes das despesas.") : "O resultado beneficiará as cotas de T, do mesmo grupo, conforme a apropriação dos rendimentos."}</p><p>Base de IRPJ/CSLL em D: ${step >= 9 ? "85 + 15 = 100 corrigida; tributos recompostos: 34,00 (34%)." : step >= 3 ? "100 → 85 declarada; redução potencial: 5,10 (34%)." : "100, antes da cessão."}</p><p class="premise">Hipótese: estrutura meramente formal, sem transferência efetiva de riscos, com despesa artificial deduzida em D. Taxa de mercado não comprova substância econômica. O vínculo societário não comprova artificialidade. Evidências em Premissas.</p></div>`;
  document.getElementById("economic-reading").textContent =
    step === 11
      ? "Cenário B — alternativa 12.b a partir da etapa 12.a, sem os lançamentos de 13. No quadro do FIDC, débito de 15 em Receita financeira e crédito de 15 em Cotas integralizadas — patrimônio do fundo: receita zero e cotas integralizadas 100. Na sequência, débito de 100 em Cotas integralizadas e crédito de 100 em Caixa; débito de 1 em Caixa e créditos de 0,50 em Despesa de administração e de 0,50 em Despesa de gestão. Todas as contas do FIDC ficam zeradas. Em D + T: débito em Investimento em cotas e crédito em Perda na avaliação das cotas, 1; débito em Caixa / bancos e crédito em Investimento em cotas, 100; débito em Despesa de administração/gestão do FIDC e crédito em Caixa / bancos, 1. Investimento e perda nas cotas zerados; caixa agregado 184; despesa 1; IRPJ/CSLL a pagar 34; PL final 150. A correção fiscal e a eliminação econômica da etapa 12.a são preservadas. Ajuste ilustrativo da hipótese de desconsideração, sem representar dissolução ou liquidação jurídica do fundo. O cenário A mantém os saldos da etapa 12."
      : step === 10
        ? "No cenário A, o FIDC é entidade de investimento: sem come-cotas, cotas e caixa de F permanecem 99 e não há IRRF lançado. No cenário B, a administradora realiza o recolhimento de 2,10 ao Tesouro com recursos do caixa de F, por conta dos cotistas. T mantém cotas de 96,90 e crédito de IRRF de 2,10: ativos totais de 99. O resultado de T permanece 14 e o resultado de F permanece 14. O imposto retido é antecipação de IRPJ, sem nova despesa neste recorte."
        : economicReadings[Math.min(step, 7)];
  const stageInfo = introStep === null ? stages[step] : constitutionStages[introStep];
  document.getElementById("num").textContent =
    introStep === null ? displayStage(step) : introStep + 1;
  document.getElementById("title").textContent = stageInfo[0];
  document.getElementById("description").textContent = stageInfo[1];
  document.getElementById("panels").innerHTML = panel(false) + panel(true);
  compactLedgerNotes({ step, introStep });
  document.getElementById("steps").innerHTML =
    constitutionStages
      .map(
        (s, i) =>
          `<div class="step-item"><button data-intro="${i}" class="step-select ${introStep === i ? "active" : ""}" aria-current="${introStep === i ? "step" : "false"}"><span class="step-index">${i + 1}</span><span>${menuLabels[i]}</span></button><button type="button" class="step-info" data-info-intro="${i}" aria-label="Informações da etapa ${i + 1}: ${s[0]}" aria-haspopup="dialog" aria-controls="premise-dialog" title="Premissas da etapa ${i + 1}">i</button></div>`,
      )
      .join("") +
    stages
      .slice(1)
      .map((s, j) => {
        const i = j + 1;
        return `<div class="step-item"><button data-step="${i}" class="step-select ${introStep === null && i === step ? "active" : introStep === null && i < step && !(step === 11 && i === 10) ? "done" : ""}" aria-current="${introStep === null && i === step ? "step" : "false"}"><span class="step-index">${displayStage(i)}</span><span>${menuLabels[i + 2]}</span></button><button type="button" class="step-info" data-info-step="${i}" aria-label="Informações da etapa ${displayStage(i)}: ${s[0]}" aria-haspopup="dialog" aria-controls="premise-dialog" title="Premissas da etapa ${displayStage(i)}">i</button></div>`;
      })
      .join("");
  groupAlternativeSteps();
  document.getElementById("prev").disabled = introStep === 0;
  document.getElementById("next").disabled = introStep === null && step === stages.length - 1;
  document.getElementById("play").textContent = timer ? "Pausar" : "Reproduzir";
}
function pause() {
  clearInterval(timer);
  timer = null;
  render();
}
function start() {
  if (step === stages.length - 1 && introStep === null) {
    step = 0;
    introStep = 0;
  }
  timer = setInterval(
    () => {
      advance();
      render();
      if (step === stages.length - 1 && introStep === null) pause();
    },
    Number(document.getElementById("speed").value),
  );
  render();
}
document.getElementById("play").onclick = () => (timer ? pause() : start());
document.getElementById("prev").onclick = () => {
  pause();
  retreat();
  render();
};
document.getElementById("next").onclick = () => {
  pause();
  advance();
  render();
};
document.getElementById("reset").onclick = () => {
  pause();
  step = 0;
  introStep = 0;
  render();
};
document.getElementById("steps").onclick = (e) => {
  const info = e.target.closest(".step-info");
  const button = info
    ? info.parentElement.querySelector(".step-select")
    : e.target.closest("[data-step],[data-intro]");
  if (button) {
    pause();
    const intro = button.dataset.intro;
    const selected = button.dataset.step;
    if (intro !== undefined) {
      introStep = Number(intro);
      step = 0;
    } else {
      introStep = null;
      step = Number(selected);
    }
    render();
    if (info) {
      document
        .querySelector(
          intro !== undefined
            ? '[data-info-intro="' + intro + '"]'
            : '[data-info-step="' + selected + '"]',
        )
        .focus();
      document.getElementById("premise-dialog").showModal();
    }
  }
};
document.getElementById("speed").onchange = () => {
  if (timer) {
    pause();
    start();
  }
};
render();
document.getElementById("group-t-rate").oninput = () => {
  render();
};
document.getElementById("close-premises").onclick = () =>
  document.getElementById("premise-dialog").close();
document.getElementById("fullscreen").onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    document.getElementById("fullscreen").textContent = "Use F11 para tela cheia";
  }
};
window.addEventListener("resize", () => requestAnimationFrame(fitLandscape));
document.addEventListener("fullscreenchange", () => requestAnimationFrame(fitLandscape));
document
  .querySelector(".group-tax-box")
  .addEventListener("toggle", () => requestAnimationFrame(fitLandscape));
if (document.fonts) document.fonts.ready.then(fitLandscape);
