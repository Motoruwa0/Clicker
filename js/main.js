document.getElementById("clickImage").addEventListener("click", () => {
  state.points += state.pointsPerClick;
  state.totalPoints += state.pointsPerClick;
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
    state.points += state.perSecond;
    state.totalPoints += state.perSecond;

    

    render();
  }
}, 1000);

setInterval(() => {
  saveGame();
}, 5000);

window.addEventListener("beforeunload", () => {
  saveGame();
});

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
