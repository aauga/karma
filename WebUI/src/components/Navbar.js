import { useAuth0 } from '@auth0/auth0-react';
import { STATUS_CODES } from 'http';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.svg';
import AuthenticationButton from './authentication-button';

const StyledNavbar = styled(Navbar)`
    border: 0;
    padding-top: 16px;
    padding-bottom: 16px;
`;

const StyledImage = styled.img`
    border-radius: 50%;
    height: 32px;
    width: 32px;
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

const StyledLink = styled(Link)`
    padding: 0 8px;
    margin-right: 8px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
        border-radius: 4px;
    }

    @media (max-width: 992px) {
        margin: 4px 0;
        padding: 0 16px !important;
    }
`;

const NavigationBar = () => {
    const { user } = useAuth0();
    const { isAuthenticated } = useAuth0();
    // const { picture } = user;
    return (
        <StyledNavbar expand='lg' variant='light'>
            <Container>
                <Link to='/' className='nav-link'>
                    <img src={logo} alt='logo' />
                </Link>

                <StyledToggle aria-controls='responsive-navbar-nav' />
                <StyledCollapse id='responsive-navbar-nav'>
                    <Nav id='nav-left' className='me-auto'>
                        <StyledLink to='/' className='nav-link'>
                            Browse
                        </StyledLink>
                        <StyledLink to='/coupons' className='nav-link'>
                            Coupons
                        </StyledLink>
                        {isAuthenticated && (
                            <>
                                <StyledLink to='/listings' className='nav-link'>
                                    Listings
                                </StyledLink>
                                <StyledLink to='/addlisting' className='nav-link'>
                                    Add Listing
                                </StyledLink>
                            </>
                        )}
                    </Nav>
                    <Nav id='nav-right'>
                        {isAuthenticated && (
                            <Link to='/profile'>
                                <StyledImage src={user.picture} />
                            </Link>
                        )}

                        <AuthenticationButton />
                    </Nav>
                </StyledCollapse>
            </Container>
        </StyledNavbar>
    );
};

export default NavigationBar;
