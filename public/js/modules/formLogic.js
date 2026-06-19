export const listForInputClicks = function clicks() {
	window.addEventListener("DOMContentLoaded", () => {
		const inputs = document.querySelectorAll(".form__inputGroup input, .form__inputGroup textarea");

		for (let input of inputs) {
			input.addEventListener("focus", () => {
				input.classList.toggle("focusBackgroundColor");
				input.previousElementSibling.classList.toggle("focusLabel");
			});

			input.addEventListener("blur", () => {
				input.classList.toggle("focusBackgroundColor");
				input.previousElementSibling.classList.toggle("focusLabel");
			});
		}
	});
};
