import mongoose from "mongoose";
const UserShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
    // created and updated time
  }
);

const users = mongoose.model("users", UserShema);
export default users;
