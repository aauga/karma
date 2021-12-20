import { Nav, Button } from 'react-bootstrap';
import styles from './Listings.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import ConfirmationModal from './ModalConfirmWinner';

interface Application {
    username: string;
    reason: string;
    isSuspended: boolean;
}

interface ApplicantProps {
    itemId: string;
    data: Application;
    name: string;
    buttonState: string;
    setButtonState: (keyId: string) => void;
    setUpdate: (updateOccured: boolean) => void;
}

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Applicant = ({ name, itemId, data, buttonState, setButtonState, setUpdate }: ApplicantProps) => {
    const [showModal, setShowModal] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    const suspendUser = async (data: Application) => {
        try {
            const token = await getAccessTokenSilently();
            await axios.put(`${serverUrl}/api/listings/${itemId}`, null, {
                params: {
                    username: data.username
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUpdate(true);

            if (!data.isSuspended) {
                toast.success('Successfully suspended user from participating.', { autoClose: 2500, hideProgressBar: true });
            } else {
                toast.success('Successfully unsuspended user from participating.', { autoClose: 2500, hideProgressBar: true });
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                toast.error(err.response.data.detail, { autoClose: 2500, hideProgressBar: true });
            } else {
                console.log(err);
            }
        }
    };

    return (
        <>
            <ConfirmationModal itemId={itemId} name={name} data={data} state={showModal} changeState={setShowModal} />
            <Nav.Item className='w-100' onClick={() => setButtonState(data.username)}>
                <Nav.Link id={styles.selected} eventKey={data.username} className={buttonState == data.username ? 'active py-3' : 'py-3'}>
                    <div className='d-flex align-items-top'>
                        <div
                            style={{
                                minWidth: '32px',
                                minHeight: '32px',
                                height: '32px',
                                width: '32px',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginRight: '1rem'
                            }}
                        >
                            <img
                                style={{ width: '100%', height: '100%' }}
                                src='https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
                            />
                        </div>
                        <div>
                            <h6 style={{ fontFamily: 'Raleway', fontWeight: 700, fontSize: '15px', margin: '0' }}>{data.username}</h6>
                            <p style={{ fontSize: '14px', margin: '0' }} className='mt-1'>
                                {data.reason}
                            </p>
                        </div>
                    </div>
                    {buttonState == data.username && (
                        <div className='d-flex justify-content-end mt-2'>
                            {!data.isSuspended && (
                                <Button variant='primary' style={{ marginRight: '.5rem' }} onClick={() => setShowModal(true)}>
                                    Make winner
                                </Button>
                            )}
                            {data.isSuspended ? (
                                <Button variant='primary' onClick={() => suspendUser(data)}>
                                    Unsuspend
                                </Button>
                            ) : (
                                <Button variant='primary' onClick={() => suspendUser(data)}>
                                    Suspend
                                </Button>
                            )}
                        </div>
                    )}
                </Nav.Link>
            </Nav.Item>
        </>
    );
};

export default Applicant;
