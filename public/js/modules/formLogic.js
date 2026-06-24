export const listForInputClicks = function clicks() {
	window.addEventListener("DOMContentLoaded", () => {
		const inputs = document.querySelectorAll(".form__inputGroup input, .form__inputGroup textarea");

		function setPlaceholder(input) {
			switch (input.id) {
				case "firstName":
					input.placeholder = "Enter your first name";
					break;

				case "lastName":
					input.placeholder = "Enter your last name";
					break;

				case "email":
					input.placeholder = "Enter your email address";
					break;

				case "phone":
					input.placeholder = "Enter your phone number";
					break;

				case "subject":
					input.placeholder = "Enter the subject matter";
					break;

				case "message":
					input.placeholder = "Enter your message here";
					break;
			}
		}

		for (const input of inputs) {
			const label = input.previousElementSibling;

			input.addEventListener("focus", () => {
				input.classList.add("focusBackgroundColor");
				label.classList.add("focusLabel");

				setTimeout(() => {
					setPlaceholder(input);
					input.classList.add("show-placeholder");
				}, 300);
			});

			input.addEventListener("blur", () => {
				input.classList.remove("focusBackgroundColor");
				input.classList.remove("show-placeholder");
				input.placeholder = "";

				// Only drop the label back down if the field is empty
				if (!input.value.trim()) {
					label.classList.remove("focusLabel");
				}
			});
		}
	});
};
