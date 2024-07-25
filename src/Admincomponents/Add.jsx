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
import Swal from "sweetalert2"; // Import SweetAlert2
import "../csssignlog/Add.css";

// Combined Cart and Menu Component
function AddImagePage() {
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
  }; const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const handleSave = () => {
    // Get the existing images from local storage
    const existingImages = JSON.parse(localStorage.getItem("cardData")) || [];

    // Add the new image data to the array
    const newImage = {
      id: existingImages.length + 1, // Simple way to generate unique ID
      src: imageUrl,
      title: imageName,
    };

    existingImages.push(newImage);

    // Save the updated images back to local storage
    localStorage.setItem("cardData", JSON.stringify(existingImages));

    // Navigate back to the Ficus page
    navigate("/category/ficus");
  };

  const handlePlaceOrder = async () => {
    // Show SweetAlert2 message
    await Swal.fire({
      title: "Order Placed!",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Clear cart data
    localStorage.removeItem("cartData");
    setCartItems([]);

    // Navigate to the dashboard
    navigate("/ficusAdmin");
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
          <NavDropdown.Item onClick={() => navigate("/adminDashboard")}>
            Dashboard
          </NavDropdown.Item>

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
            {/* <Nav.Link
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
            </Nav.Link> */}
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

      {/* Cart Component */}
      <Container>
        {/* <h1>Coustomer order's</h1> */}
        <div className="add-image-page">
      <h2>Add New Image</h2>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image Name"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
      </Container>
    </div>
  );
}

export default AddImagePage;
