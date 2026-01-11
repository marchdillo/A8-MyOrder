// TODO: Definisikan semua jalur (Route) aplikasi kalian disini (GET, POST, PUT, DELETE)
const express = require("express");
const router = express.Router();

const menusRouter = require("./menus");
const ordersRouter = require("./orders");

router.use("/menus", menusRouter);
router.use("/orders", ordersRouter);

module.exports = router;


