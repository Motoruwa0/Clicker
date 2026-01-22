function formatNumber(value) {
  if (value >= 1e12) return (value / 1e12).toFixed(2) + " bln";
  if (value >= 1e9)  return (value / 1e9).toFixed(2) + " mld";
  if (value >= 1e6)  return (value / 1e6).toFixed(2) + " mln";
  if (value >= 1e3)  return (value / 1e3).toFixed(1) + " tys.";
  return Math.floor(value).toString();
}

function render() {
  const pointsEl = document.getElementById("points");
  const pointsGameEl = document.getElementById("pointsGame");
  const perSecondGameEl = document.getElementById("perSecondGame");
  const perSecondStatsEl = document.getElementById("perSecondStats");
  const clickCountEl = document.getElementById("clickCount");
  const upgradeCountEl = document.getElementById("upgradeCount");
  const totalPointsEl = document.getElementById("totalPoints");
  const levelEl = document.getElementById("level");
  const xpEl = document.getElementById("xp");

  if (pointsEl) pointsEl.textContent = formatNumber(state.points);
  if (pointsGameEl) pointsGameEl.textContent = formatNumber(state.points);
  if (perSecondGameEl) perSecondGameEl.textContent = state.perSecond;
  if (perSecondStatsEl) perSecondStatsEl.textContent = state.perSecond;
  if (clickCountEl) clickCountEl.textContent = state.clicks;
  if (upgradeCountEl) upgradeCountEl.textContent = state.upgradesBought;
  if (totalPointsEl) totalPointsEl.textContent = formatNumber(state.totalPoints);
  if (levelEl) levelEl.textContent = state.level;

  if (xpEl) {
    xpEl.innerHTML = `
      ${formatNumber(state.xp)}<br>
      /<br>
      ${formatNumber(state.xpToNextLevel)}
    `;
  }

  if (!state.currentSkin) state.currentSkin = "default";
  if (!state.ownedSkins.includes("default")) state.ownedSkins = ["default"];

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
      const requiredLevel = u.requiredLevel || 1;
      const hasLevel = state.level >= requiredLevel;
      const canBuy = state.points >= cost && hasLevel;

      const div = document.createElement("div");
      div.className = "upgrade" + (canBuy ? "" : " upgrade--disabled");

      const bonus =
        u.type === "click"
          ? `+${u.value} / klik`
          : `+${u.cps} / s`;

      div.innerHTML = `
        <div>${u.name}</div>
        <div>
          ${bonus}
          | Koszt: ${formatNumber(cost)}
          | Posiadane: ${u.count}
          ${!hasLevel ? `| Wymagany lvl ${requiredLevel}` : ""}
        </div>
      `;

      if (canBuy) div.onclick = () => buyUpgrade(i);
      upgradesContainer.appendChild(div);
    });
  }

  const skinsContainer = document.getElementById("skinsContainer");
  if (skinsContainer && typeof skins !== "undefined") {
    skinsContainer.innerHTML = "";

    skins.forEach(skin => {
      const owned = state.ownedSkins.includes(skin.id);
      const isActive = state.currentSkin === skin.id;

      const requiredLevel = skin.requiredLevel || 1;
      const hasLevel = state.level >= requiredLevel;

      const requiredRebirths = skin.requiredRebirths || 0;
      const hasRebirths = state.rebirths >= requiredRebirths;

      const hasMoney = state.points >= skin.price;
      const isDisabled = !owned && (!hasLevel || !hasMoney || !hasRebirths);

      const div = document.createElement("div");
      div.className =
        "skin-card" +
        (isActive ? " skin-card--active" : "") +
        (isDisabled ? " skin-card--disabled" : "");

      div.innerHTML = `
        <img src="${skin.img}">
        <h3>${skin.name}</h3>
        <p>
  ${
    isActive
      ? "Założony"
      : owned
        ? "Posiadany"
        : (() => {
            const req = [];

            if (!hasRebirths) {
              req.push(`Rebirthy: ${requiredRebirths}`);
            }

            if (!hasLevel) {
              req.push(`Lvl: ${requiredLevel}`);
            }

            if (!hasMoney) {
              req.push(`Brakuje ${formatNumber(skin.price - state.points)} pkt`);
            }

            if (req.length > 0) {
              return "Wymagane: " + req.join(" • ");
            }

            return formatNumber(skin.price) + " pkt";
          })()
  }
</p>

        <button>
          ${
            isActive
              ? "Aktywny"
              : owned
                ? "Załóż"
                : "Kup"
          }
        </button>
      `;

      div.querySelector("button").onclick = () => {
        if (isDisabled) return;

        if (!owned) {
          state.points -= skin.price;
          state.ownedSkins.push(skin.id);
        }

        state.currentSkin = skin.id;
        render();
      };

      skinsContainer.appendChild(div);
    });
  }

  const rebirthCountEl = document.getElementById("rebirthCount");
  const rebirthBonusEl = document.getElementById("rebirthBonus");
  const rebirthStatsEl = document.getElementById("rebirthStats");
  const rebirthBonusStatsEl = document.getElementById("rebirthBonusStats");
  const rebirthCostEl = document.getElementById("rebirthCost");
  const rebirthBtn = document.getElementById("rebirthBtn");

  const cost = getRebirthCost();
  const missing = Math.max(0, cost - state.points);
  const canRebirth = state.level >= 50 && missing === 0;

  if (rebirthCountEl) rebirthCountEl.textContent = state.rebirths;
  if (rebirthBonusEl) rebirthBonusEl.textContent = "x" + state.rebirthBonus.toFixed(2);
  if (rebirthStatsEl) rebirthStatsEl.textContent = state.rebirths;
  if (rebirthBonusStatsEl) rebirthBonusStatsEl.textContent = "x" + state.rebirthBonus.toFixed(2);

  if (rebirthCostEl) {
    rebirthCostEl.textContent =
      missing === 0
        ? formatNumber(cost)
        : `${formatNumber(cost)} (brakuje ${formatNumber(missing)})`;
  }

  if (rebirthBtn) {
    rebirthBtn.disabled = !canRebirth;
    rebirthBtn.style.opacity = canRebirth ? "1" : "0.35";
    rebirthBtn.style.cursor = canRebirth ? "pointer" : "not-allowed";
  }
}
