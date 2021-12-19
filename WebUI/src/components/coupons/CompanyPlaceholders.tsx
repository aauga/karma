import styled from 'styled-components';
import { Col, Placeholder } from 'react-bootstrap';
import styles from './Coupons.module.css';

const StyledPlaceholder = styled(Placeholder)`
    min-height: 0;
    border-radius: 4px;
    cursor: default;
`;

const CompanyPlaceholders = () => {
    var list: any = [];

    for (let i = 0; i < 4; i++) {
        list.push(
            <Col className={styles.column} key={i} xs={6} lg={4} xl={3}>
                <StyledPlaceholder animation='glow'>
                    <StyledPlaceholder style={{ width: '100%', height: '0', paddingBottom: '50%' }} />
                </StyledPlaceholder>
            </Col>
        );
    }

    return list;
};

export default CompanyPlaceholders;
