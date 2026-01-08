let cookies = 0;
let cookiesPerSecond = 0;
let totalClicks = 0;
let totalCookies = 0;
let clickPower = 1;

const upgrades = [
  { name: 'Babuszka', baseCost: 15, production: 1, count: 0, emoji: '👵' },
  { name: 'Lokaj Batmana', baseCost: 100, production: 8, count: 0, emoji: '🦇' },
  { name: 'Pomidor', baseCost: 50000, production: 2137, count: 0, emoji: '🍅' },
];

const coockieBtn = document.getElementById('clickImage');
const scoreEl = document.getElementById('points');
const perSecondEl = document.getElementById('perSecond');
const upgradesContainer = document.getElementById('upgradesContainer');
const totalClicksEl = document.getElementById('clickCount');
const totalCookiesEl = document.getElementById('pointsTotal');

coockieBtn.addEventListener('click', () => {
  cookies += clickPower;
  totalClicks++;
  totalCookies += clickPower;
  updateDisplay();
});

function getUpgradeCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
}

function buyUpgrade(index) {
  const upgrade = upgrades[index];
  const cost = getUpgradeCost(upgrade);

  if (cookies >= cost) {
    cookies -= cost;
    upgrade.count++;
    cookiesPerSecond += upgrade.production;
    updateDisplay();
  }
}

function renderShop() {
  upgradesContainer.innerHTML = '';
  upgrades.forEach((upgrade, index) => {
    const cost = getUpgradeCost(upgrade);
    const canAfford = cookies >= cost;

    const upgradeDiv = document.createElement('div');
    upgradeDiv.className = `upgrade ${!canAfford ? 'disabled' : ''}`;
    upgradeDiv.onclick = () => buyUpgrade(index);

    upgradeDiv.innerHTML = `
      <span>${upgrade.emoji} ${upgrade.name}</span>
      <button>${cost} pkt (+${upgrade.production}/s)</button>
    `;
    upgradesContainer.appendChild(upgradeDiv);
  });
}

function updateDisplay() {
  scoreEl.textContent = Math.floor(cookies);
  perSecondEl.textContent = cookiesPerSecond.toFixed(1);
  totalClicksEl.textContent = totalClicks;
  totalCookiesEl.textContent = Math.floor(totalCookies);
  renderShop();
}

setInterval(() => {
  if (cookiesPerSecond > 0) {
    const gain = cookiesPerSecond / 10;
    cookies += gain;
    totalCookies += gain;
    updateDisplay();
  }
}, 100);

renderShop();
