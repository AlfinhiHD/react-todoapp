import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://projek-kelompok-8.as.r.appspot.com/login';

function LoginPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_BASE_URL, {
        email: email,
        password: password
      },);
      console.log(response.data);

      const user = {
        token: response.data.token,
        userid: response.data.id
      }

      sessionStorage.setItem("user", JSON.stringify(user));

      

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.message)
      setMessage(error.response.data.message)
      console.error(error);
    }
  };

  return (
    <Container className='p-5' style={{ maxWidth: '600px' }}>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Login</h1>

          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='mb-5'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <small className='text-danger'>{message}</small>

            <div className='d-grid mb-2'>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>

          <p className='text-center'>
            Don't have an account yet? <Link to="/register">Register</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;