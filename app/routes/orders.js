const express = require("express");
const router = express.Router();
const db = require("../config/db");

/**
 * GET /orders
 * Ambil semua order + nama menu
 */
router.get("/", (req, res) => {
  const sql = `
    SELECT
      o.id,
      o.menu_id,
      m.name AS menu_name,
      o.quantity,
      o.total_price,
      o.created_at
    FROM orders o
    JOIN menus m ON o.menu_id = m.id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

/**
 * POST /orders
 * Buat order baru (total_price dihitung otomatis)
 */
router.post("/", (req, res) => {
  const { menu_id, quantity } = req.body;

  if (!menu_id || !quantity) {
    return res.status(400).json({
      message: "menu_id dan quantity wajib diisi"
    });
  }

  const sql = `
    INSERT INTO orders (menu_id, quantity, total_price)
    SELECT id, ?, price * ?
    FROM menus
    WHERE id = ?
  `;

  db.query(sql, [quantity, quantity, menu_id], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    // insertId bisa 0 → NORMAL (INSERT SELECT)
    res.status(201).json({
      message: "Order berhasil dibuat"
    });
  });
});

/**
 * PUT /orders/:id
 * Update quantity + hitung ulang total_price
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({
      message: "quantity wajib diisi"
    });
  }

  const sql = `
    UPDATE orders o
    JOIN menus m ON o.menu_id = m.id
    SET
      o.quantity = ?,
      o.total_price = m.price * ?
    WHERE o.id = ?
  `;

  db.query(sql, [quantity, quantity, id], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json({ message: "Order berhasil diupdate" });
  });
});

/**
 * DELETE /orders/:id
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM orders WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json({ message: "Order berhasil dihapus" });
  });
});

module.exports = router;

