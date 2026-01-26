const buttons = document.querySelectorAll(".nav__btn, .casino-btn");
const tabs = document.querySelectorAll(".tab");
console.log("TABY:", tabs);

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;
    if (!tabId) return;

    console.log("Klik:", tabId);

    tabs.forEach(tab => {
      tab.classList.remove("tab--active");
    });

    const target = document.getElementById(tabId);
    console.log("Target:", target);

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

