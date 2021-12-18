import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Row } from 'react-bootstrap';
import NoContent from '../common/NoContent';
import Companies from './CouponCompanyList';
import Placeholders from './CompanyPlaceholders';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const companiesObj = {
    statusCode: 0,
    response: []
};

const CouponCompanies = () => {
    const [companies, setCompanies] = useState(companiesObj);

    const getCompanies = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/coupons/companies`);
            setCompanies({ statusCode: res.status, response: res.data });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                setCompanies({ statusCode: e.response.status, response: [] });
                toast.error(e.response.data.detail, { autoClose: 2500, hideProgressBar: true });
            } else {
                setCompanies({ statusCode: 500, response: [] });
                console.log(e);
            }
        }
    };

    useEffect(() => {
        getCompanies();
    }, []);

    const Content = () => {
        if (companies.statusCode == 0) {
            return <Placeholders />;
        } else if (companies.response.length == 0) {
            return <NoContent />;
        }

        return <Companies data={companies.response} />;
    };

    return (
        <>
            <h2>Select a company</h2>

            <Row className='mt-3'>
                <Content />
            </Row>
        </>
    );
};

export default CouponCompanies;
