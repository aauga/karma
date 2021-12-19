import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from './Coupons.module.css';
import ConfirmationModal from './ModalConfirm';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const userData = `${serverUrl}/api/user/metadata`;

interface Coupon {
    couponId: string;
    couponName: string;
    description: string;
    price: number;
    amount: number;
    companyName: string;
    logoUrl: string;
}

interface ListProps {
    data: Coupon[];
}

const userObj = {
    statusCode: 0,
    response: {
        points: 0
    }
};

const couponObj = {
    selectedCoupon: { couponId: '', couponName: '', price: 0, companyName: '' },
    showModal: false
};

const LoadedCoupons: Function = ({ data }: ListProps) => {
    const [modal, setModal] = useState(couponObj);
    const [userRes, setUserRes] = useState(userObj);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const userReq = async () => {
        if (isAuthenticated) {
            try {
                const token = await getAccessTokenSilently();
                const res = await axios.get(userData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserRes({ statusCode: res.status, response: res.data });
            } catch (e) {
                if (axios.isAxiosError(e) && e.response) {
                    setUserRes({
                        statusCode: e.response.status,
                        response: { points: 0 }
                    });
                    toast.error(e.response.data.detail, { autoClose: 2500, hideProgressBar: true });
                } else {
                    console.log(e);
                    setUserRes({ statusCode: 500, response: { points: 0 } });
                }
            }
        } else {
            setUserRes({ statusCode: 401, response: { points: 0 } });
        }
    };

    useEffect(() => {
        userReq();
    }, []);

    const hideModal = () => setModal({ selectedCoupon: { couponId: '', couponName: '', price: 0, companyName: '' }, showModal: false });

    return (
        <>
            <ConfirmationModal data={modal.selectedCoupon} state={modal.showModal} changeState={hideModal} />

            {data.map(coupon => (
                <Row key={coupon.couponId} id={styles.row} className='align-items-center'>
                    <Col md={4} lg={3} id={styles.couponImage}>
                        <img src={coupon.logoUrl} />
                    </Col>

                    <Col id={styles.rightSide} className='p-0'>
                        <Row className='align-items-center justify-content-between'>
                            <Col lg={7}>
                                <div>
                                    <span className={styles.primaryText}>{coupon.companyName}</span>
                                    <h3 id={styles.couponName}>{coupon.couponName}</h3>
                                </div>
                                <p className='mt-3'>{coupon.description}</p>
                            </Col>
                            <Col xs={2} lg={3} className='w-auto'>
                                <div className='d-inline-block'>
                                    <div className={styles.primaryText}>Price</div>
                                    <span>{coupon.price} KP</span>
                                </div>
                                <div id={styles.amount} className='d-inline-block'>
                                    <div className={styles.primaryText}>Amount</div>
                                    <span>{coupon.amount} left</span>
                                </div>
                            </Col>
                            <Col xs={10} lg={2} className='w-auto'>
                                <Button
                                    className='px-4 py-2'
                                    onClick={() => setModal({ selectedCoupon: coupon, showModal: true })}
                                    disabled={!isAuthenticated || userRes.response.points < coupon.price}
                                >
                                    {isAuthenticated && userRes.response.points < coupon.price ? 'No balance' : 'Redeem'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
        </>
    );
};

export default LoadedCoupons;
