import mongoose from "mongoose";
const productShema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
    // created and updated time
  }
);

const products = mongoose.model("products", productShema);
export default products;
