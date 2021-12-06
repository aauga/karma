import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsHeart } from 'react-icons/bs';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseURL = `${serverUrl}/api/items`;

const SingleItem = () => {
    return (
        <Container>
            <Row className='g-4'>
                <Col md='9'>
                    <Card style={{ width: '100%', height: '100%' }}>
                        <div
                            style={{
                                height: '200px',
                                backgroundColor: 'grey'
                            }}
                        ></div>
                        <Card.Img
                            variant='top'
                            style={{
                                height: '200px'
                            }}
                        />
                        <Card.Body className='position-relative'>
                            <Card.Title>Lorem ipsum</Card.Title>
                            <Card.Text>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum </Card.Text>
                        </Card.Body>
                        <ListGroup className='list-group-flush'>
                            <ListGroupItem>
                                <b>City: </b> Vilnius
                            </ListGroupItem>
                            <ListGroupItem>
                                <b>Category: </b> Furniture
                            </ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Link className='btn btn-primary stretched-link'>Visit</Link>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>
                                <small class='text-muted'>Last updated 3 mins ago</small>
                            </Card.Text>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md='3'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Almost new sofa</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>Furniture</Card.Subtitle>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ipsum sed pretium porttitor, ligula
                                sapien elementum elit, at facilisis elit odio eu diam. Quisque sed velit fermentum, gravida diam ut, ornare
                                elit.
                            </Card.Text>
                            <div className='d-grid gap-2'>
                                <Button variant='primary'>
                                    <b>Apply</b>
                                </Button>
                                <Button variant='outline-secondary'>
                                    <BsHeart /> Add to favorites
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SingleItem;
