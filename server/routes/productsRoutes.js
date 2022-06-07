const express = require("express");
const router = express.Router();

const { getProducts } = require("../contorllers/productsController");

router.route("/").get(getProducts);

module.exports = router;
