import express from "express";
import users from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const userI = await users.findOne({ email: req.body.email });
    console.log(userI);
    if (userI) {
      console.log("xyz");
      console.log(req.body.Password);
      console.log(userI.email, userI.Password);
      if (bcrypt.compareSync(req.body.Password, userI.Password)) {
        console.log("abc");
        res.send({
          _id: userI._id,
          name: userI.name,
          email: userI.email,
          isAdmin: userI.isAdmin,
          token: generateToken(userI),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or Password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body.name, req.body.email, req.body.Password);
    const newUser = new users({
      name: req.body.name,
      email: req.body.email,
      Password: bcrypt.hashSync(req.body.Password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await users.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.Password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        message: "User Updated",
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default userRouter;
