import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../csssignlog/ficus.css";

// Updated cardData with additional images
const cardData = [
  {
    id: 1,
    src: "https://www.ugaoo.com/cdn/shop/files/1_375f29d7-0539-4206-8d69-722e9e43ede0.jpg?v=1712838390",
    title: "Ficus Bonsai Plant",
  },
  {
    id: 2,
    src: "https://www.bonsaiempire.com/images/carrousel/Maple01-acer-palmatum-fall.jpg",
    title: "Maple Bonsai Plant",
  },
  {
    id: 3,
    src: "https://www.bonsaiempire.com/images/articles-blog/cherry-sakura/cherry-bonsai-museum1.jpg",
    title: "Cherry Blossom Bonsai Plant",
  },
  {
    id: 4,
    src: "https://mybageecha.com/cdn/shop/products/ficus_religiosa_1.jpg?v=1571438608",
    title: "Ficus Bonsai Plant",
  },
  {
    id: 5,
    src: "https://gardenerspath.com/wp-content/uploads/2021/12/Cascade-Style-Bonsai.jpg",
    title: "Ficus Bonsai Plant",
  },
  {
    id: 6,
    src: "https://www.petalrepublic.com/wp-content/uploads/2022/05/How-the-Shape-of-Bonsai-Trees-Impacts-Their-Meaning-and-Symbolism-1024x683.jpeg",
    title: "Purple Bonsai Plant",
  },
  // Additional images
 
];

function Ficus() {
  const [cartCounts, setCartCounts] = useState(Array(cardData.length).fill(0));
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem("cartCounts")) || Array(cardData.length).fill(0);
    setCartCounts(storedCounts);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartCounts", JSON.stringify(cartCounts));
    const totalCartCount = cartCounts.reduce((a, b) => a + b, 0);
    localStorage.setItem("totalCartCount", JSON.stringify(totalCartCount));
  }, [cartCounts]);

  const handleCartChange = (index, change) => {
    const newCartCounts = [...cartCounts];
    const newCount = newCartCounts[index] + change;

    if (newCount >= 0) {
      newCartCounts[index] = newCount;
      setCartCounts(newCartCounts);

      // Update cart data
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      const item = { ...cardData[index], count: newCount };
      const existingIndex = cartData.findIndex(cartItem => cartItem.id === item.id);

      if (existingIndex > -1) {
        if (newCount === 0) {
          cartData.splice(existingIndex, 1);
        } else {
          cartData[existingIndex] = item;
        }
      } else if (newCount > 0) {
        cartData.push(item);
      }

      localStorage.setItem("cartData", JSON.stringify(cartData));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = cardData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="full-height-container">
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
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link href="#cart" className="nav-item" onClick={() => navigate("/cart")}>
              <img
                src="https://png.pngtree.com/element_our/20190531/ourmid/pngtree-shopping-cart-convenient-icon-image_1287807.jpg"
                alt="Cart"
                className="cart-icon"
              />
              Cart
              {JSON.parse(localStorage.getItem("totalCartCount")) > 0 && 
                <span className="cart-count">{JSON.parse(localStorage.getItem("totalCartCount"))}</span>
              }
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/")} className="nav-item">
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

      <Container>
        <input
          type="text"
          placeholder="Search Plants"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-box"
        />
        <div className="plant-cards">
          {filteredData.map((item, index) => (
            <Card key={item.id} className="plant-card">
              <Card.Img variant="top" src={item.src} className="plant-image" />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <div className="counter-container">
                  <button onClick={() => handleCartChange(index, -1)} className="remove">-</button>
                  <span>{cartCounts[index]}</span>
                  <button onClick={() => handleCartChange(index, 1)} className="add">+</button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Ficus;
