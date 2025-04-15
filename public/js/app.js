import { appState } from "./modules/appVariables.js";
import { openMenuBg, closeMenuBg, checkScreenAndAttach } from "./modules/navbarFunctions.js";

////////////////////////////////////////////////////////////////////////
/// navbar logic to open and close the menu when clicked
////////////////////////////////////////////////////////////////////////
// hamburger logic to open and close the menu when clicked
appState.hamburger.addEventListener("click", () => {
  if (appState.isHamburgerBtnClicked) {
    return;
  }
  appState.isHamburgerBtnClicked = true;

  if (appState.hamburgerBtnStatus) {
    openMenuBg();
  } else {
    closeMenuBg();
  }
});
// navlink logic to close the menu when clicked
for (let navLink of appState.navItems) {
  navLink.addEventListener("click", () => {
    if (window.innerWidth < 750) {
      appState.isHamburgerBtnClicked = true;
      closeMenuBg();
    }
  });
}
// To check the screen size and attach the menu if needed
checkScreenAndAttach();
// To check the screen size and attach the menu if needed on resize
window.addEventListener("resize", () => {
  checkScreenAndAttach();
});
////////////////////////////////////////////////////////////////////////
