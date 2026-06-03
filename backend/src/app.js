require("dotenv").config();

console.log("APP LOADED");

const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/dashboard", dashboardRouter);

module.exports = app;