import React, { useContext, useEffect, useState } from "react";
import CheckOut from "../component/CheckOut";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";

function Paymentmethod() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "paypal"
  );

  useEffect(() => {
    if (!shippingAddress.Address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckOut step1 step2 step3></CheckOut>
      <div className='contaiber small-container'>
        <title>Payment Method</title>
        <h1 className='my-3'>payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='paypal'
              label='paypal'
              value='paypal'
              checked={paymentMethodName === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='Stripe'
              label='Stripe'
              value='Stripe'
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className='mb-3'>
            <Button type='submit'>Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Paymentmethod;
