
document.getElementById("clickImage").addEventListener("click", () => {
  state.points += 1;
  state.totalPoints += 1;
  state.clicks += 1;
  render();
});


function buyUpgrade(i) {
  const u = upgrades[i];
  const cost = Math.floor(u.baseCost * Math.pow(1.15, u.count));

  if (state.points >= cost) {
    state.points -= cost;
    u.count += 1;
    state.perSecond += u.cps;
    state.upgradesBought += 1;

    render();
  }
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
