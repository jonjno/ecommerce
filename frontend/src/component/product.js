import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../store";
import axios from "axios";

function Product(prod) {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addtoCartHandler = async (product) => {
    const existItem = cart.cartItem.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("sorry,product is not available");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
    // eslint-disable-next-line no-undef
    navigate("/cart");
  };

  const { product } = prod;
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img className='card-img-top' src={product.image} alt={product.name} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button varient='light' disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addtoCartHandler(product)}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
