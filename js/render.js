function render() {
  document.getElementById("points").textContent = Math.floor(state.points);
  document.getElementById("perSecond").textContent = state.perSecond;
  document.getElementById("clickCount").textContent = state.clicks;
  document.getElementById("upgradeCount").textContent = state.upgradesBought;
  document.getElementById("totalPoints").textContent = Math.floor(state.totalPoints);

  const container = document.getElementById("upgradesContainer");
  container.innerHTML = "";

  upgrades.forEach((u, i) => {
    const cost = Math.floor(u.baseCost * Math.pow(1.15, u.count));
    const div = document.createElement("div");
    div.className = "upgrade" + (state.points < cost ? " upgrade--disabled" : "");
    div.textContent = `${u.name} +${u.cps}/s (${cost})`;

    if (state.points >= cost) {
      div.onclick = () => buyUpgrade(i);
    }

    container.appendChild(div);
  });
}
