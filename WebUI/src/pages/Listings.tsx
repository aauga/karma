import { Container, Tab, Nav, Col, Row } from 'react-bootstrap';
import ActiveListings from '../components/active-listings/ActiveListings';

const Listings = () => {
    return (
        <Container>
            <h2 className='my-3'>My Active Listings</h2>

            <Tab.Container>
                <Nav variant='pills' className='flex-column'>
                    <ActiveListings />
                </Nav>
            </Tab.Container>
        </Container>
    );
};

export default Listings;
