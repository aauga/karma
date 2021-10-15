import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseURL = `${serverUrl}/api/item`;

export default function Home() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then(response => {
      setPost(response.data);
    });
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} className='g-4'>
        {post != null &&
          post.map(item => (
            <Col>
              <Card key={item.id}>
                <Card.Img variant='top' src='https://i.imgur.com/9KM8lMC.jpg' />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  <ListGroupItem>
                    <b>City: </b>
                    {item.city}
                  </ListGroupItem>
                  <ListGroupItem>
                    {' '}
                    <b>Category: </b>
                    {item.category}
                  </ListGroupItem>
                  <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Link to={`/details/${item.id}`} className='btn btn-primary'>
                    Go to
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
