import express from "express";
import products from "../Models/ProductModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const productM = await products.find();
  res.send(productM);
});

productRouter.get("/slug/:slug", async (req, res) => {
  const productItem = await products.findOne({ slug: req.params.slug });
  if (productItem) {
    res.send(productItem);
  } else {
    res.status(400).send({ message: "Product notFound" });
  }
});
productRouter.get("/:_id", async (req, res) => {
  console.log("abc");
  const productI = await products.findById(req.params._id);
  console.log("abc", productI);
  if (productI) {
    res.send(productI);
  } else {
    res.status(400).send({ message: "Product notFound" });
  }
});

export default productRouter;
