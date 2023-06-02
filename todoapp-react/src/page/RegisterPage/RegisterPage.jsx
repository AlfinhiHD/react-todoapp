import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/users/register';

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(API_BASE_URL, {
        email : email,
        password : password,
      });

      navigate("/login")
      console.log(response.data);
    } catch (error) {

      console.error(error);
    }

  };

  return (
    <Container className='p-5' style={{ maxWidth: '600px' }}>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Register</h1>

          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicEmail" className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword" className='mb-5'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <div className='d-grid mb-2'>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>

          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;