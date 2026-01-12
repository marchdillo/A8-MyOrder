const express = require("express");
const router = express.Router();
const db = require("../config/db");

/**
 * GET /menus
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM menus", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

/**
 * POST /menus
 */
router.post("/", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "name dan price wajib diisi"
    });
  }

  const sql = "INSERT INTO menus (name, price) VALUES (?, ?)";

  db.query(sql, [name, price], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "Menu berhasil ditambahkan",
      id: result.insertId
    });
  });
});

/**
 * PUT /menus/:id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "name dan price wajib diisi"
    });
  }

  const sql = "UPDATE menus SET name = ?, price = ? WHERE id = ?";

  db.query(sql, [name, price, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    res.json({ message: "Menu berhasil diupdate" });
  });
});

/**
 * DELETE /menus/:id
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM menus WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    res.json({ message: "Menu berhasil dihapus" });
  });
});

module.exports = router;


