const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM menus", (err, results) => {
    if (err) {
      console.error("🔥 REAL DB ERROR:", err);
      return res.status(500).json({
        message: "Database error",
        detail: err.message
      });
    }
    res.json(results);
  });
});

 module.exports = router;
