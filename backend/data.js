import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Jino",
      email: "admin@example.com",
      Password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      Password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: 1,
      name: "Nike Slim shirt",
      slug: "nike-slim-shirt",
      category: "Shirt",
      image: "/image/p1.jpg",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "High Qulity Shirt",
    },
    {
      // _id: 2,
      name: "Adidas fit shirt",
      slug: "adidas-slim-shirt",
      category: "Shirt",
      image: "/image/p2.jpg",
      price: 250,
      countInStock: 0,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 10,
      description: "High Qulity Shirt",
    },
    {
      // _id: 3,
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pant",
      image: "/image/p2.jpg",
      price: 1200,
      countInStock: 100,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "High Qulity Shirt",
    },
    {
      // _id: 4,
      name: "adidas fit pant",
      slug: "adidas-fit-pant",
      category: "pant",
      image: "/image/p4.jpg",
      price: 65,
      countInStock: 10,
      brand: "adidas",
      rating: 4.5,
      numReviews: 10,
      description: "High Qulity Shirt",
    },
  ],
};

export default data;
