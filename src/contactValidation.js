import { body, validationResult } from "express-validator";
import { validationRules } from "../shared/validationRules.js";

export const contactValidation = [
	body("firstName")
		.trim()
		.notEmpty()
		.withMessage("First name is required")
		.bail()
		.isLength({
			min: validationRules.firstName.minLength,
			max: validationRules.firstName.maxLength,
		})
		.withMessage(`First name must be ${validationRules.firstName.minLength}–${validationRules.firstName.maxLength} characters`)
		.bail()
		.matches(validationRules.firstName.regex.full)
		.withMessage("First name contains invalid characters"),

	body("lastName")
		.trim()
		.optional()
		.isLength({ min: validationRules.lastName.minLength, max: validationRules.lastName.maxLength })
		.withMessage(`Last name must be ${validationRules.lastName.minLength}–${validationRules.lastName.maxLength} characters`)
		.matches(validationRules.lastName.regex.full)
		.withMessage("Last name contains invalid characters"),

	body("email")
		.trim()
		.isLength({
			min: validationRules.email.minLength,
			max: validationRules.email.maxLength,
		})
		.withMessage(`Email address must be ${validationRules.email.minLength}–${validationRules.email.maxLength} characters`)
		.bail()
		.isEmail()
		.withMessage("Valid email is required")
		.normalizeEmail(),

	body("phone")
		.trim()
		.optional({ values: "falsy" })
		.matches(validationRules.phone.regex)
		.withMessage("Only numbers, spaces, brackets, hyphens, and + are allowed")
		.custom((value) => {
			const digits = value.replace(/\D/g, "");

			if (digits.length < validationRules.phone.digitsMin) {
				throw new Error(`Phone number must contain at least ${validationRules.phone.digitsMin} digits`);
			}

			if (digits.length > validationRules.phone.digitsMax) {
				throw new Error(`Phone number must contain no more than ${validationRules.phone.digitsMax} digits`);
			}

			return true;
		}),
	body("subject")
		.trim()
		.optional({ values: "falsy" })
		.isLength({
			min: validationRules.subject.minLength,
			max: validationRules.subject.maxLength,
		})
		.withMessage(`Subject must be ${validationRules.subject.minLength}–${validationRules.subject.maxLength} characters`),

	body("service").trim().optional(),

	body("message")
		.trim()
		.notEmpty()
		.withMessage("Message cannot be empty")
		.bail()
		.isLength({ min: validationRules.message.minLength })
		.withMessage(`Message must be at least ${validationRules.message.minLength} characters`)
		.bail()
		.isLength({ max: validationRules.message.maxLength })
		.withMessage(`Message must be less than ${validationRules.message.maxLength} characters`),

	(req, res, next) => {
		console.log("✅ contactValidation middleware ran");

		const errors = validationResult(req);

		console.log(errors.array());

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		next();
	},
];
