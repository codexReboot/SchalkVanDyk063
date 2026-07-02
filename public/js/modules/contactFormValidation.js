import { validationRules } from "../../../validationRules.js";
export function initContactFormValidation() {
	window.addEventListener("DOMContentLoaded", () => {
		console.log("init contact form validation");
		console.log("validation rules", validationRules.fistName);
		// select contact form on contact page
		const form = document.querySelector("form");
		// select inputs of contact form on contact page
		const inputs = document.querySelectorAll(".form__inputGroup input, .form__inputGroup textarea");
		// select message display of contact form for error and success messages
		const submitMessage = document.querySelector(".form__contactFormSubmitMessage");

		// -----------------------------
		// VALIDATION RULES
		// -----------------------------
		function validateField(input) {
			const rawValue = input.value;
			const value = rawValue.trim().replace(/\s+/g, " ");

			const errorEl = input.closest(".form__inputGroup").querySelector(".form__error");

			let error = "";

			const setError = (msg) => {
				error = msg;
			};

			switch (input.id) {
				// -------------------------
				// FIRST NAME
				// -------------------------
				case "firstName": {
					if (!value) {
						setError("First name is required");
					} else if (value.length < validationRules.firstName.minLength) {
						setError(`Must be at least ${validationRules.firstName.minLength} characters`);
					} else if (value.length > validationRules.firstName.maxLength) {
						setError(`Must be less than ${validationRules.firstName.maxLength} characters`);
					} else if (!validationRules.firstName.regex.start.test(value)) {
						setError("Must start with a letter");
					} else if (!validationRules.firstName.regex.full.test(value)) {
						setError("Contains invalid characters");
					}
					break;
				}
				// -------------------------
				// LAST NAME
				// -------------------------
				case "lastName": {
					if (!value) {
						// Left empty on purpose, last name is optional
					} else if (value.length < validationRules.lastName.minLength) {
						setError(`Must be at least ${validationRules.lastName.minLength} characters`);
					} else if (value.length > validationRules.lastName.maxLength) {
						setError(`Must be less than ${validationRules.lastName.maxLength} characters`);
					} else if (!validationRules.lastName.regex.start.test(value)) {
						setError("Must start with a letter");
					} else if (!validationRules.lastName.regex.full.test(value)) {
						setError("Contains invalid characters");
					}
					break;
				}
				// -------------------------
				// EMAIL
				// -------------------------
				case "email":
					if (!value) {
						setError("Email address is required");
					} else if (value.length < validationRules.email.minLength) {
						setError(`Email address must be at least ${validationRules.email.minLength} characters`);
					} else if (value.length > validationRules.email.maxLength) {
						setError(`Email address must be less than ${validationRules.email.maxLength} characters`);
					} else if (!validationRules.email.regex.test(value)) {
						setError("Enter a valid email address (e.g. john.smith@example.com)");
					}
					break;
				// -------------------------
				// PHONE
				// -------------------------
				case "phone": {
					if (!value) {
						// Left empty on purpose, phone number is optional
					} else if (!validationRules.phone.regex.test(value)) {
						setError("Only numbers, spaces, brackets, hyphens, and + are allowed");
					} else {
						const digits = value.replace(/\D/g, "");

						if (digits.length < validationRules.phone.digitsMin) {
							setError(`Phone number must contain at least ${validationRules.phone.digitsMin} digits`);
						} else if (digits.length > validationRules.phone.digitsMax) {
							setError(`Phone number must be less than ${validationRules.phone.digitsMax} digits`);
						}
					}
					break;
				}
				// -------------------------
				// SUBJECT
				// -------------------------
				case "subject":
					if (!value) {
						// Left empty on purpose, subject is optional
					} else if (value.length < 2) {
						setError("Subject must be at least 2 characters");
					} else if (value.length > 100) {
						setError("Subject must be less than 100 characters");
					}
					break;
				// -------------------------
				// MESSAGE
				// -------------------------
				case "message":
					if (!value) {
						setError("Message cannot be empty");
					} else if (value.length < 10) {
						setError("Message must be at least 10 characters");
					} else if (value.length > 1000) {
						setError("Message must be less than 1000 characters");
					}
					break;
			}
			// -----------------------------
			// UI UPDATE (centralized)
			// -----------------------------
			const showError = () => {
				errorEl.textContent = error;
				errorEl.style.opacity = 1;
				errorEl.style.visibility = "visible";
				input.setAttribute("aria-invalid", "true");
			};

			const clearError = () => {
				errorEl.style.opacity = 0;
				errorEl.style.visibility = "hidden";
				input.removeAttribute("aria-invalid");

				setTimeout(() => {
					errorEl.textContent = "";
				}, 400);
			};

			if (error) {
				showError();
				return false;
			}

			clearError();
			return true;
		}
		// -----------------------------
		// LIVE VALIDATION
		// -----------------------------
		for (const input of inputs) {
			input.addEventListener("blur", () => {
				validateField(input);
			});

			input.addEventListener("input", () => {
				if (input.value.trim().length > 0) {
					validateField(input);
				}
			});
		}
		// -----------------------------
		// FORM SUBMIT VALIDATION
		// -----------------------------
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const requiredIds = ["firstName", "email", "message"];
			const canSendMessage = requiredIds.every((id) => {
				const input = document.getElementById(id);
				return input ? validateField(input) : false;
			});
			const animateSubmitMessage = () => {
				submitMessage.classList.remove("form__contactFormSubmitMessage--animate");
				void submitMessage.offsetWidth; // Force a reflow so the browser sees the class removal
				submitMessage.classList.add("form__contactFormSubmitMessage--animate");
			};
			const addError = () => {
				submitMessage.classList.add("form__contactFormSubmitMessageError");
				submitMessage.textContent = "Error! Please fix all the fields above.";
				animateSubmitMessage();
			};
			const removeError = () => {
				submitMessage.classList.remove("form__contactFormSubmitMessageError");
			};
			const addSuccess = () => {
				removeError();
				submitMessage.classList.add("form__contactFormSubmitMessageSuccess");
				submitMessage.textContent = "Success! Sending Message.";
				animateSubmitMessage();
			};
			const removeSuccess = () => {
				submitMessage.classList.remove("form__contactFormSubmitMessageSuccess");
			};
			const resetSubmitMessage = () => {
				submitMessage.textContent = 'Click on "send message" to submit contact form';
				removeError();
				removeSuccess();
			};
			if (canSendMessage) {
				addSuccess();
				setTimeout(() => {
					resetSubmitMessage();
					form.submit();
				}, 800);
			} else {
				addError();
				for (const input of inputs) {
					if (input.id === "firstName" || input.id === "email" || input.id === "message") {
						const isError = !validateField(input);
						if (isError) {
							setTimeout(() => {
								input.scrollIntoView({
									behavior: "smooth",
									block: "center",
								});
							}, 1000);

							break;
						}
					}
				}
			}
		});
	});
}
