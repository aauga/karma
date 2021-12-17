import { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
import { Container, Row, Col, Card, Image, Button, Carousel, Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import DetailForm from '../components/details/DetailForm';
import DetailCategory from '../components/details/DetailCategory';
import DetailTimeLeft from '../components/details/DetailTimeLeft';
import DetailLocation from '../components/details/DetailLocation';
import DetailWinner from '../components/details/DetailWinner';
import DetailContacts from '../components/details/DetailContacts';
import HeartButton from '../components/common/HeartButton';
import LoadedListings from '../components/listings/LoadedListings';
import ListingPlaceholders from '../components/listings/ListingPlaceholders';
import styles from '../components/details/Details.module.css';
import {
    Skeleton,
    DescriptionSkeleton,
    CategorySkeleton,
    TitleSkeleton,
    StatSkeleton,
    HeartSkeleton,
    AvatarSkeleton,
    UsernameSkeleton,
    RatingSkeleton,
    TextareaSkeleton,
    ImageSkeleton
} from '../components/details/DetailSkeleton.styles';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const userData = `${serverUrl}/api/user/metadata`;
const itemData = `${serverUrl}/api/items`;

const userObj = {
    statusCode: 0,
    response: {
        username: ''
    }
};

const itemObj = {
    statusCode: 0,
    response: {
        name: '',
        description: '',
        city: '',
        uploader: '',
        redeemer: '',
        expirationDate: '',
        category: 0,
        isSuspended: true,
        imageUrls: []
    }
};

const randomItemsObj = {
    statusCode: 0,
    response: []
};

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const [itemRes, setItemRes] = useState(itemObj);
    const [userRes, setUserRes] = useState(userObj);
    const [randomItems, setRandomItems] = useState(randomItemsObj);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const urls = [
        'https://images.unsplash.com/photo-1639680957169-ebff920c7e23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80',
        'https://images.unsplash.com/photo-1639674242533-e826a9992373?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1639603708440-220c057fc9af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
    ];

    const randomItemsReq = () => {
        axios
            .get(itemData + `/random?category=${itemRes.response.category}`)
            .then(res => setRandomItems({ statusCode: res.status, response: res.data }))
            .catch(e => console.log(e));
    };

    const itemReq = () => {
        axios
            .get(itemData + `/${id}`)
            .then(res => {
                setItemRes({ statusCode: res.status, response: res.data });

                if (!res.data.isSuspended || moment(res.data.expirationDate).diff(moment()) > 0) {
                    setTimeout(() => window.location.reload(), moment(res.data.expirationDate).diff(moment()));
                }
            })
            .catch((err: AxiosError | Error) => {
                if (axios.isAxiosError(err) && err.response) {
                    setItemRes({
                        statusCode: err.response.status,
                        response: {
                            name: '',
                            description: '',
                            city: '',
                            uploader: '',
                            redeemer: '',
                            expirationDate: '',
                            category: 0,
                            isSuspended: true,
                            imageUrls: []
                        }
                    });
                } else {
                    setItemRes({
                        statusCode: 500,
                        response: {
                            name: '',
                            description: '',
                            city: '',
                            redeemer: '',
                            uploader: '',
                            expirationDate: '',
                            category: 0,
                            isSuspended: true,
                            imageUrls: []
                        }
                    });
                }
            });
    };

    const userReq = async () => {
        if (isAuthenticated) {
            const token = await getAccessTokenSilently();

            axios
                .get(userData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => setUserRes({ statusCode: res.status, response: res.data }))
                .catch((err: AxiosError | Error) => {
                    if (axios.isAxiosError(err) && err.response) {
                        setUserRes({
                            statusCode: err.response.status,
                            response: { username: '' }
                        });
                    } else {
                        setUserRes({
                            statusCode: 500,
                            response: { username: '' }
                        });
                    }
                });
        } else {
            setUserRes({ statusCode: 401, response: { username: '' } });
        }
    };

    const Form = () => {
        if (itemRes.statusCode != 0 && userRes.statusCode != 0) {
            if (isAuthenticated) {
                if (itemRes.response.redeemer == userRes.response.username) {
                    return <DetailContacts />;
                }

                if (itemRes.response.uploader == userRes.response.username) {
                    return <Button className={`${styles.mt5} w-100`}>View Applications</Button>;
                }
            }

            if (itemRes.response.isSuspended) {
                return <h3 className={`${styles.mt5} ${styles.h3}`}>A winner has been selected! 🥳</h3>;
            }

            return <DetailForm listingId={id} />;
        }

        return (
            <div className={styles.mt5} style={{ width: '100%' }}>
                <h3 className={styles.h3}>Want this item?</h3>
                <Skeleton animation='glow'>
                    <TextareaSkeleton />
                </Skeleton>
                <Skeleton animation='glow'>
                    <Placeholder.Button className='mt-2' style={{ width: '100%' }} />
                </Skeleton>
            </div>
        );
    };

    const Information = () => {
        return (
            <>
                {itemRes.statusCode != 0 && userRes.statusCode != 0 && itemRes.response.redeemer == userRes.response.username && (
                    <DetailWinner />
                )}

                {itemRes.statusCode == 0 || userRes.statusCode == 0 ? (
                    <Skeleton animation='glow'>
                        <CategorySkeleton />
                    </Skeleton>
                ) : (
                    <DetailCategory category={itemRes.response.category} />
                )}

                <div className='d-flex align-items-center'>
                    {itemRes.statusCode == 0 || userRes.statusCode == 0 ? (
                        <Skeleton animation='glow'>
                            <TitleSkeleton />
                        </Skeleton>
                    ) : (
                        <Card.Title className={styles.title}>{itemRes.response.name}</Card.Title>
                    )}

                    {itemRes.statusCode == 0 || userRes.statusCode == 0 ? (
                        <Skeleton animation='glow' style={{ marginLeft: '.75rem' }}>
                            <HeartSkeleton />
                        </Skeleton>
                    ) : (
                        <div style={{ marginLeft: '.75rem' }}>
                            <HeartButton size={18} />
                        </div>
                    )}
                </div>

                <Stats />
            </>
        );
    };

    const Stats = () => {
        if (itemRes.statusCode == 0 || userRes.statusCode == 0) {
            return (
                <Skeleton animation='glow'>
                    <StatSkeleton />
                </Skeleton>
            );
        }

        if (!itemRes.response.isSuspended) {
            return (
                <div className='d-flex'>
                    <DetailLocation location={itemRes.response.city} />
                    <DetailTimeLeft expirationDate={itemRes.response.expirationDate} />
                </div>
            );
        }

        return <DetailLocation location={itemRes.response.city} />;
    };

    const Uploader = () => {
        return (
            <div style={{ marginTop: '2rem' }}>
                <h3 className={styles.h3}>Uploader</h3>
                <div className='d-flex align-items-center' style={{ marginRight: '.75rem' }}>
                    {itemRes.statusCode == 0 || userRes.statusCode == 0 ? (
                        <Skeleton animation='glow'>
                            <AvatarSkeleton />
                        </Skeleton>
                    ) : (
                        <div
                            className='mr-2'
                            style={{ backgroundColor: '#000000', minWidth: '72px', minHeight: '72px', borderRadius: '100%' }}
                        ></div>
                    )}
                    <div style={{ marginLeft: '1rem' }}>
                        {itemRes.statusCode == 0 || userRes.statusCode == 0 ? (
                            <Skeleton animation='glow'>
                                <UsernameSkeleton />
                            </Skeleton>
                        ) : (
                            <span className='wrap-text' style={{ fontFamily: 'Raleway', fontSize: '18px', fontWeight: 700 }}>
                                {itemRes.response.uploader}
                            </span>
                        )}

                        <div className='d-flex align-items-center'>
                            {itemRes.statusCode == 0 || userRes.statusCode == 0 ? (
                                <Skeleton animation='glow'>
                                    <RatingSkeleton />
                                </Skeleton>
                            ) : (
                                <>
                                    <div>
                                        <AiFillStar color='#F7C600' />
                                        <AiFillStar color='#F7C600' />
                                        <AiFillStar color='#F7C600' />
                                        <AiOutlineStar />
                                        <AiOutlineStar />
                                    </div>
                                    <span style={{ marginLeft: '.25rem', fontFamily: 'Roboto', fontSize: '13px' }}>(10)</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Images = () => {
        return (
            <div id={styles.mobileCarousel} className='mb-3'>
                {itemRes.statusCode == 0 || userRes.statusCode == 0 ? (
                    <Skeleton animation='glow'>
                        <ImageSkeleton />
                    </Skeleton>
                ) : (
                    <Carousel
                        style={{
                            borderRadius: '4px',
                            height: '450px',
                            backgroundColor: '#aeaeae',
                            overflow: 'hidden'
                        }}
                    >
                        {urls.map(url => (
                            <Carousel.Item key={url}>
                                <Image src={url} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
            </div>
        );
    };

    const LoadedCarousel: Function = () => {
        let list = [];
        let data = urls;

        for (let i = 0; i < data.length; i++) {
            list.push(
                <Carousel.Item key={data[i]} className={i == 0 ? 'active' : ''}>
                    <img
                        src={data[i]}
                        style={{
                            borderRadius: '4px',
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Carousel.Item>
            );
        }

        return list;
    };

    const Description = () => {
        return (
            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Description</h3>
                {itemRes.statusCode == 0 || userRes.statusCode == 0 ? (
                    <Skeleton animation='glow'>
                        <DescriptionSkeleton />
                    </Skeleton>
                ) : (
                    <p>{itemRes.response.description}</p>
                )}
            </div>
        );
    };

    useEffect(() => {
        userReq();
        itemReq();
        randomItemsReq();
    }, [id]);

    return (
        <Container>
            <Row id={styles.web} className='g-4 mt-1'>
                <Col lg='8'>
                    <Images />
                    <Description />
                </Col>

                <Col lg='4'>
                    <Card style={{ border: '0' }}>
                        <Card.Body className={styles.cardBody}>
                            <Information />
                            <Uploader />
                            <Form />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div id={styles.mobile}>
                <Information />
                <Images />
                <Description />
                <Uploader />
                <Form />
            </div>

            <div className='mb-5' style={{ marginTop: '2rem' }}>
                <h3 className='mb-3' style={{ fontSize: '24px', fontWeight: 700 }}>
                    More items like this
                </h3>
                <Row>
                    {randomItems.statusCode == 0 ? <ListingPlaceholders amount={4} /> : <LoadedListings list={randomItems.response} />}
                </Row>
            </div>
        </Container>
    );
};

export default Details;
