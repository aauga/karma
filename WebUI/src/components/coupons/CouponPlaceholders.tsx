import styled from 'styled-components';
import { Row, Col, Button, Placeholder } from 'react-bootstrap';
import styles from './Coupons.module.css';

const StyledPlaceholder = styled(Placeholder)`
    min-height: 0;
    border-radius: 4px;
    cursor: default;
`;

const CouponPlaceholders = () => {
    var list: any = [];

    for (let i = 0; i < 4; i++) {
        list.push(
            <Row key={i} id={styles.row} className='align-items-center my-3'>
                <Col md={4} lg={3} id={styles.couponImage}>
                    <StyledPlaceholder animation='glow' id={styles.couponImage}>
                        <StyledPlaceholder style={{ width: '100%', height: '100%' }} />
                    </StyledPlaceholder>
                </Col>

                <Col id={styles.rightSide} className='p-0'>
                    <Row className='align-items-center justify-content-between'>
                        <Col lg={7}>
                            <div className='mb-3'>
                                <StyledPlaceholder animation='glow'>
                                    <StyledPlaceholder style={{ width: '75px', height: '15px', marginBottom: '.5rem' }} />
                                </StyledPlaceholder>

                                <StyledPlaceholder animation='glow' className='d-block'>
                                    <StyledPlaceholder style={{ width: '150px', height: '32px' }} />
                                </StyledPlaceholder>
                            </div>
                            <StyledPlaceholder animation='glow'>
                                <StyledPlaceholder style={{ width: '300px', height: '16px' }} />
                            </StyledPlaceholder>
                        </Col>
                        <Col xs={2} lg={3}>
                            <StyledPlaceholder animation='glow'>
                                <StyledPlaceholder style={{ width: '60px', height: '50px', marginRight: '1rem' }} />
                            </StyledPlaceholder>
                            <StyledPlaceholder animation='glow'>
                                <StyledPlaceholder style={{ width: '60px', height: '50px' }} />
                            </StyledPlaceholder>
                        </Col>
                        <Col xs={10} lg={2}>
                            <Placeholder.Button style={{ width: '120px', height: '40px' }} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    return list;
};

export default CouponPlaceholders;
