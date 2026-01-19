
document.getElementById("clickImage").addEventListener("click", () => {
  const gain = state.pointsPerClick * state.rebirthBonus;

  state.points += gain;
  state.totalPoints += gain;
  state.clicks += 1;

  addXPFromClicks();
  render();
});


function buyUpgrade(i) {
  const u = upgrades[i];
  const cost = Math.floor(u.baseCost * Math.pow(1.15, u.count));

  if (state.points < cost) return;

  state.points -= cost;
  u.count += 1;
  state.upgradesBought += 1;

  if (u.type === "click") {
    state.pointsPerClick += u.value;
  }

  state.perSecond += u.cps;
  render();
}


setInterval(() => {
  if (state.perSecond > 0) {
    const gain = state.perSecond * state.rebirthBonus;

    state.points += gain;
    state.totalPoints += gain;
    render();
  }
}, 1000);


setInterval(saveGame, 5000);
window.addEventListener("beforeunload", saveGame);

loadGame();
render();


function resetGame() {
  state.points = 0;
  state.perSecond = 0;
  state.totalPoints = 0;
  state.clicks = 0;
  state.upgradesBought = 0;
  state.pointsPerClick = 1;

  state.level = 1;
  state.xp = 0;
  state.xpToNextLevel = 50;
  state._xpFromClicks = 0;

  upgrades.forEach(u => (u.count = 0));

  state.currentSkin = "default";
  state.ownedSkins = ["default"];

  saveGame();
  render();
}


const resetBtn = document.getElementById("resetGameBtn");

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    const ok = confirm("Na pewno chcesz zresetować grę?");
    if (!ok) return;

    resetGame();
  });
}


const rebirthBtn = document.getElementById("rebirthBtn");

if (rebirthBtn) {
  rebirthBtn.addEventListener("click", () => {
    if (state.level < 50) {
      alert("Rebirth dostępny od poziomu 50");
      return;
    }

    const ok = confirm(
      `Rebirth zresetuje CAŁY POSTĘP.\n\n` +
      `Aktualne rebirthy: ${state.rebirths}\n` +
      `Nowy bonus: x${(1 + (state.rebirths + 1) * 0.1).toFixed(2)}`
    );

    if (!ok) return;

    doRebirth();
  });
}

function doRebirth() {
  state.rebirths += 1;
  state.rebirthBonus = state.rebirths * 2;


  state.points = 0;
  state.perSecond = 0;
  state.totalPoints = 0;
  state.clicks = 0;
  state.upgradesBought = 0;
  state.pointsPerClick = 1;

  state.level = 1;
  state.xp = 0;
  state.xpToNextLevel = 50;
  state._xpFromClicks = 0;

  upgrades.forEach(u => (u.count = 0));

  state.currentSkin = "default";
  state.ownedSkins = ["default"];

  saveGame();
  render();
}
