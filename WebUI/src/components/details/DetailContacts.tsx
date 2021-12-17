import { Button } from 'react-bootstrap';
import { BsFillTelephoneFill, BsMessenger } from 'react-icons/bs';
import styles from './Details.module.css';

const DetailContacts = () => {
    return (
        <div>
            <h3 className={`${styles.mt5} ${styles.h3}`}>Contacts</h3>
            <div>
                <Button className='w-100 mb-2 d-flex align-items-center justify-content-center'>
                    <BsFillTelephoneFill color='#fff' size={13} style={{ marginRight: '.5rem' }} />
                    +37067412537
                </Button>
                <Button className='w-100 d-flex align-items-center justify-content-center'>
                    <BsMessenger color='#fff' size={13} style={{ marginRight: '.5rem' }} />
                    Jonas Babrauskas
                </Button>
            </div>
        </div>
    );
};

export default DetailContacts;
