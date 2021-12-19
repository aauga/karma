import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import styles from './Coupons.module.css';

interface Company {
    id: string;
    logoUrl: string;
}

interface CompanyListProps {
    data: Company[];
}

const CouponCompanyList: Function = ({ data }: CompanyListProps) => {
    let list: any = [];

    data.map(company => {
        list.push(
            <Col key={company.id} xs={6} lg={4} xl={3}>
                <div className={styles.company}>
                    <Link to={`/coupons/${company.id}`}>
                        <img src={company.logoUrl} />
                    </Link>
                </div>
            </Col>
        );
    });

    return list;
};

export default CouponCompanyList;
