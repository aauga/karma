import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const redeemData = `${serverUrl}/api/redeem`;

interface ServerResponse {
    statusCode: number;
    response: {
        reason: string;
    };
    isApplied: boolean;
}

interface ButtonProps {
    listingId: string;
    reason: string;
    isApplied: boolean;
    handleChange: (arg: ServerResponse) => void;
}

const DetailButtons = (props: ButtonProps) => {
    const [btnClicked, setBtnClicked] = useState('none');
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const postRequest = async () => {
        setBtnClicked('apply');

        const token = await getAccessTokenSilently();

        try {
            const res = await axios.post(
                redeemData + `/${props.listingId}`,
                { reason: props.reason },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            props.handleChange({ statusCode: res.status, response: res.data, isApplied: true });

            toast.success('Successfully applied for item! 💪', { autoClose: 2500, hideProgressBar: true });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                if (e.response.data.title != undefined) {
                    toast.error(e.response.data.title, { autoClose: 2500, hideProgressBar: true });
                } else {
                    toast.error(e.response.data.detail, { autoClose: 2500, hideProgressBar: true });
                }
            } else {
                console.log(e);
            }
        }

        setBtnClicked('none');
    };

    const updateRequest = async () => {
        setBtnClicked('update');

        const token = await getAccessTokenSilently();

        try {
            const res = await axios.put(
                redeemData + `/${props.listingId}`,
                { reason: props.reason },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            props.handleChange({ statusCode: res.status, response: res.data, isApplied: true });

            toast.success('Reason updated! 💪', { autoClose: 2500, hideProgressBar: true });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                if (e.response.data.title != undefined) {
                    toast.error(e.response.data.title, { autoClose: 2500, hideProgressBar: true });
                } else {
                    toast.error(e.response.data.detail, { autoClose: 2500, hideProgressBar: true });
                }
            } else {
                console.log(e);
            }
        }

        setBtnClicked('none');
    };

    const deleteRequest = async () => {
        setBtnClicked('delete');

        const token = await getAccessTokenSilently();

        try {
            const res = await axios.delete(redeemData + `/${props.listingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            props.handleChange({ statusCode: res.status, response: { reason: '' }, isApplied: false });

            toast.success('Application for item removed 😔', { autoClose: 2500, hideProgressBar: true });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                if (e.response.data.title != undefined) {
                    toast.error(e.response.data.title, { autoClose: 2500, hideProgressBar: true });
                } else {
                    toast.error(e.response.data.detail, { autoClose: 2500, hideProgressBar: true });
                }
            } else {
                console.log(e);
            }
        }

        setBtnClicked('none');
    };

    if (props.isApplied) {
        return (
            <Row>
                <Col>
                    <Button className='w-100' variant='primary' disabled={!isAuthenticated || btnClicked != 'none'} onClick={updateRequest}>
                        {btnClicked == 'update' ? <Spinner animation='grow' size='sm' /> : 'Update'}
                    </Button>
                </Col>
                <Col>
                    <Button
                        className='w-100'
                        variant='outline-primary'
                        disabled={!isAuthenticated || btnClicked != 'none'}
                        onClick={deleteRequest}
                    >
                        {btnClicked == 'delete' ? <Spinner animation='grow' size='sm' /> : 'Delete'}
                    </Button>
                </Col>
            </Row>
        );
    }

    return (
        <Button variant='primary' className='w-100' disabled={!isAuthenticated || btnClicked != 'none'} onClick={postRequest}>
            {btnClicked == 'apply' ? <Spinner animation='grow' size='sm' /> : 'Apply'}
        </Button>
    );
};

export default DetailButtons;
