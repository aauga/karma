import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import useQuery from '../common/QueryParams';
import LoadedListings from './LoadedListings';
import ListingPlaceholders from './ListingPlaceholders';
import Pagination from '../pagination/Pagination';
import NotFound from '../common/NotFound';
import NoContent from '../common/NoContent';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseURL = `${serverUrl}/api/items`;

const obj = {
    statusCode: 0,
    response: {
        pagination: {
            totalPages: 0,
            page: 0
        },
        items: []
    }
};

const Listings = () => {
    const query = useQuery();
    const [res, setRes] = useState(obj);

    useEffect(() => {
        axios
            .get(baseURL, { params: { page: query.get('page'), itemsPerPage: query.get('itemsPerPage') } })
            .then((resp: AxiosResponse) => setRes({ statusCode: resp.status, response: resp.data }))
            .catch((err: AxiosError | Error) => {
                if (axios.isAxiosError(err) && err.response) {
                    setRes({ statusCode: err.response.status, response: { pagination: { totalPages: 0, page: 0 }, items: [] } });
                } else {
                    setRes({ statusCode: 500, response: { pagination: { totalPages: 0, page: 0 }, items: [] } });
                }
            });

        window.scrollTo(0, 0);
    }, [query.get('page')]);

    if (res.statusCode != 0) {
        if (res.statusCode === 404) {
            return <NotFound />;
        }

        if (res.response.items.length === 0) {
            return <NoContent />;
        }

        return (
            <>
                <h2 className={'mb-3'}>Newest items</h2>
                <LoadedListings list={res.response.items} />
                <Pagination props={res.response.pagination} />
            </>
        );
    }

    return (
        <>
            <h2 className={'mb-3'}>Newest items</h2>
            <ListingPlaceholders amount={8} />
        </>
    );
};

export default Listings;
