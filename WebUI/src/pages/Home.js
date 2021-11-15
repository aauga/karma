import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      <Row xs={1} md={2} lg={3} className='g-4'>
        {post != null &&
          post.map(item => (
            <Col>
              <Card key={item.id} style={{ width: '300px', height: '100%' }}>
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
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  <ListGroupItem>
                    <b>City: </b>
                    {item.city}
                  </ListGroupItem>
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
};

export default Home;
