import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// import CardBody from "react-bootstrap/CardBody";
import Badge from "react-bootstrap/Badge";
import Rating from "../component/Rating";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Button from "react-bootstrap/Button";
import Loading from "./LoadingBox";
import MessageBox from "../component/MessageBox";
import { getError } from "../utility";
import { Store } from "../store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCESS":
      return { ...state, product: action.payload, loading: false };
    case "Fetch_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Productscreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slung } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    product: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const result = await axios.get(`/api/products/slug/${slung}`);
        console.log(result);
        dispatch({ type: "FETCH_SUCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }

      // setproducts(result.data);
    };
    fetchData();
  }, [slung]);

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

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col className='colmn' md={6}>
          <img
            className='img-large'
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup varient='flush'>
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>
                <strong>{product.description}</strong>
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup varient='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      {/* {product.countInStock} */}
                      {product.countInStock > 0 ? (
                        <Badge bg='success'>Instock</Badge>
                      ) : (
                        <Badge bg='danger'>OutOfStock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className='d-grid'>
                      <Button
                        onClick={() => addtoCartHandler(product)}
                        varient='primary'
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Productscreen;
