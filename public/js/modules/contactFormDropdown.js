export function initContactFormDropdown() {
	console.log("Dropdown script loaded");
	document.querySelectorAll("[data-select]").forEach((select) => {
		const button = select.querySelector("[data-select-button]");
		const label = select.querySelector("[data-select-label]");
		const options = select.querySelectorAll("[data-select-options] .form__selectOption");
		const input = select.querySelector("[data-select-input]");
		const list = document.querySelector(".form__selectOptions");
		list.style.backgroundColor = "red";

		button.addEventListener("click", () => {
			const isOpen = button.getAttribute("aria-expanded") === "true";

			button.setAttribute("aria-expanded", String(!isOpen));
			select.classList.toggle("is-open");
		});

		options.forEach((option) => {
			option.addEventListener("click", () => {
				const value = option.dataset.value;
				const text = option.textContent;

				label.textContent = text;
				input.value = value;

				button.setAttribute("aria-expanded", "false");
				select.classList.remove("is-open");
			});
		});
	});

	// ONE global listener (correct placement)
	document.addEventListener("click", (e) => {
		document.querySelectorAll("[data-select].is-open").forEach((select) => {
			if (!select.contains(e.target)) {
				const button = select.querySelector("[data-select-button]");
				select.classList.remove("is-open");
				button.setAttribute("aria-expanded", "false");
			}
		});
	});
}
