import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "../csssignlog/cart.css";

// Combined Cart and Menu Component
function CombinedCartAndMenu() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from local storage
    const storedData = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartItems(storedData);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartData", JSON.stringify(updatedCartItems));
  };

  const handlePlaceOrder = async () => {
    // Show SweetAlert2 message
    await Swal.fire({
      title: 'Order Placed!',
      text: 'Your order has been placed successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    // Clear cart data
    localStorage.removeItem("cartData");
    setCartItems([]);

    // Navigate to the dashboard
    navigate("/category/ficus");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="full-height-container">
      {/* Menu Component */}
      <Navbar bg="light" expand="lg" className="navbar">
        <Navbar.Brand onClick={() => navigate("/")} className="logo-container">
          <img
            src="https://media.istockphoto.com/id/1338652483/vector/bonsai-pink-japanese-cherry.jpg?s=612x612&w=0&k=20&c=EYw1Pl3HzsHfAPZ9Sr_BpPgT_DXUsr3QVqcQWp-uX2U="
            alt="Logo"
            className="logo"
          />
        </Navbar.Brand>
        <div className="categories-dropdown">
        <NavDropdown.Item onClick={() => navigate("/dashboard")}>Dashboard</NavDropdown.Item>

          {/* <NavDropdown title="Bonsai Categories" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => navigate("/dashficus")}>
              Ficus
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/category/juniper")}>
              Juniper
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/category/maple")}>
              Maple
            </NavDropdown.Item>
          </NavDropdown> */}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link
              href="#cart"
              className="nav-item"
              onClick={() => navigate("/cart")}
            >
              <img
                src="https://png.pngtree.com/element_our/20190531/ourmid/pngtree-shopping-cart-convenient-icon-image_1287807.jpg"
                alt="Cart"
                className="cart-icon"
              />
              Cart
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="nav-item">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-2030711-1713351.png"
                alt="Logout"
                className="logout-icon"
              />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Cart Component */}
      <Container>
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="cart-items">
            {cartItems.map((item) => (
              <Card key={item.id} className="cart-item-card">
                <Card.Img variant="top" src={item.src} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Quantity: {item.count}</Card.Text>
                  <Button
                    style={{
                      background: "linear-gradient(135deg, #8ad1dc, #b8727e)",
                    }}
                    variant="danger"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <p className="para">Your cart is empty.</p>
        )}
        <Button
          variant="primary"
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
        >
          Place Order
        </Button>
      </Container>
    </div>
  );
}

export default CombinedCartAndMenu;
