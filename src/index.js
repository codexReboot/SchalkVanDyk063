import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

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
	res.render("design", { heading: "Graphic Design Solutions" });
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
	res.render("contact", { heading: "Contact Us" });
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
