import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styles from './CouponModal.module.css';

interface ModalProps {
    state: boolean;
    changeState: () => void;
}

const CouponCodeModal = ({ state, changeState }: ModalProps) => {
    const code = 'URNADUCA';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        toast.success('Copied code to clipboard! 📋', { autoClose: 2500, hideProgressBar: true });
        changeState();
    };

    return (
        <Modal show={state} onHide={changeState} backdrop='static' keyboard={false}>
            <Modal.Header id={styles.header} className='d-flex justify-content-center'>
                <Modal.Title id={styles.title}>Congratulations! 👏</Modal.Title>
            </Modal.Header>
            <Modal.Body id={styles.body} className='text-center'>
                Here is your coupon. Have fun!
                <div id={styles.codeBox} className='py-2 px-3' onClick={copyToClipboard}>
                    {code}
                </div>
            </Modal.Body>
            <Modal.Footer id={styles.footer}>
                <Button className='w-100' variant='primary' onClick={copyToClipboard}>
                    Copy to clipboard
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CouponCodeModal;
