import express from "express";
import users from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";

const OrderRouter = express.Router();
OrderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const neworder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    console.log("back");
    const order = await neworder.save();
    console.log("new");
    res.status(201).send({ message: "New Order Created", order });
  })
);

OrderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

OrderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const order = await Order.findById(req.params.id);
    console.log("wow", order);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

OrderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "ordeer not found" });
    }
  })
);

export default OrderRouter;
