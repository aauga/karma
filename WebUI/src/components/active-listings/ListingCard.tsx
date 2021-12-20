import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ListingCardProps {
    itemId: string;
    keyId: string;
    title: string;
    image: string;
    category: number;
}

const ListingCard = ({ keyId, title, image, category, itemId }: ListingCardProps) => {
    const categories = ['None', 'Clothing', 'Electronics', 'Food', 'Furniture'];

    return (
        <Link to={`/listings/${itemId}`} style={{ textDecoration: 'none' }}>
            <Nav.Item>
                <Nav.Link eventKey={keyId} className='d-flex align-items-center'>
                    <div
                        style={{
                            position: 'relative',
                            height: '64px',
                            borderRadius: '4px',
                            width: '64px',
                            overflow: 'hidden',
                            marginRight: '1.25rem',
                            backgroundColor: '#aeaeae'
                        }}
                    >
                        <img
                            src={image}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: '0',
                                bottom: '0',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <div>
                        <div style={{ fontFamily: 'Raleway', fontWeight: 700 }}>{title}</div>
                        <div style={{ fontFamily: 'Raleway', fontWeight: 400, fontSize: '12px' }}>{categories[category]}</div>
                    </div>
                </Nav.Link>
            </Nav.Item>
        </Link>
    );
};

export default ListingCard;
