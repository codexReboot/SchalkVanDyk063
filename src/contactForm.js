import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export async function handleContactForm(req, res) {
	try {
		const { firstName, lastName, email, phone, subject, service, message } = req.body;

		await transporter.sendMail({
			from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
			to: process.env.EMAIL_USER,
			replyTo: email,
			subject: subject || "New Website Enquiry",
			text: `
Name: ${firstName} ${lastName}

Email: ${email}

Phone: ${phone || "Not provided"}

Service: ${service || "Not specified"}

Message:
${message}
			`,
		});

		res.redirect("/contact");
	} catch (error) {
		console.error("Email send failed:", error);
		res.status(500).send("Unable to send message");
	}
}
