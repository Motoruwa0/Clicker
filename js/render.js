function render() {
  
  const pointsEl = document.getElementById("points");
  const perSecondEl = document.getElementById("perSecond");
  const clickCountEl = document.getElementById("clickCount");
  const upgradeCountEl = document.getElementById("upgradeCount");
  const totalPointsEl = document.getElementById("totalPoints");

  if (pointsEl) pointsEl.textContent = Math.floor(state.points);
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

    div.innerHTML = `
      <div class="upgrade__name">${u.name}</div>
      <div class="upgrade__info">
        <span>+${u.cps}/s</span>
        <span>Koszt: ${cost}</span>
        <span>Posiadane: ${u.count}</span>
      </div>
    `;

    if (canBuy) {
      div.addEventListener("click", () => buyUpgrade(i));
    }

    container.appendChild(div);
  });
}
