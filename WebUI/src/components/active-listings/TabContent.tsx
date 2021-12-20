import { Tab } from 'react-bootstrap';
import Header from './ListingHeaderData';
import Applicants from './Applicants';

interface Listing {
    id: string;
    name: string;
    category: number;
    city: string;
    expirationDate: string;
    imageUrls: string[];
}

const TabContent = ({ itemId, data }: { itemId: string; data: Listing }) => {
    return (
        <Tab.Pane eventKey={itemId}>
            <div
                style={{
                    position: 'relative',
                    height: '15em',
                    borderRadius: '4px 4px 0 0',
                    width: '100%',
                    overflow: 'hidden',
                    marginRight: '1.25rem',
                    backgroundColor: '#aeaeae'
                }}
            >
                <img
                    src={data.imageUrls[0]}
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
            <div className='p-4'>
                <Header data={data} />
                <Applicants itemId={itemId} name={data.name} />
            </div>
        </Tab.Pane>
    );
};

export default TabContent;
