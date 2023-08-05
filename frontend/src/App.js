import { React, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/Signin";
import NavDropdown from "react-bootstrap/NavDropdown";
import ShippingScreen from "./screens/ShippingScreen";
import SignupScreen from "./screens/Signup";
import Paymentmethod from "./screens/Paymentmethod";
import PlaceOrder from "./screens/PlaceOrder";
import FinalScrren from "./screens/FinalScrren";
import History from "./screens/History";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import Profile from "./screens/Profile";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");

    // window.location.href = "/signin";
  };

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg='dark' varient='dark' expand='lg'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand className='abc'>Hello!</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto w-100 justify-content-end'>
                  <Link to='/cart' className='Nav-link'>
                    Cart
                    {cart.cartItem.length > 0 && (
                      <Badge pill bg='danger'>
                        {cart.cartItem.length}
                      </Badge>
                    )}
                  </Link>

                  {userInfo ? (
                    <NavDropdown
                      className='abc'
                      title={userInfo ? userInfo.name : "hi"}
                      id='basic-nav-dropdown'
                    >
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/orderHistory'>
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className=' dropdown-item'
                        to='#signout'
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className='nav-link' to='/signin'>
                      Sign in
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path='/product/:slung' element={<Productscreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/' element={<Homescreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<Paymentmethod />} />
              <Route path='/placeorder' element={<PlaceOrder />} />
              <Route path='/orders/:id' element={<FinalScrren />} />
              <Route path='/orderHistory' element={<History />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </Container>
        </main>
      </div>
      <footer>
        <div className='text-center'>Al right reserved</div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
