import { useAuth0 } from '@auth0/auth0-react';
import { Container, Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthenticationButton from './authentication-button';
export default function Hero() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {!isAuthenticated && (
        <Jumbotron fluid className='bg-white'>
          <Container className='mt-5 mb-5'>
            <h1>Sharing is caring! ✌️</h1>
            <p>Give your unused items to those who are in need! Karma blablabla</p>
            <Button variant='outline-secondary' className='mr-2'>
              Login
            </Button>
            <Button variant='primary'>Signup</Button>
          </Container>
        </Jumbotron>
      )}
      {isAuthenticated && (
        <Jumbotron fluid className='bg-white'>
          <Container className='mt-5 mb-5'>
            <h1>Sharing is caring! ✌️</h1>
            <p>Start doing good things right now! You can add your first listing here</p>
            <Button variant='primary'>Add Listing</Button>
          </Container>
        </Jumbotron>
      )}
    </div>
  );
}
