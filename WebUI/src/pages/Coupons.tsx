import { Container, Button, Stack, Row, Col } from 'react-bootstrap';

const FillWithItems: Function = () => {
    let list = [];

    for (let i = 0; i < 5; i++) {
        list.push(
            <Row className='align-items-center m-auto'>
                <Col
                    md={4}
                    lg={3}
                    style={{
                        marginRight: '2rem',
                        backgroundColor: '#aeaeae',
                        height: '175px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        padding: '0'
                    }}
                >
                    <img src={'https://cdn.wolt.com/og_image_mall_web.jpg'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Col>

                <Col className='p-0 mt-sm-2 mt-md-0'>
                    <Row className='align-items-center justify-content-between'>
                        <Col lg={8}>
                            <div>
                                <span style={{ fontFamily: 'Raleway', fontWeight: 600, fontSize: '15px', color: '#885df1' }}>Wolt</span>
                                <h3 style={{ margin: '0', fontSize: '32px' }}>-5€ discount on all orders</h3>
                            </div>
                            <p className='mt-3'>
                                Get a 5€ coupon code from all orders in Wolt!Get a 5€ coupon code from all orders in Wolt!Get a 5€ coupon
                                code from all orders in Wolt!
                            </p>
                        </Col>
                        <Col xs={2} lg={2} style={{ width: 'auto' }}>
                            <div style={{ fontFamily: 'Raleway', fontWeight: 600, fontSize: '15px', color: '#885df1' }}>Price</div>
                            <span>10 KP</span>
                        </Col>
                        <Col xs={10} lg={2} style={{ width: 'auto' }}>
                            <Button style={{ padding: '0.75rem 1.5rem' }}>Redeem</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    return list;
};

const Coupons = () => {
    return (
        <Container>
            <h2 className='mt-3'>Available coupons</h2>

            <Stack className='my-4' gap={4}>
                <FillWithItems />
            </Stack>
        </Container>
    );
};

export default Coupons;
