import { Container, Tab, Nav, Col, Row } from 'react-bootstrap';
import ActiveListings from '../components/active-listings/ActiveListings';

const Listings = () => {
    return (
        <Container>
            <h2 className='my-3'>My Active Listings</h2>

            <Tab.Container>
                <Row>
                    <Col sm={4}>
                        <Nav variant='pills' className='flex-column'>
                            <ActiveListings />
                        </Nav>
                    </Col>
                    <Col sm={8}></Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default Listings;
