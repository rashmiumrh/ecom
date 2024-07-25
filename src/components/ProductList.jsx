// src/components/ProductList.js
import React, { useState } from 'react';

const ProductList = ({ addToCart }) => {
  const [search, setSearch] = useState('');
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    // Add more products here
  ];

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-group">
        {products
          .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
          .map((product) => (
            <li key={product.id} className="list-group-item">
              {product.name} - ${product.price}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
