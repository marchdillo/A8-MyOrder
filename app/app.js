// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini

const express = require("express");
const app = express();

const routes = require("./routes");

// middleware wajib
app.use(express.json());

// mount SEMUA routes
app.use("/", routes);

// test endpoint (opsional tapi sangat membantu)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});




