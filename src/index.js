import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const transporter = nodemailer.createTransport({
	host: "mail.schalkvandyk.com", // replace if cPanel shows something different
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// Home page
app.get("/", (req, res) => {
	res.render("home", { currentPage: "home" });
});

// Graphic Design page
app.get("/design", (req, res) => {
	// to display title on page
	res.render("design", { currentPage: "design", heading: "Website Design", slug: "design" });
});

// Web Development page
app.get("/development", (req, res) => {
	res.render("development", { heading: "Web Design & Development" });
});

// Hosting page
app.get("/hosting", (req, res) => {
	res.render("hosting", { heading: "Domain Setup & Web Hosting" });
});

// Marketing page
app.get("/marketing", (req, res) => {
	res.render("marketing", { heading: "Online Digital Marketing & SEO" });
});

// Contact page
app.get("/contact", (req, res) => {
	res.render("contact", { currentPage: "contact", heading: "Contact Us" });
});

app.post("/contact", async (req, res) => {
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
});

// Popia page
app.get("/popia", (req, res) => {
	res.render("popia", { currentPage: "popia" });
});

// Paia page
app.get("/paia", (req, res) => {
	res.render("paia", { currentPage: "paia" });
});

// Terms page
app.get("/terms", (req, res) => {
	res.render("terms", { currentPage: "terms" });
});

// Typography
app.get("/typography", (req, res) => {
	res.render("typography", { title: "Home", message: "Hello, world!" });
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
