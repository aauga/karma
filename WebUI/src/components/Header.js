import { useAuth0 } from '@auth0/auth0-react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthenticationButton from './authentication-button';
export default function Header() {
  const { isAuthenticated } = useAuth0();
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='#'>Karma</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
            {isAuthenticated && (
              <Link to='/profile' className='nav-link'>
                Profile
              </Link>
            )}
            {isAuthenticated && (
              <Link to='/addlisting' className='nav-link'>
                Add Listing
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <AuthenticationButton />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
