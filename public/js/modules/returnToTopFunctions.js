const returnToTopBtn = document.querySelector(".popia__returnTopBtn");
function showReturnToTopBtn() {
	returnToTopBtn.style.opacity = "1";
}
function hideReturnToTopBtn() {
	returnToTopBtn.style.opacity = "0";
}
export { returnToTopBtn, showReturnToTopBtn, hideReturnToTopBtn };
