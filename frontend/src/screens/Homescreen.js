import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import logger from "use-reducer-logger";
import Product from "../component/product";
import Loading from "./LoadingBox";
import MessageBox from "../component/MessageBox";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCESS":
      return { ...state, products: action.payload, loading: false };
    case "Fetch_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Homescreen() {
  // const [products, setproducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setproducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Here are the products :</h1>
      <div className='products'>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {products.map((pro) => (
              <Col key={pro.slug} sm={6} md={4} lg={3}>
                <Product product={pro}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
