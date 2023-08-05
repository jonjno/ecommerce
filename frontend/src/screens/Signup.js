import Container from "react-bootstrap/esm/Container";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../store";

export default function SignupScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (Password !== ConfirmPassword) {
      alert("Invalid password");
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
        name,
        email,
        Password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container ClassName='small-container'>
      <Form onSubmit={submitHandler}>
        <h1>Sign Up</h1>
        <Form.Group ClassName='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            required
            onChange={(e) => setname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group ClassName='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group ClassName='mb-3' controlId='Password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group ClassName='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='ConfirmPassword'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className='mb-3'>
          <Button className='btn' type='submit'>
            Sign Up
          </Button>
        </div>
        <div className='mb-3'>
          Already Have an account{" "}
          <Link to={`/signup?redirect=${redirect}`}> sign In</Link>
        </div>
      </Form>
    </Container>
  );
}
