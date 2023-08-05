import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CheckOut(props) {
  return (
    <Row className='checkout-steps'>
      <Col className={props.step1 ? "active" : ""}>Sign-In</Col>
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      <Col className={props.step3 ? "active" : ""}>Payment</Col>
      <Col className={props.step4 ? "active" : ""}>PlaceOrder</Col>
    </Row>
  );
}

export default CheckOut;
