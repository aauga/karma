import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Listings from '../components/listings/Listings';

const StyledRow = styled(Row)`
    margin-top: 16px;
`;

const Home = () => {
    return (
        <Container>
            <StyledRow>
                <Listings />
            </StyledRow>
        </Container>
    );
};

export default Home;
