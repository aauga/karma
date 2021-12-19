import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ width: '100vw', height: '100vh' }}>
            <Spinner animation='grow' role='status' className='bg-primary'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loading;
