const appState = {
  hamburger: document.querySelector(".nav__hamburger"),
  navList: document.querySelector(".nav__list"),
  navItems: document.querySelectorAll(".nav__item"),
  hamburgerBars: document.querySelectorAll(".hamburgerBar"),
  isHamburgerBtnClicked: false,
  hamburgerBtnStatus: true,
  stopMenuAttach: false,
};

export { appState };
