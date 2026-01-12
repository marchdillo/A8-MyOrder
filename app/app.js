// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini
const express = require("express");
const path = require("path");
const app = express();

const routes = require("./routes");

// middleware
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "views")));

// health check (aman taruh sebelum API)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// API routes (PASTIKAN SETELAH STATIC & ROOT)
app.use("/", routes);

// root → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});







