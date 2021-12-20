import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.svg';
import axios from 'axios';
import AuthenticationButton from './authentication-button';
import { AiOutlinePlus, AiOutlineLogout, AiFillThunderbolt } from 'react-icons/ai';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const userData = `${serverUrl}/api/user/metadata`;

const StyledNavbar = styled(Navbar)`
    border: 0;
    padding-top: 16px;
    padding-bottom: 16px;
`;

const StyledImage = styled.img`
    border-radius: 4px;
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
    const [points, setPoints] = useState(100);
    const { user, logout, isAuthenticated } = useAuth0();

    const userReq = async () => {
        if (isAuthenticated) {
            try {
                const token = await getAccessTokenSilently();
                const res = await axios.get(userData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPoints(res.data.points);
            } catch (err) {
                console.log(err);
            }
        }
    };

    userReq();

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
                            <StyledLink to='/listings' className='nav-link'>
                                Listings
                            </StyledLink>
                        )}
                    </Nav>
                    <Nav id='nav-right'>
                        {isAuthenticated && (
                            <div className='d-flex justify-content-end'>
                                <div
                                    className='nav-link'
                                    style={{
                                        backgroundColor: '#885df1',
                                        borderRadius: '4px',
                                        color: 'white',
                                        fontFamily: 'Raleway',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        minWidth: '50px',
                                        marginRight: '8px'
                                    }}
                                >
                                    <AiFillThunderbolt size={14} color={'#fff'} style={{ marginRight: '.1rem' }} /> {points}
                                </div>
                                <StyledLink to='/addlisting' className='nav-link'>
                                    <AiOutlinePlus color={'rgba(0,0,0,.55)'} size={18} />
                                </StyledLink>
                                <StyledLink
                                    className='nav-link'
                                    onClick={() =>
                                        logout({
                                            returnTo: window.location.origin
                                        })
                                    }
                                >
                                    <AiOutlineLogout color={'rgba(0,0,0,.55)'} size={18} />
                                </StyledLink>
                                <Link to='/profile'>
                                    <StyledImage src={user.picture} />
                                </Link>
                            </div>
                        )}

                        <AuthenticationButton />
                    </Nav>
                </StyledCollapse>
            </Container>
        </StyledNavbar>
    );
};

export default NavigationBar;
