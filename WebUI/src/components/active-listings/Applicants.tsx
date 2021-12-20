import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import Applicant from './Applicant';

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface Application {
    username: string;
    reason: string;
    isSuspended: boolean;
}

interface ServerResponse {
    statusCode: number;
    response: Application[];
}

const applicantsObj = {
    statusCode: 0,
    response: []
};

const Applicants = ({ itemId, name }: { itemId: string; name: string }) => {
    const [applicants, setApplicants] = useState<ServerResponse>(applicantsObj);
    const [buttonState, setButtonState] = useState('');
    const [updateOccured, setUpdateOccured] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    const [participants, setParticipants] = useState<Application[]>([]);
    const [suspended, setSuspended] = useState<Application[]>([]);

    const SuspendedApplicants = () => {
        let list: any = [];

        suspended.forEach(x => {
            list.push(
                <Applicant
                    key={x.username}
                    itemId={itemId}
                    name={name}
                    data={x}
                    buttonState={buttonState}
                    setButtonState={setButtonState}
                    setUpdate={setUpdateOccured}
                />
            );
        });

        if (list.length == 0) {
            return <></>;
        }

        return (
            <>
                <h4 style={{ fontSize: '16px', margin: '0' }} className='mb-3'>
                    Suspended applicants
                </h4>

                <Nav>{list}</Nav>
            </>
        );
    };

    const ParticipatingApplicants = () => {
        let list: any = [];

        participants.forEach(x => {
            list.push(
                <Applicant
                    key={x.username}
                    itemId={itemId}
                    name={name}
                    data={x}
                    buttonState={buttonState}
                    setButtonState={setButtonState}
                    setUpdate={setUpdateOccured}
                />
            );
        });

        if (list.length == 0) {
            return <></>;
        }

        return (
            <>
                <h4 style={{ fontSize: '16px', margin: '0' }} className='mb-3'>
                    Participating applicants
                </h4>

                <Nav>{list}</Nav>
            </>
        );
    };

    const getApplicants = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = await axios.get(`${serverUrl}/api/listings/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setApplicants({ statusCode: res.status, response: res.data });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setApplicants({
                    statusCode: err.response.status,
                    response: []
                });

                toast.error(err.response.data.detail, { autoClose: 2500, hideProgressBar: true });
            } else {
                setApplicants({
                    statusCode: 500,
                    response: []
                });
            }
        }
    };

    useEffect(() => {
        if (applicants.response.length != 0) {
            setSuspended([]);
            setParticipants([]);

            let suspendedList: Application[] = [];
            let participantList: Application[] = [];

            applicants.response.forEach(x => {
                if (x.isSuspended) {
                    suspendedList.push(x);
                } else {
                    participantList.push(x);
                }
            });

            setSuspended(suspendedList);
            setParticipants(participantList);
        }
    }, [applicants]);

    useEffect(() => {
        if (updateOccured) {
            getApplicants();
        }

        setUpdateOccured(false);
    }, [itemId, updateOccured]);

    return (
        <div className='mt-4'>
            {applicants.statusCode != 0 && (
                <>
                    <ParticipatingApplicants />
                    <SuspendedApplicants />
                </>
            )}
        </div>
    );
};

export default Applicants;
