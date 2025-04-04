document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".nav__hamburger");
  const navList = document.querySelector(".nav__list");

  hamburger.addEventListener("click", () => {
    navList.classList.toggle("nav__list--open");
    hamburger.classList.toggle("nav__hamburger--active");
  });

  // Close menu on link click (for mobile UX)
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("nav__list--open");
      hamburger.classList.remove("nav__hamburger--active");
    });
  });
});
