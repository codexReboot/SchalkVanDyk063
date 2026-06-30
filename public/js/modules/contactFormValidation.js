export function initContactFormValidation() {
	window.addEventListener("DOMContentLoaded", () => {
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
					} else if (value.length < 2) {
						setError("Must be at least 2 characters");
					} else if (value.length > 50) {
						setError("Must be less than 51 characters");
					} else if (!/^[A-Za-z]/.test(value)) {
						setError("Must start with a letter");
					} else if (!/^[A-Za-z\s'-]+$/.test(value)) {
						setError("Contains invalid characters");
					}
					break;
				}
				// -------------------------
				// LAST NAME
				// -------------------------
				case "lastName": {
					if (!value) {
					} else if (value.length < 2) {
						setError("Must be at least 2 characters");
					} else if (value.length > 50) {
						setError("Must be less than 51 characters");
					} else if (!/^[A-Za-z]/.test(value)) {
						setError("Must start with a letter");
					} else if (!/^[A-Za-z\s'-]+$/.test(value)) {
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
					} else if (value.length < 5) {
						setError("Email address is too short");
					} else if (value.length > 254) {
						setError("Email address is too long");
					} else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
						setError("Enter a valid email address (e.g. john.smith@example.com)");
					}
					break;
				// -------------------------
				// PHONE
				// -------------------------
				case "phone": {
					if (!value) {
					} else if (!/^\+?[0-9\s()-]+$/.test(value)) {
						setError("Only numbers, spaces, brackets, hyphens, and + are allowed");
					} else {
						const digits = value.replace(/\D/g, "");

						if (digits.length < 10) {
							setError("Phone number must contain at least 10 digits");
						} else if (digits.length > 15) {
							setError("Phone number must be less than 15 digits");
						}
					}
					break;
				}
				// -------------------------
				// SUBJECT
				// -------------------------
				case "subject":
					if (!value) {
					} else if (value.length < 3) {
						setError("Subject must be at least 3 characters");
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
