let coinflipInitialized = false;

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
    let currentOutcome = null;

 
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

      currentOutcome = Math.random() < 0.5 ? "orzel" : "reszka";

     coin.classList.remove("spin-orzel", "spin-reszka");
coin.style.transform = "rotateY(0deg)";
void coin.offsetWidth;

coin.classList.add(
  currentOutcome === "orzel" ? "spin-orzel" : "spin-reszka"
);


      setTimeout(() => {
        let message = "";
        let className = "";

        if (currentOutcome === selectedChoice) {
          const win = bet * 2;
          state.points += win;
          message = `Wygrałeś ${win} Pomidorów`;
          className = "win";
        } else {
          message = "❌ Idziesz do gułagu";
          className = "lose";
        }

        resultEl.innerHTML = `
          <div class="coinflip__message ${className}">
            ${message}
          </div>
        `;

        resultEl.classList.add("show");
        render();
      }, 900);
    });
  }, 350);
};
let slotsInitialized = false;

window.initSlots = function () {
  if (slotsInitialized) return;
  slotsInitialized = true;

  setTimeout(() => {
    const reel1 = document.getElementById("slotReel1");
    const reel2 = document.getElementById("slotReel2");
    const reel3 = document.getElementById("slotReel3");

    const betInput = document.getElementById("slotBet");
    const playBtn = document.getElementById("slotPlay");
    const resultEl = document.getElementById("slotResult");
    const autoBtn = document.getElementById("autoSpinBtn");

    if (!reel1 || !reel2 || !reel3 || !playBtn) {
      slotsInitialized = false;
      return;
    }

    const symbols = [
      "\u{1F48E}", 
      "\u{1F34B}", 
      "\u{0037}\u{FE0F}\u{20E3}", //jakbys sie kichal pytal co to jest to jest unicode emoji do bandziora
      "\u{1F352}", 
      "\u{1F514}"  
    ];

    let isSpinning = false;
    let autoSpin = false;
    let autoTimer = null;

    function applyWin(baseWin) {
      const bonus = state.rebirthBonus || 1;
      const totalWin = Math.floor(baseWin * bonus);

      state.points += totalWin;
      resultEl.textContent += ` (x${bonus.toFixed(2)}) +${totalWin}`;
    }

    function spinOnce() {
      if (isSpinning) return;

      const bet = Number(betInput.value);
      if (!bet || bet <= 0) return;
      if (state.points < bet) return;

      isSpinning = true;
      resultEl.textContent = "";

      state.points -= bet;
      render();

      let steps = 0;
      const maxSteps = 14;

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
            resultEl.textContent = "JACKPOT";
          } else if (r1 === r2 || r2 === r3 || r1 === r3) {
            win = bet * 2;
            resultEl.textContent = "Pomidorowa Wygrana";
          } else {
            resultEl.textContent = "❌ Idziesz do gułagu";
          }

          if (win > 0) {
            applyWin(win);
          }

          render();
          isSpinning = false;
        }
      }, 120);
    }

    playBtn.addEventListener("click", spinOnce);

    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        autoSpin = !autoSpin;
        autoBtn.textContent = autoSpin ? "⏹ Stop Auto-spin" : " Auto-spin";

        if (autoSpin) {
          autoTimer = setInterval(() => {
            if (!isSpinning) spinOnce();
          }, 1800);
        } else {
          clearInterval(autoTimer);
        }
      });
    }

  }, 300);
};
