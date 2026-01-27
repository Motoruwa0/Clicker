let coinflipInitialized = false;
let coinRotation = 0;

const coinSpinSound = new Audio("sounds/coin-spin.mp3");
const coinWinSound = new Audio("sounds/coin-win.mp3");
const coinLoseSound = new Audio("sounds/coin-lose.mp3");

coinSpinSound.volume = 0.6;
coinWinSound.volume = 0.7;
coinLoseSound.volume = 0.7;

window.initCoinflip = function () {
  if (coinflipInitialized) return;
  coinflipInitialized = true;

  setTimeout(() => {
    const coin = document.getElementById("coin");
    const betInput = document.getElementById("coinflipBet");
    const playBtn = document.getElementById("coinflipPlay");
    const resultEl = document.getElementById("coinflipResult");
    const choiceBtns = document.querySelectorAll(".coinflip__btn");

    if (!coin || !betInput || !playBtn || !resultEl) {
      coinflipInitialized = false;
      return;
    }

    let selectedChoice = null;

    choiceBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        choiceBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedChoice = btn.dataset.choice;
      });
    });

    playBtn.addEventListener("click", () => {
      const bet = Number(betInput.value);

      resultEl.classList.remove("show");
      resultEl.innerHTML = "";

      if (!selectedChoice) return;
      if (!bet || bet <= 0) return;
      if (state.points < bet) return;

      state.points -= bet;
      render();

      const outcome = Math.random() < 0.5 ? "orzel" : "reszka";

      coinSpinSound.currentTime = 0;
      coinSpinSound.play();

      coinRotation += outcome === "orzel" ? 2160 : 2340;
      coin.style.transform = `rotateY(${coinRotation}deg)`;

      setTimeout(() => {
        let message = "";
        let className = "";

        if (outcome === selectedChoice) {
          const win = bet * 2;
          state.points += win;
          message = `Wygrałeś ${win} Pomidorów`;
          className = "win";
          coinWinSound.currentTime = 0;
          coinWinSound.play();
        } else {
          message = "❌ Idziesz do gułagu";
          className = "lose";
          coinLoseSound.currentTime = 0;
          coinLoseSound.play();
        }

        resultEl.innerHTML = `
          <div class="coinflip__message ${className}">
            ${message}
          </div>
        `;

        resultEl.classList.add("show");
        render();
      }, 2000);
    });
  }, 350);
};



let slotsInitialized = false;
let slotIsSpinning = false;

/* AUDIO SLOTÓW */
const slotSpinSound = new Audio("sounds/slot-spin.mp3");
const slotWinSound = new Audio("sounds/slot-win.mp3");
const slotLoseSound = new Audio("sounds/slot-lose.mp3");

slotSpinSound.volume = 0.5;
slotWinSound.volume = 0.7;
slotLoseSound.volume = 0.7;

window.initSlots = function () {
  if (slotsInitialized) return;
  slotsInitialized = true;

  const reel1 = document.getElementById("slotReel1");
  const reel2 = document.getElementById("slotReel2");
  const reel3 = document.getElementById("slotReel3");
  const betInput = document.getElementById("slotBet");
  const playBtn = document.getElementById("slotPlay");
  const resultEl = document.getElementById("slotResult");

  if (!reel1 || !reel2 || !reel3 || !playBtn) {
    slotsInitialized = false;
    return;
  }

  const symbols = ["💎", "🍋", "7️⃣", "🍒", "🔔"];

  playBtn.addEventListener("click", () => {
    if (slotIsSpinning) return;

    const bet = Number(betInput.value);
    if (Number.isNaN(bet) || bet <= 0) return;
    if (state.points < bet) return;

    slotIsSpinning = true;
    resultEl.textContent = "";

    state.points -= bet;
    render();

    slotSpinSound.currentTime = 0;
    slotSpinSound.play();

    let steps = 0;
    const maxSteps = 12;

    const spin1 = setInterval(() => {
      reel1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }, 140);

    const spin2 = setInterval(() => {
      reel2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }, 100);

    const spin3 = setInterval(() => {
      reel3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }, 70);

    const stop = setInterval(() => {
      steps++;

      if (steps >= maxSteps) {
        clearInterval(spin1);
        clearInterval(spin2);
        clearInterval(spin3);
        clearInterval(stop);

        const r1 = reel1.textContent;
        const r2 = reel2.textContent;
        const r3 = reel3.textContent;

        let win = 0;

        if (r1 === r2 && r2 === r3) {
          win = bet * 5;
          resultEl.textContent = `🎉 JACKPOT +${win}`;
          slotWinSound.currentTime = 0;
          slotWinSound.play();
        } else if (r1 === r2 || r2 === r3 || r1 === r3) {
          win = bet * 2;
          resultEl.textContent = `🍅 Wygrana +${win}`;
          slotWinSound.currentTime = 0;
          slotWinSound.play();
        } else {
          resultEl.textContent = "❌ Przegrana";
          slotLoseSound.currentTime = 0;
          slotLoseSound.play();
        }

        if (win > 0) applyWin(win);

        render();
        slotIsSpinning = false;
      }
    }, 100);

    // failsafe
    setTimeout(() => {
      slotIsSpinning = false;
    }, 3000);
  });
};

