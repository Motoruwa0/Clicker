const clicker = document.getElementById('clickImage');

clicker.onclick = () => {
  gameState.cookies++;
  gameState.totalClicks++;
  gameState.totalCookies++;
  update();
};

function buyUpgrade(i) {
  const u = upgrades[i];
  if (gameState.cookies >= u.cost) {
    gameState.cookies -= u.cost;
    gameState.cookiesPerSecond += u.cps;
    u.count++;
    update();
  }
}

function update() {
  document.getElementById('points').textContent = gameState.cookies;
  document.getElementById('perSecond').textContent = gameState.cookiesPerSecond;
  document.getElementById('clickCount').textContent = gameState.totalClicks;
  document.getElementById('pointsTotal').textContent = gameState.totalCookies;
  renderUpgrades();
  saveGame();
}

setInterval(() => {
  gameState.cookies += gameState.cookiesPerSecond;
  gameState.totalCookies += gameState.cookiesPerSecond;
  update();
}, 1000);

// zakładki
document.querySelectorAll('.nav__btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
    document.querySelectorAll('.nav__btn').forEach(b => b.classList.remove('nav__btn--active'));

    document.getElementById(btn.dataset.tab).classList.add('tab--active');
    btn.classList.add('nav__btn--active');
  };
});

loadGame();
renderUpgrades();
update();
