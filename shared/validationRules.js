export const validationRules = {
	firstName: {
		minLength: 2,
		maxLength: 50,
		regex: {
			start: /^[A-Za-z]/,
			full: /^[A-Za-z\s'-]+$/,
		},
	},

	lastName: {
		minLength: 2,
		maxLength: 50,
		regex: {
			start: /^[A-Za-z]/,
			full: /^[A-Za-z\s'-]+$/,
		},
	},

	email: {
		minLength: 5,
		maxLength: 254,
		regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
	},

	phone: {
		digitsMin: 10,
		digitsMax: 15,
		regex: /^\+?[0-9\s()-]+$/,
	},

	subject: {
		minLength: 2,
		maxLength: 100,
	},

	message: {
		minLength: 10,
		maxLength: 1000,
	},
};
