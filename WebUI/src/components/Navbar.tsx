import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../logo.svg';

const StyledNavbar = styled(Navbar)`
  border: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  box-shadow: 0 1px 4px rgba(64, 87, 109, 0.07);
`;

const StyledToggle = styled(Navbar.Toggle)`
  border: 0;

  &:focus {
    outline: none;
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
  }
`;

const StyledCollapse = styled(Navbar.Collapse)`
  @media (max-width: 992px) {
    margin-top: 8px;
    display: flex;
    flex-flow: column;

    .navbar-nav {
      width: 100%;
      margin-top: 4px;
    }

    #nav-left {
      order: 2;
    }

    #nav-right {
      order: 1;
    }
  }
`;

const StyledNavLink = styled(Nav.Link)`
  margin-right: 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
  }

  @media (max-width: 992px) {
    margin: 4px 0;
    padding-left: 16px !important;
  }
`;

const SignInBtn = styled(Button)`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 13px;
  padding: 8px 16px;
`;

const NavigationBar = () => {
  return (
    <StyledNavbar expand='lg' variant='light'>
      <Container>
        <StyledNavbar.Brand href='#home'>
          <img src={logo} alt='logo' />
        </StyledNavbar.Brand>
        <StyledToggle aria-controls='responsive-navbar-nav' />
        <StyledCollapse id='responsive-navbar-nav'>
          <Nav id='nav-left' className='me-auto'>
            <StyledNavLink href='#features'>Features</StyledNavLink>
            <StyledNavLink href='#pricing'>Pricing</StyledNavLink>
          </Nav>
          <Nav id='nav-right'>
            <SignInBtn>Sign In</SignInBtn>
          </Nav>
        </StyledCollapse>
      </Container>
    </StyledNavbar>
  );
};

export default NavigationBar;
