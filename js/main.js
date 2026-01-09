document.getElementById("clickImage").onclick = () => {
  state.points++;
  state.totalPoints++;
  state.clicks++;
  render();
};

function buyUpgrade(i) {
  const u = upgrades[i];
  const cost = Math.floor(u.baseCost * Math.pow(1.15, u.count));

  if (state.points >= cost) {
    state.points -= cost;
    state.perSecond += u.cps;
    u.count++;
    state.upgradesBought++;
    render();
  }
}

setInterval(() => {
  state.points += state.perSecond;
  state.totalPoints += state.perSecond;
  render();
}, 1000);

render();
