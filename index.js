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
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Example route using res.render()
app.get("/", (req, res) => {
	res.render("home", { title: "Home", message: "Hello, world!" });
});

// popia
app.get("/popia", (req, res) => {
	res.render("popia", { title: "Home", message: "Hello, world!" });
});

// paia
app.get("/paia", (req, res) => {
	res.render("paia");
});

// terms
app.get("/terms", (req, res) => {
	res.render("terms");
});

// Typography
app.get("/typography", (req, res) => {
	res.render("typography", { title: "Home", message: "Hello, world!" });
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
