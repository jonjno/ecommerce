import express from "express";
import Product from "../Models/ProductModel.js";
import data from "../data.js";
import products from "../Models/ProductModel.js";
import users from "../Models/UserModel.js";

const SeedRouter = express.Router();

SeedRouter.get("/", async (req, res) => {
  await products.deleteMany();
  const createdProduct = await products.insertMany(data.products);
  await users.deleteMany();
  const createdUsers = await users.insertMany(data.users);
  res.send({ createdProduct, createdUsers });
});

export default SeedRouter;
