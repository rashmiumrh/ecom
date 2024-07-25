// src/components/Dashboard.js
import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../csssignlog/Dashboard.css";
import CategoriesPage from "./categories";
function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <Navbar bg="light" expand="lg" className="navbar">
        <Navbar.Brand onClick={() => navigate("/")} className="logo-container">
          <img
            src="https://media.istockphoto.com/id/1338652483/vector/bonsai-pink-japanese-cherry.jpg?s=612x612&w=0&k=20&c=EYw1Pl3HzsHfAPZ9Sr_BpPgT_DXUsr3QVqcQWp-uX2U="
            alt="Logo"
            className="logo"
          />
        </Navbar.Brand>
        <div className="categories-dropdown">
          {/* <NavDropdown title="Bonsai Categories" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => navigate("/category/ficus")}>
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
            {/* <Nav.Link href="#cart" className="nav-item">
              <img
                src="https://png.pngtree.com/element_our/20190531/ourmid/pngtree-shopping-cart-convenient-icon-image_1287807.jpg"
                alt="Cart"
                className="cart-icon"
              />
              Cart
            </Nav.Link> */}
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

      <Container className="bonsai-categories-container">
        <CategoriesPage /> 
      </Container>
    </div>
  );
}

export default Dashboard;
