import { Button, Modal } from 'react-bootstrap';
import styles from './CouponModal.module.css';

interface ModalProps {
    state: boolean;
    changeState: () => void;
}

const CouponConfirmation = ({ state, changeState }: ModalProps) => {
    return (
        <Modal show={state} onHide={changeState}>
            <Modal.Header id={styles.header} closeButton>
                <Modal.Title id={styles.title}>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body id={styles.body}>
                Do you want to redeem the <span className={styles.markText}>-5€ discount on all orders</span> coupon from{' '}
                <span className={styles.markText}>Wolt</span>?
            </Modal.Body>
            <Modal.Footer id={styles.footer}>
                <Button className='w-50' variant='primary' onClick={changeState}>
                    Redeem
                </Button>
                <Button className='w-50' variant='secondary' onClick={changeState}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CouponConfirmation;
