
document.getElementById("clickImage").addEventListener("click", () => {
  state.points += state.pointsPerClick;
  state.totalPoints += state.pointsPerClick;
  state.clicks += 1;
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
