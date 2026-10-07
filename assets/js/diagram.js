/** Diagrama SVG do fluxo selecionado. */
import { stages } from "./data.js?v=24091f3dc908";
function compactDiagram(svg) {
  const y = (value) => (value >= 194 ? value - 50 : value >= 40 ? value - 30 : value);
  return svg
    .replace('viewBox="0 0 610 300"', 'viewBox="0 0 610 250"')
    .replace('height="115"', 'height="85"')
    .replace(/y="(\d+)"/g, (_, value) => 'y="' + y(Number(value)) + '"')
    .replace(
      /d="([^"]+)"/g,
      (_, path) =>
        'd="' +
        path.replace(
          /([ML])(\d+) (\d+)/g,
          (_, command, x, value) => command + x + " " + y(Number(value)),
        ) +
        '"',
    );
}

export function graphic(group, { step, introStep }) {
  const paymentToTreasury = group && step === 10;
  const box = (id, label, x, y, w = 170) =>
    `<g><rect class="node ${paymentToTreasury && (id === "A" || id === "Treasury") ? "active" : ""} ${group && (id === "T" || id === "D") && label !== "Devedores" ? "group-member" : !group && id === "T" ? "independent-cotista" : !group && id === "D" && label === "Cedentes (D)" ? "independent-cedente" : ""}" x="${x}" y="${y}" width="${w}" height="44" rx="8"/><text x="${x + w / 2}" y="${y + 28}" text-anchor="middle" font-size="19" style="${id === "A" ? "font-size:24px!important" : ""}">${label}</text></g>`;
  const data = {
    0:
      introStep === 0
        ? group
          ? [["quota", "M210 84 L395 84", "1 · Beneficiário comum", 305, 120]]
          : []
        : introStep === 1
          ? [["quota", "M125 84 L260 140", "2 · Constituição", 180, 115]]
          : introStep === 2
            ? [
                ["quota", "M285 184 L350 244", "3 · Contratos", 285, 218],
                ["quota", "M350 184 L500 244", "3 · Contratos", 465, 213],
              ]
            : [],
    1: [["money", "M125 84 L260 140", "4 · 85", 170, 115]],
    2: [["quota", "M260 140 L170 84", "5 · Cotas 85", 235, 102]],
    3: [
      ["credit", "M480 84 L350 140", "6 · Créditos 100", 420, 114],
      ["money", "M350 172 L525 172 L525 84", "6 · Caixa 85", 490, 196],
    ],
    4: [["quota", "M260 140 L170 84", "7 · Cotas 100", 240, 104]],
    5: [["money", "M110 244 L245 178", "8 · 100", 150, 216]],
    6: [
      ["money", "M285 184 L350 244", "9a · 0,5", 285, 218],
      ["money", "M350 184 L500 244", "9b · 0,5", 452, 213],
    ],
    7: [["quota", "M260 140 L170 84", "10 · Cotas 99", 235, 104]],
    10: group
      ? [
          ["quota", "M260 140 L170 84", "13 · Cotas 96,90", 235, 104],
          ["money tax-payment", "M410 266 L480 266", "IRRF 2,10", 467, 229],
        ]
      : [],
  };
  const svg = `<svg viewBox="0 0 610 300" role="img" aria-label="${group ? "Mesmo grupo econômico" : "Partes independentes"} — ${stages[step][0]}${paymentToTreasury ? ": administradora recolhe IRRF de 2,10 ao Tesouro com recursos do FIDC" : ""}"><defs><marker id="compact${group}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="context-stroke"/></marker></defs>${group ? '<rect class="group" x="15" y="5" width="580" height="115" rx="12"/><path class="group-link" d="M210 62 L395 62"/>' : ""}<path class="wire" d="${step === 10 && group ? "M125 84 L305 140 M480 84 L305 140 M110 244 L260 184 M305 184 L305 244" : "M125 84 L305 140 M480 84 L305 140 M110 244 L260 184 M350 244 L305 184 M500 244 L350 184"}"/>${box("T", "Cotistas (T)", 40, 40)}${box("D", "Cedentes (D)", 395, 40)}${box("F", introStep === 0 ? "FIDC (F) · futuro" : "FIDC (F)", 215, 140, 180)}${box("D", "Devedores", 25, 244, 170)}${box("A", "Administradora (A)", step === 10 && group ? 205 : 240, 244, 205)}${box(step === 10 && group ? "Treasury" : "G", step === 10 && group ? "Tesouro" : "Gestora (G)", step === 10 && group ? 480 : 460, 244, step === 10 && group ? 125 : 145)}${(data[step] || []).map(([cl, d, t, x, y]) => `${cl === "money tax-payment" ? `<path class="payment-emphasis" d="${d}"/>` : ""}<path class="flow ${cl}" d="${d}" marker-end="url(#compact${group})"/><text class="flow-label" x="${x}" y="${y}" text-anchor="middle" style="font-size:18px">${t}</text>`).join("")}</svg>`;
  return compactDiagram(svg);
}
