document.querySelectorAll(".nav__btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("tab--active"));
    document.querySelectorAll(".nav__btn").forEach(b => b.classList.remove("nav__btn--active"));
    document.getElementById(btn.dataset.tab).classList.add("tab--active");
    btn.classList.add("nav__btn--active");
  };
});
