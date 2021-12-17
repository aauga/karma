import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Form } from 'react-bootstrap';
import axios, { AxiosError } from 'axios';
import DetailButtons from './DetailButtons';

interface FormProps {
    listingId: string;
}

interface ServerResponse {
    statusCode: number;
    response: {
        reason: string;
    };
    isApplied: boolean;
}

const serverUrl = process.env.REACT_APP_SERVER_URL;
const redeemData = `${serverUrl}/api/redeem`;

const reasonObj = {
    statusCode: 0,
    response: {
        reason: ''
    },
    isApplied: false
};

const DetailForm = ({ listingId }: FormProps) => {
    const [reasonRes, setReasonRes] = useState(reasonObj);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const updateReason = (e: React.ChangeEvent<HTMLInputElement>) => {
        let edit = { ...reasonRes };

        edit.response.reason = e.currentTarget.value;

        setReasonRes(edit);
    };

    const updateResponse = (value: ServerResponse) => {
        let edit = { ...reasonRes };

        edit.statusCode = value.statusCode;
        edit.response = value.response;
        edit.isApplied = value.isApplied;

        setReasonRes(edit);
    };

    const reasonReq = async () => {
        if (isAuthenticated) {
            const token = await getAccessTokenSilently();

            axios
                .get(redeemData + `/${listingId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => setReasonRes({ statusCode: res.status, response: res.data, isApplied: res.status === 200 }))
                .catch((err: AxiosError | Error) => {
                    if (axios.isAxiosError(err) && err.response) {
                        setReasonRes({
                            statusCode: err.response.status,
                            response: { reason: '' },
                            isApplied: false
                        });
                    } else {
                        setReasonRes({
                            statusCode: 500,
                            response: { reason: '' },
                            isApplied: false
                        });
                    }
                });
        }
    };

    useEffect(() => {
        reasonReq();
    }, []);

    return (
        <Form style={{ marginTop: '2rem' }}>
            <Form.Group>
                <Form.Label className='mb-2' style={{ fontFamily: 'Raleway', fontSize: '15px', fontWeight: 600 }}>
                    {reasonRes.isApplied ? 'Your current reason' : 'Want this item?'}
                </Form.Label>
                <Form.Control
                    className='mb-3'
                    as='textarea'
                    rows={2}
                    placeholder={'Specify a reason why you need it'}
                    value={reasonRes.response.reason}
                    onChange={updateReason}
                    disabled={!isAuthenticated}
                />
            </Form.Group>

            <DetailButtons
                listingId={listingId}
                reason={reasonRes.response.reason}
                isApplied={reasonRes.isApplied}
                handleChange={updateResponse}
            />
        </Form>
    );
};

export default DetailForm;
