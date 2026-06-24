export const listForInputClicks = function clicks() {
	window.addEventListener("DOMContentLoaded", () => {
		const inputs = document.querySelectorAll(".form__inputGroup input, .form__inputGroup textarea");

		for (let input of inputs) {
			input.addEventListener("focus", () => {
				input.classList.add("focusBackgroundColor");
				input.previousElementSibling.classList.add("focusLabel");
			});

			input.addEventListener("blur", () => {
				// Only remove styles if input is empty
				if (input.value.trim() === "") {
					input.classList.remove("focusBackgroundColor");
					input.previousElementSibling.classList.remove("focusLabel");
				}
			});
		}
	});
};
