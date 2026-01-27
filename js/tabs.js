const buttons = document.querySelectorAll(".nav__btn, .casino-btn");
const tabs = document.querySelectorAll(".tab");

const tabSound = new Audio("sounds/tab-switch.mp3");
tabSound.volume = 0.4;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;
    if (!tabId) return;

    const currentActive = document.querySelector(".tab.tab--active");
    if (currentActive && currentActive.id === tabId) return;

    tabSound.currentTime = 0;
    tabSound.play();

    tabs.forEach(tab => {
      tab.classList.remove("tab--active");
    });

    const target = document.getElementById(tabId);
    if (target) {
      target.classList.add("tab--active");
    }

    const navButtons = document.querySelectorAll(".nav__btn");
    navButtons.forEach(btn => {
      btn.classList.remove("nav__btn--active");
    });

    if (
      tabId === "casino" ||
      tabId === "casino-coinflip" ||
      tabId === "casino-slots"
    ) {
      document
        .querySelector('.nav__btn[data-tab="casino"]')
        ?.classList.add("nav__btn--active");
    } else {
      document
        .querySelector(`.nav__btn[data-tab="${tabId}"]`)
        ?.classList.add("nav__btn--active");
    }

    if (tabId === "casino-coinflip") {
      initCoinflip();
    }

    if (tabId === "casino-slots") {
      initSlots();
    }
  });
});
