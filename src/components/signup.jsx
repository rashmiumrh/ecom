import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../csssignlog/signup.css'; // Import the CSS file
import Login from './Login'; // Import the Login component

function Signup({ toggleForm }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    captcha: ''
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('user'); // Added state for userType

  function generateCaptcha() {
    return Math.random().toString(36).substr(2, 6);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.captcha !== captcha) {
      setError('Captcha is incorrect. Please try again.');
      setCaptcha(generateCaptcha());
      return;
    }

    if (userType === 'user') {
      localStorage.setItem('userData', JSON.stringify(formData));
      toggleForm();
    } else {
      // Admin login functionality could be added here if needed
    }
  };

  if (userType === 'admin') {
    return <Login toggleForm={toggleForm} />; // Render Login component if userType is admin
  }

  return (
    <div className="signup-container">
      <div className="image-container">
        <img src="https://www.fnp.com/images/pr/l/v20230329173037/majestic-bonsai-plant_7.jpg" alt="Plant" />
      </div>
      <div className="signup-form">
        <h2 style={{fontSize:"35px"}}>SIGN-UP</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUserType">
            <Form.Label>User Type</Form.Label>
            <Form.Control as="select" name="userType" value={userType} onChange={handleUserTypeChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          {userType === 'user' && (
            <>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formCaptcha">
                <Form.Label>Captcha</Form.Label>
                <div className="captcha-group">
                  <Form.Control type="text" name="captcha" value={formData.captcha} onChange={handleChange} required />
                  <span className="captcha-text">{captcha}</span>
                  <Button onClick={() => setCaptcha(generateCaptcha())} className="mr-9">Regenerate</Button>
                </div>
                {error && <p className="text-danger">{error}</p>}
              </Form.Group>
              <div className="button-group">
                <Button variant="primary" type="submit">Signup</Button>
                <Button variant="primary" onClick={toggleForm}>Already have an account? Login</Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Signup;
