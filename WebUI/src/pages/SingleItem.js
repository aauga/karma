import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LikedCount from '../components/LikedCount';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseURL = `${serverUrl}/api/items`;

const SingleItem = () => {
  return (
    <Container>
      <Row className='g-4'>
        <Col>
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
              <LikedCount />
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
      </Row>
    </Container>
  );
};

export default SingleItem;
