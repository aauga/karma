import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import LikedCount from '../components/LikedCount';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseURL = `${serverUrl}/api/items`;

const Home = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then(res => {
      setPost(res.data);
    });
  }, []);

  return (
    <Container>
      <Hero />
      <Row xs={1} md={2} lg={3} className='g-4'>
        {post != null &&
          post.map(item => (
            <Col>
              <Card key={item.id} style={{ width: '100%', height: '100%' }}>
                {item.imageUrls[0] == null ? (
                  <div
                    style={{
                      height: '200px',
                      backgroundColor: 'grey'
                    }}
                  ></div>
                ) : (
                  <Card.Img
                    variant='top'
                    src={item.imageUrls[0]}
                    style={{
                      height: '200px'
                    }}
                  />
                )}
                <Card.Body className='position-relative'>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
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
                  <Link to={`/details/${item.id}`} className='btn btn-primary stretched-link'>
                    Visit
                  </Link>
                </Card.Body>
                <Card.Footer>
                  <Card.Text>
                    <small class='text-muted'>Last updated 3 mins ago</small>
                  </Card.Text>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;
