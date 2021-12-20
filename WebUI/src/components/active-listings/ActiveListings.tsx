import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ListingCard from './ListingCard';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const activeListingsUrl = `${serverUrl}/api/listings`;

interface Listing {
    id: string;
    name: string;
    imageUrls: string[];
    category: number;
}

interface ServerResponse {
    statusCode: number;
    response: Listing[];
}

const resObj = {
    statusCode: 0,
    response: []
};

const ActiveListings: Function = () => {
    const [listings, setListings] = useState<ServerResponse>(resObj);
    const { getAccessTokenSilently } = useAuth0();

    const getActiveListings = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = await axios.get(activeListingsUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setListings({ statusCode: res.status, response: res.data });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setListings({
                    statusCode: err.response.status,
                    response: []
                });

                toast.error(err.response.data.detail, { autoClose: 2500, hideProgressBar: true });
            } else {
                setListings({
                    statusCode: 500,
                    response: []
                });
            }
        }
    };

    useEffect(() => {
        getActiveListings();
    }, []);

    let list = [];

    for (let i = 0; i < listings.response.length; i++) {
        list.push(
            <ListingCard
                itemId={listings.response[i].id}
                key={i}
                keyId={listings.response[i].id}
                title={listings.response[i].name}
                category={listings.response[i].category}
                image={listings.response[i].imageUrls[0]}
            />
        );
    }

    return list;
};

export default ActiveListings;
