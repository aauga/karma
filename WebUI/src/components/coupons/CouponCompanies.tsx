import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import Companies from './CouponCompanyList';
import Placeholders from './CouponCompanyPlaceholders';

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
            console.log(e);
        }
    };

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <>
            <h2>Select a company</h2>

            <Row className='mt-3'>{companies.statusCode == 0 ? <Placeholders /> : <Companies data={companies.response} />}</Row>
        </>
    );
};

export default CouponCompanies;
