import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/signup";
import Dashboard from "./components/Dashboard";
import Ficus from "./components/Ficus";
import Dash from "./components/Dash";
import Cart from "./components/Cart";
import AdminDashboard from "./Admincomponents/AdminDashboard";
import FicusAdmin from "./Admincomponents/FicusAdmin";
import CategoriesPage from "./components/categories";
import AddImagePage from "./Admincomponents/Add";
import AdminCartPage from "./Admincomponents/Order";
function App() {
  const [showSignup, setShowSignup] = useState(false);

  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={
            showSignup ? (
              <Login toggleForm={toggleForm} />
            ) : (
              <Signup toggleForm={toggleForm} />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
        <Route path="/dashficus" element={<Dash />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/ficusAdmin" element={<FicusAdmin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminorder" element={<AdminCartPage />} />
        <Route path="/add" element={<AddImagePage />} />
        <Route path="/category/ficus" element={<Ficus />} />
      </Routes>
    </Router>
  );
}

export default App;
