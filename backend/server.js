import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import SeedRouter from "./routes/SeedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import OrderRouter from "./routes/OrderRoutes.js";
import cors from "cors";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log("xyzpqr");
    console.log(err.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use("/api/seed", SeedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", OrderRouter);

const __dirname = path.resolve();
console.log("hai", __dirname);
app.use(express.static(path.join(__dirname, "../../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"))
);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.Port || 5000;

app.listen(port, () => {
  console.log(`server listening to http://localhost:${port}`);
});
