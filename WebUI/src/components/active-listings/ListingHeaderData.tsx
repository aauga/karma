import DetailLocation from '../details/DetailLocation';
import DetailTimeLeft from '../details/DetailTimeLeft';

interface Listing {
    id: string;
    name: string;
    category: number;
    city: string;
    expirationDate: string;
}

const ListingHeader = ({ data }: { data: Listing }) => {
    const categories = ['None', 'Clothing', 'Electronics', 'Food', 'Furniture'];

    return (
        <div>
            <span style={{ fontFamily: 'Raleway', fontWeight: 700, color: '#885df1', fontSize: '15px' }}>{categories[data.category]}</span>
            <h3 className='mt-1' style={{ fontSize: '32px', margin: '0' }}>
                {data.name}
            </h3>
            <div className='d-flex mt-2'>
                <DetailLocation location={data.city} />
                <DetailTimeLeft expirationDate={data.expirationDate} />
            </div>
        </div>
    );
};

export default ListingHeader;
