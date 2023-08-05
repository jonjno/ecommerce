import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";
import CheckOut from "../component/CheckOut";

export default function ShippingScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { userInfo, shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [Address, setAddress] = useState(shippingAddress.Address || "");
  const [City, setCity] = useState(shippingAddress.City || "");
  const [PostalCode, setPostalCode] = useState(
    shippingAddress.PostalCode || ""
  );
  const [Country, setCountry] = useState(shippingAddress.Country || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        Address,
        City,
        PostalCode,
        Country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        Address,
        City,
        PostalCode,
        Country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <title>Shipping Adress</title>

      <CheckOut step1 step2></CheckOut>
      <h1 className='my-3'>Shipping address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='fullName'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='Address'>
          <Form.Label>ddress</Form.Label>
          <Form.Control
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            value={City}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='PostalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={PostalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='Country'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>
        <div className='mb-3'>
          <Button varient='primary' type='submit'>
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}
