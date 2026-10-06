/** Alinhamento entre cenários e escala proporcional em paisagem. */
function alignFinancialGroups() {
  const grids = [...document.querySelectorAll(".financial-grid")];
  for (const grid of grids) {
    grid.style.gridTemplateRows = "";
    grid.querySelector(".group-equity").style.paddingTop = "";
  }
  if (
    !window.matchMedia("(min-device-width:1151px) and (orientation:landscape)").matches ||
    !grids.length
  )
    return;
  const height = (kind) =>
    Math.max(...grids.map((grid) => grid.querySelector(".group-" + kind).offsetHeight));
  const gap = 6;
  const passivo = height("liabilities");
  const pl = Math.max(height("equity"), height("assets") - passivo - gap);
  for (const grid of grids) grid.style.gridTemplateRows = passivo + "px " + pl + "px auto";
  // Align the bottom of equity books with the second row of asset books.
  for (const grid of grids) {
    const equity = grid.querySelector(".group-equity");
    const equityCard = equity.querySelector(".reason-card");
    const assets = grid.querySelector(".group-assets .account-group-cards");
    const firstTop = assets.children[0]?.getBoundingClientRect().top;
    const secondRow = [...assets.children].find(
      (card) => card.getBoundingClientRect().top > firstTop + 1,
    );
    if (!equityCard || !secondRow) continue;
    const scale = grid.getBoundingClientRect().width / grid.offsetWidth || 1;
    const shift = Math.max(
      0,
      (secondRow.getBoundingClientRect().bottom - equityCard.getBoundingClientRect().bottom) /
        scale,
    );
    equity.style.paddingTop = shift + "px";
  }
  const alignedPl = Math.max(pl, height("equity"));
  for (const grid of grids) grid.style.gridTemplateRows = passivo + "px " + alignedPl + "px auto";
}

export function fitLandscape() {
  const main = document.querySelector("main");
  main.style.zoom = "1";
  main.style.width = "";
  main.style.minHeight = "";
  main.style.margin = "";
  const landscape = window.screen.width > 1150 && window.innerWidth > window.innerHeight;
  if (!landscape) {
    alignFinancialGroups();
    document.getElementById("premise-dialog").style.zoom = "1";
    return;
  }
  const browserZoom = Math.max(0.25, Math.min(5, window.outerWidth / window.innerWidth || 1));
  const width = Math.max(2848, window.outerWidth || window.innerWidth);
  main.style.width = width + "px";
  main.style.minHeight = "1080px";
  alignFinancialGroups();
  const height = main.getBoundingClientRect().height;
  const scale = Math.min(
    1,
    ((window.innerWidth - 4) * browserZoom) / width,
    ((window.innerHeight - 4) * browserZoom) / height,
  );
  main.style.zoom = String(scale);
  main.style.margin = "0 auto";
  document.getElementById("premise-dialog").style.zoom = String(1 / scale);
}
