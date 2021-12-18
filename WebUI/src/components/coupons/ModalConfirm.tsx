import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CouponCodeModal from './ModalCouponCode';
import axios from 'axios';
import styles from './CouponModal.module.css';

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface Coupon {
    couponId: string;
    couponName: string;
    price: number;
    companyName: string;
}

interface ModalProps {
    data: Coupon;
    state: boolean;
    changeState: () => void;
}

const CouponConfirmation = ({ data, state, changeState }: ModalProps) => {
    const [showCode, setShowCode] = useState(false);
    const [couponId, setCouponId] = useState('');
    const [activationCode, setActivationCode] = useState('');
    const { getAccessTokenSilently } = useAuth0();

    const closeShowCode = () => setShowCode(false);

    const redeemCoupon = async () => {
        if (couponId != '') {
            try {
                const token = await getAccessTokenSilently();
                const res = await axios.post(
                    serverUrl + `/api/coupons/redeem/${couponId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setActivationCode(res.data.activationCode);
                changeState();
                setShowCode(true);
            } catch (e) {
                setCouponId('');
                setActivationCode('');

                if (axios.isAxiosError(e) && e.response) {
                    toast.error(e.response.data.detail, { autoClose: 2500, hideProgressBar: true });
                } else {
                    console.log(e);
                }
            }
        }
    };

    useEffect(() => {
        redeemCoupon();
    }, [couponId]);

    return (
        <>
            <CouponCodeModal couponId={activationCode} state={showCode} changeState={closeShowCode} />
            <Modal show={state} onHide={changeState}>
                <Modal.Header id={styles.header} closeButton>
                    <Modal.Title id={styles.title}>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body id={styles.body}>
                    Do you want to redeem the <span className={styles.markText}>{data.couponName}</span> coupon from{' '}
                    <span className={styles.markText}>{data.companyName}</span> for <span className={styles.markText}>{data.price} KP</span>
                    ?
                </Modal.Body>
                <Modal.Footer id={styles.footer}>
                    <Button
                        className='w-50'
                        variant='primary'
                        onClick={() => setCouponId(data.couponId)}
                        disabled={couponId != '' && activationCode == ''}
                    >
                        {couponId != '' && activationCode == '' ? <Spinner animation='grow' size='sm' /> : 'Redeem'}
                    </Button>
                    <Button className='w-50' variant='secondary' onClick={changeState} disabled={couponId != '' && activationCode == ''}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CouponConfirmation;
