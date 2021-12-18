import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack } from 'react-bootstrap';
import axios from 'axios';
import useQuery from '../components/common/QueryParams';
import CompanyList from '../components/coupons/LoadedCompanies';
import CouponList from '../components/coupons/LoadedCoupons';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const couponsObj = {
    statusCode: 0,
    response: {
        coupons: []
    }
};

const Coupons = () => {
    const query = useQuery();
    const { id } = useParams<{ id: string }>();
    const [coupons, setCoupons] = useState(couponsObj);

    const getCompanies = async () => {
        try {
            const res = await axios.get(serverUrl + `/api/coupons/${id}`, {
                params: { page: query.get('page'), itemsPerPage: query.get('itemsPerPage') }
            });

            setCoupons({ statusCode: res.status, response: res.data });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCompanies();
    }, [id]);

    return (
        <Container>
            <CompanyList />

            <h2 className='mt-5'>Coupons</h2>

            <Stack gap={4} className='mt-3'>
                <CouponList data={coupons.response.coupons} />
            </Stack>
        </Container>
    );
};

export default Coupons;
