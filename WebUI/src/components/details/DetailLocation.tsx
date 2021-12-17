import { AiOutlineHome } from 'react-icons/ai';

interface LocationProps {
    location: string;
}

const DetailLocation = ({ location }: LocationProps) => {
    return (
        <div className='d-flex align-items-center' style={{ marginRight: '1rem' }}>
            <AiOutlineHome size={18} className='mr-2' />
            <span style={{ fontSize: '15px', marginLeft: '.5rem' }}>{location}</span>
        </div>
    );
};

export default DetailLocation;
