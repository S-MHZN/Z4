require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const contactRouters = require("./routes/contact");
app.use("/contact", contactRouters);

// Start server
app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
