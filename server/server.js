const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API CRUD handlers
app.use("/api/products", require("./routes/productsRoutes"));

app.listen(port, () => console.log(`--\nServer started on port ${port}`));
