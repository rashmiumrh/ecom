import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../csssignlog/login.css'; // Import the CSS file

function Login({ toggleForm }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (credentials.username === adminUsername && credentials.password === adminPassword) {
      // Admin login
      Swal.fire({
        title: 'Admin Login Successful!',
        text: 'Welcome back, Admin!',
        icon: 'success',
        confirmButtonText: 'Click okay to continue',
        customClass: {
          confirmButton: 'swal-custom-confirm'
        }
      }).then(() => {
        navigate('/admindashboard'); // Navigate to the admin dashboard page after clicking "Okay"
      });
    } else if (userData && userData.username === credentials.username && userData.password === credentials.password) {
      // User login
      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'Click okay to continue',
        customClass: {
          confirmButton: 'swal-custom-confirm'
        }
      }).then(() => {
        navigate('/dashboard'); // Navigate to the dashboard page after clicking "Okay"
      });
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src="https://imgcdn.floweraura.com/beautiful-bonsai-plant-in-ceramic-pot-9805560plm-A_0.jpg" alt="Plant" />
      </div>
      <div className="login-form">
        <h2 style={{ fontSize: "35px" }}>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" style={{ width: "350px" }}>
            <Form.Label className="form-label">Username</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              value={credentials.username} 
              onChange={handleChange} 
              required 
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" style={{ width: "350px" }}>
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              required 
              className="form-control"
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <div className="button-container">
            <Button variant="primary" type="submit" className="btn-primary">Login</Button>
            <Button variant="primary" className="btn-primary" onClick={toggleForm}>Don't have an account? Signup</Button>
          </div>
        </Form>
        <p>admin username=admin,password=admin123</p>

      </div>
      
    </div>
  );
}

export default Login;
