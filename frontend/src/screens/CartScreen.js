import { useContext } from "react";
import { Store } from "../store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/col";
import MessageBox from "../component/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItem },
  } = state;

  const updateHandler = async (item, quantity) => {
    console.log(item._id);
    const { data } = await axios.get(`/api/products/${item._id}`);
    console.log(data);
    if (data.countInStock < quantity) {
      window.alert("sorry,product is not available");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItem = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: { ...item },
    });
  };

  const changeHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItem.length === 0 ? (
            <MessageBox>
              Cart Is Empty
              <Link to='/'>Go shipping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {}
              {cartItem.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded img-thumbnail'
                      ></img>
                      {""}
                      <Link to={`/product/${item.slung}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        varient='light'
                        disabled={item.quantity === 1}
                        onClick={() => updateHandler(item, item.quantity - 1)}
                      >
                        <i className='fas fa-minus-circle'></i>
                      </Button>
                      {""}
                      {""}
                      {""}
                      <span>{item.quantity}</span>
                      {""}
                      {""}
                      <Button
                        varient='light'
                        onClick={() => updateHandler(item, item.quantity + 1)}
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className='fas fa-plus-circle'></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button varient='light' onClick={() => removeItem(item)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup varient='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal({cartItem.reduce((a, c) => a + c.quantity, 0)} $
                    {""}
                    items): $
                    {cartItem.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type='button'
                      varuent='primary'
                      onClick={changeHandler}
                      disabled={cartItem.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
