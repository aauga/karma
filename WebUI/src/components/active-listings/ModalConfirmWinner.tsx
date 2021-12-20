import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../coupons/CouponModal.module.css';

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface Application {
    username: string;
    reason: string;
    isSuspended: boolean;
}

interface ModalProps {
    name: string;
    itemId: string;
    data: Application;
    state: boolean;
    changeState: (show: boolean) => void;
}

const ModalConfirmWinner = ({ itemId, name, data, state, changeState }: ModalProps) => {
    const [response, setRes] = useState(-1);
    const { getAccessTokenSilently } = useAuth0();
    const history = useHistory();

    const confirmWinner = async () => {
        setRes(0);

        try {
            const token = await getAccessTokenSilently();
            const res = await axios.post(`${serverUrl}/api/listings/${itemId}`, null, {
                params: {
                    username: data.username
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Successfully confirmed winner of item.', { autoClose: 2500, hideProgressBar: true });

            setRes(res.status);
            changeState(false);

            history.push('/listings');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                toast.error(err.response.data.detail, { autoClose: 2500, hideProgressBar: true });
            } else {
                console.log(err);
            }
        }
    };

    return (
        <Modal show={state} onHide={changeState}>
            <Modal.Header id={styles.header} closeButton>
                <Modal.Title id={styles.title}>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body id={styles.body}>
                Confirm you want <span className={styles.markText}>{data.username}</span> to be the winner of item{' '}
                <span className={styles.markText}>{name}</span>. This can not be undone.
            </Modal.Body>
            <Modal.Footer id={styles.footer}>
                <Button className='w-50' variant='primary' disabled={response == 0} onClick={confirmWinner}>
                    {response == 0 ? <Spinner animation='grow' size='sm' /> : 'Confirm'}
                </Button>
                <Button className='w-50' variant='secondary' onClick={() => changeState(false)} disabled={response == 0}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirmWinner;
