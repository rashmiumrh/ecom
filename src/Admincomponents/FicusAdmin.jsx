import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../csssignlog/ficus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const initialCardData = [
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
];

function FicusAdmin() {
  const [cardData, setCardData] = useState(initialCardData);
  const [cartCounts, setCartCounts] = useState(
    Array(initialCardData.length).fill(0)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(
    Array(initialCardData.length).fill(false)
  );
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedCounts =
        JSON.parse(localStorage.getItem("cartCounts")) ||
        Array(initialCardData.length).fill(0);
      setCartCounts(storedCounts);
    } catch (error) {
      console.error("Failed to load cart counts from local storage", error);
      setCartCounts(Array(initialCardData.length).fill(0));
    }
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleCartChange = (index, change) => {
    const newCartCounts = [...cartCounts];
    const newCount = newCartCounts[index] + change;

    if (newCount >= 0) {
      newCartCounts[index] = newCount;
      setCartCounts(newCartCounts);

      let storedData = JSON.parse(localStorage.getItem("cartData")) || [];
      if (change > 0) {
        const existingIndex = storedData.findIndex(
          (item) => item.id === cardData[index].id
        );
        if (existingIndex !== -1) {
          storedData[existingIndex].count = newCount;
        } else {
          storedData.push({ ...cardData[index], count: newCount });
        }
      } else if (newCount === 0) {
        storedData = storedData.filter(
          (item) => item.id !== cardData[index].id
        );
      }

      localStorage.setItem("cartCounts", JSON.stringify(newCartCounts));
      localStorage.setItem("cartData", JSON.stringify(storedData));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (index) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = true;
    setIsEditing(newIsEditing);
  };

  const handleSaveClick = (index, newTitle, newSrc) => {
    const newCardData = [...cardData];
    newCardData[index] = {
      ...newCardData[index],
      title: newTitle,
      src: newSrc,
    };
    setCardData(newCardData);

    const newIsEditing = [...isEditing];
    newIsEditing[index] = false;
    setIsEditing(newIsEditing);
  };

  const handleDeleteClick = (index) => {
    const newCardData = cardData.filter((_, i) => i !== index);
    setCardData(newCardData);
    const newCartCounts = cartCounts.filter((_, i) => i !== index);
    setCartCounts(newCartCounts);
  };

  const filteredData = cardData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <NavDropdown.Item onClick={() => navigate("/adminDashboard")}>
            Dashboard
          </NavDropdown.Item>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link onClick={handleLogout} className="nav-item">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-2030711-1713351.png"
                alt="Logout"
                className="logout-icon"
              />
              Logout
            </Nav.Link>
            <NavDropdown title={<span><img src="https://e7.pngegg.com/pngimages/643/98/png-clipart-computer-icons-avatar-mover-business-flat-design-corporate-elderly-care-microphone-heroes.png" alt="Admin Profile" className="profile-icon" style={{ maxWidth: "40px", maxHeight: "40px" }} /> Admin</span>} id="admin-dropdown" className="nav-item">
            <NavDropdown.Item onClick={() => navigate("/add")}>Add</NavDropdown.Item>

              <NavDropdown.Item onClick={() => navigate("/ficusAdmin")}>Edit / Delete</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/adminorder")}>Orders</NavDropdown.Item>
            </NavDropdown>
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
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Card key={item.id} className="plant-card">
                {isEditing[index] ? (
                  <>
                    <Form.Control
                      type="text"
                      defaultValue={item.title}
                      className="edit-title-input"
                      onChange={(e) => (item.title = e.target.value)}
                    />
                    <Form.Control
                      type="text"
                      defaultValue={item.src}
                      className="edit-src-input"
                      onChange={(e) => (item.src = e.target.value)}
                    />
                    <Button
                      onClick={() => handleSaveClick(index, item.title, item.src)}
                      className="icon-button save-button"
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(index)}
                      className="icon-button delete-button"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Card.Img
                      variant="top"
                      src={item.src}
                      className="plant-image"
                    />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Button
                        onClick={() => handleEditClick(index)}
                        className="icon-button edit-button"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </Card.Body>
                  </>
                )}
              </Card>
            ))
          ) : (
            <p>No plants found</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default FicusAdmin;
