const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const { menu_id, quantity } = req.body;

  if (!menu_id || !quantity) {
    return res.status(400).json({
      message: "menu_id dan quantity wajib diisi",
    });
  }

  // 1️⃣ Ambil harga menu
  const getMenuSql = "SELECT price FROM menus WHERE id = ?";

  db.query(getMenuSql, [menu_id], (err, menuResult) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (menuResult.length === 0) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    const price = menuResult[0].price;
    const total_price = price * quantity;

    // 2️⃣ Insert order + total_price
    const insertOrderSql = `
      INSERT INTO orders (menu_id, quantity, total_price)
      VALUES (?, ?, ?)
    `;

    db.query(
      insertOrderSql,
      [menu_id, quantity, total_price],
      (err, result) => {
        if (err) {
          console.error("DB ERROR:", err);
          return res.status(500).json({
            message: "Database error",
            detail: err.message,
          });
        }

        res.status(201).json({
          message: "Order berhasil dibuat",
          order_id: result.insertId,
          total_price,
        });
      }
    );
  });
});

module.exports = router;




