import { useState, useEffect } from 'react';
import { Container, Tab, Nav, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ActiveListings from '../components/active-listings/ActiveListings';
import TabContent from '../components/active-listings/TabContent';

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface Listing {
    id: string;
    name: string;
    imageUrls: string[];
    category: number;
    city: string;
    expirationDate: string;
}

interface ServerResponse {
    statusCode: number;
    response: Listing;
}

const resObj = {
    statusCode: 0,
    response: {
        id: '',
        name: '',
        imageUrls: [],
        category: 0,
        city: '',
        expirationDate: ''
    }
};

const SelectedListing = () => {
    const { id } = useParams<{ id: string }>();

    const [listing, setListing] = useState<ServerResponse>(resObj);

    const getListingData = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/items/${id}`);

            setListing({ statusCode: res.status, response: res.data });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setListing({
                    statusCode: err.response.status,
                    response: { id: '', name: '', imageUrls: [], category: 0, city: '', expirationDate: '' }
                });

                toast.error(err.response.data.detail, { autoClose: 2500, hideProgressBar: true });
            } else {
                setListing({
                    statusCode: 500,
                    response: { id: '', name: '', imageUrls: [], category: 0, city: '', expirationDate: '' }
                });
            }
        }
    };

    useEffect(() => {
        getListingData();
    }, [id]);

    return (
        <Container>
            <h2 className='my-3'>My Active Listings</h2>

            <Tab.Container defaultActiveKey={id}>
                <Row>
                    <Col sm={4}>
                        <Nav variant='pills' className='flex-column'>
                            <ActiveListings />
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>{listing.statusCode != 0 && <TabContent itemId={id} data={listing.response} />}</Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default SelectedListing;
