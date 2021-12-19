import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import useQuery from '../components/common/QueryParams';
import CompanyList from '../components/coupons/LoadedCompanies';
import CouponList from '../components/coupons/LoadedCoupons';
import Pagination from '../components/pagination/Pagination';
import CouponPlaceholders from '../components/coupons/CouponPlaceholders';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const couponsObj = {
    statusCode: 0,
    response: {
        pagination: {
            totalPages: 0,
            page: 0,
            itemsPerPage: 0
        },
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
            if (axios.isAxiosError(e) && e.response) {
                setCoupons({
                    statusCode: e.response.status,
                    response: {
                        pagination: {
                            totalPages: 0,
                            page: 0,
                            itemsPerPage: 0
                        },
                        coupons: []
                    }
                });

                toast.error(e.response.data.detail, { autoClose: 2500, hideProgressBar: true });
            } else {
                setCoupons({
                    statusCode: 500,
                    response: {
                        pagination: {
                            totalPages: 0,
                            page: 0,
                            itemsPerPage: 0
                        },
                        coupons: []
                    }
                });
                console.log(e);
            }
        }
    };

    useEffect(() => {
        getCompanies();
    }, [id]);

    const Content = () => {
        if (coupons.statusCode == 0) {
            return <CouponPlaceholders />;
        }

        return (
            <>
                <Stack gap={4} className='my-2'>
                    <CouponList data={coupons.response.coupons} />
                </Stack>

                <Pagination props={coupons.response.pagination} />
            </>
        );
    };

    return (
        <Container>
            <CompanyList />

            <h2 className='mt-5'>Coupons</h2>

            <Content />
        </Container>
    );
};

export default Coupons;
