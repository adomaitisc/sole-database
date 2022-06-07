const asyncHandler = require("express-async-handler");

const Product = require("../models/productsModel");

//@desc READ a test
//@route GET /api/tests
const getProducts = asyncHandler(async (req, res) => {
  const products = await scrapeItems();
  res.status(200).json(products);
});

const scrapeItems = () => {
  return new Promise((resolve, reject) => {
    const products = [];
    const product = new Product({
      name: "test",
      price: "test",
      image: "test",
      description: "test",
      category: "test",
    });
    products.push(product);
    resolve(products);
  });
};

module.exports = {
  getProducts,
};
