const appState = {
  hamburger: document.querySelector(".nav__hamburger"),
  navList: document.querySelector(".nav__list"),
  navItems: document.querySelectorAll(".nav__item"),
  hamburgerBars: document.querySelectorAll(".hamburgerBar"),
  isHamburgerBtnClicked: false, // to check if the hamburger button is clicked
  hamburgerBtnStatus: true, // to check if the hamburger button is in open state
  stopMenuAttach: false, // to check if the menu is attached to the screen or not
};
export { appState };
