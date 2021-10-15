import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseURL = `${serverUrl}/api/item`;

export default function ItemDetails() {
  const { id } = useParams();

  const { user } = useAuth0();

  const history = useHistory();

  const { getAccessTokenSilently } = useAuth0();

  const { sub } = user;

  const [post, setPost] = React.useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    axios
      .delete(`${baseURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert('Post deleted!');
        setPost(null);
        history.push('/');
      });
  };

  React.useEffect(() => {
    axios.get(baseURL + `/${id}`).then(response => {
      setPost(response.data);
    });
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} className='g-4'>
        <Col>
          {post != null && (
            <Card>
              <Card.Img variant='top' src='https://i.imgur.com/9KM8lMC.jpg' />
              <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroupItem>
                  <b>City: </b>
                </ListGroupItem>
                <ListGroupItem>
                  <b>Category: </b>
                </ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
              </ListGroup>
              <Card.Body>
                {post.uploader == sub ? (
                  <Button variant='danger' onClick={handleSubmit}>
                    Delete
                  </Button>
                ) : (
                  <Button variant='success'>Take item</Button>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        ))}
      </Row>
    </Container>
  );
}
