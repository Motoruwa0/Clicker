function render() {
  const pointsEl = document.getElementById("points");
  const pointsHudEl = document.getElementById("pointsHud");
  const perSecondEl = document.getElementById("perSecond");
  const clickCountEl = document.getElementById("clickCount");
  const upgradeCountEl = document.getElementById("upgradeCount");
  const totalPointsEl = document.getElementById("totalPoints");

  if (pointsEl) pointsEl.textContent = Math.floor(state.points);
  if (pointsHudEl) pointsHudEl.textContent = Math.floor(state.points);
  if (perSecondEl) perSecondEl.textContent = state.perSecond;
  if (clickCountEl) clickCountEl.textContent = state.clicks;
  if (upgradeCountEl) upgradeCountEl.textContent = state.upgradesBought;
  if (totalPointsEl) totalPointsEl.textContent = Math.floor(state.totalPoints);

  const container = document.getElementById("upgradesContainer");
  if (!container) return;

  container.innerHTML = "";

  upgrades.forEach((u, i) => {
    const cost = Math.floor(u.baseCost * Math.pow(1.15, u.count));
    const canBuy = state.points >= cost;

    const div = document.createElement("div");
    div.className = "upgrade" + (canBuy ? "" : " upgrade--disabled");

    const bonusText =
      u.type === "click"
        ? `+${u.value} / klik`
        : `+${u.cps} / s`;

    div.innerHTML = `
      <div>${u.name}</div>
      <div>${bonusText} | Koszt: ${cost} | Posiadane: ${u.count}</div>
    `;

    if (canBuy) {
      div.addEventListener("click", () => buyUpgrade(i));
    }

    container.appendChild(div);
  });
}
