// src/components/CategoriesPage.js
import React, { useState } from "react";
import { Card, Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../csssignlog/Dashboard.css";

const categories = [
  {
    name: "Ficus",
    img: "https://www.ugaoo.com/cdn/shop/files/1_375f29d7-0539-4206-8d69-722e9e43ede0.jpg?v=1712838390",
  },
  {
    name: "Juniper",
    img: "https://pro-organic.com/cdn/shop/articles/japanese-juniper-bonsai-guide-Aug282020-1-min.jpg?v=1649703000",
  },
  {
    name: "Maple",
    img: "https://www.bonsaiempire.com/images/carrousel/Maple01-acer-palmatum-fall.jpg",
  },
];

function Profile() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToCategory = (category) => {
    navigate(`/ficusAdmin`);
  };

  return (
    <div>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search categories"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      {filteredCategories.length === 0 ? (
        <Alert variant="info">No results found</Alert>
      ) : (
        <Row>
          {filteredCategories.map((category, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="bonsai-card">
                <Card.Img variant="top" src={category.img} />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Button
                    style={{
                      background: "linear-gradient(135deg, #8ad1dc, #b8727e)",
                      border: "none",
                    }}
                    variant="primary"
                    onClick={() =>
                      navigateToCategory(category.name.toLowerCase())
                    }
                  >
                    View More
                  </Button>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Profile;
