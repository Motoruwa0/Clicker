function render() {
  const pointsEl = document.getElementById("points");
  const pointsGameEl = document.getElementById("pointsGame");
  const perSecondEl = document.getElementById("perSecond");
  const clickCountEl = document.getElementById("clickCount");
  const upgradeCountEl = document.getElementById("upgradeCount");
  const totalPointsEl = document.getElementById("totalPoints");

 if (pointsEl) pointsEl.textContent = Math.floor(state.points);
 if (pointsGameEl) pointsGameEl.textContent = Math.floor(state.points);

  if (perSecondEl) perSecondEl.textContent = state.perSecond;
  if (clickCountEl) clickCountEl.textContent = state.clicks;
  if (upgradeCountEl) upgradeCountEl.textContent = state.upgradesBought;
  if (totalPointsEl) totalPointsEl.textContent = Math.floor(state.totalPoints);

  
  const clickImage = document.getElementById("clickImage");
  if (clickImage && typeof skins !== "undefined") {
    const skin = skins.find(s => s.id === state.currentSkin);
    if (skin) clickImage.src = skin.img;
  }

 
  const upgradesContainer = document.getElementById("upgradesContainer");
  if (upgradesContainer) {
    upgradesContainer.innerHTML = "";

    upgrades.forEach((u, i) => {
      const cost = Math.floor(u.baseCost * Math.pow(1.15, u.count));
      const canBuy = state.points >= cost;

      const div = document.createElement("div");
      div.className = "upgrade" + (canBuy ? "" : " upgrade--disabled");

      const bonus =
        u.type === "click"
          ? `+${u.value} / klik`
          : `+${u.cps} / s`;

      div.innerHTML = `
        <div>${u.name}</div>
        <div>${bonus} | Koszt: ${cost} | Posiadane: ${u.count}</div>
      `;

      if (canBuy) {
        div.onclick = () => buyUpgrade(i);
      }

      upgradesContainer.appendChild(div);
    });
  }

  
  const skinsContainer = document.getElementById("skinsContainer");
  if (skinsContainer && typeof skins !== "undefined") {
    skinsContainer.innerHTML = "";

    skins.forEach(skin => {
      const owned = state.ownedSkins.includes(skin.id);

      const div = document.createElement("div");
      div.className = "skin-card";

      div.innerHTML = `
        <img src="${skin.img}">
        <h3>${skin.name}</h3>
        <p>${owned ? "Posiadany" : skin.price + " pkt"}</p>
        <button>${owned ? "Załóż" : "Kup"}</button>
      `;

      div.querySelector("button").onclick = () => {
        if (!owned && state.points >= skin.price) {
          state.points -= skin.price;
          state.ownedSkins.push(skin.id);
        }
        state.currentSkin = skin.id;
        render();
      };

      skinsContainer.appendChild(div);
    });
  }
}
