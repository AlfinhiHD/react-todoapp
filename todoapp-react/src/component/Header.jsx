import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logotodo.png';

const Header = () => {
  const user = sessionStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      sessionStorage.removeItem('user');
      navigate('/');
    }
  }

  return (
    <Navbar className='shadow py-0' expand='lg'>
			<Container className='container-fluid'>
				<Navbar.Brand href='/' className='text-dark fw-semibold my-1'>
          <img src={Logo} alt="Logo" width="100" height="50" className='me-2' />
          TodoList App
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto align-items-center'>
            {user ? (
              <Nav.Link>
                <Button variant='danger' onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Link>
            ) : (
              <Link to='/login'>
                <Button variant='primary' className='ms-2 my-2'>
                  Login
                </Button>
              </Link>
            )}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
  )
}

export default Header