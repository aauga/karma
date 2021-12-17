import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import CardSkeleton from '../card/CardSkeleton';

interface PlaceholderProps {
    amount: number;
}

const StyledCol = styled(Col)`
    margin-bottom: 16px;
`;

const ListingPlaceholders: Function = ({ amount }: PlaceholderProps) => {
    let list = [];

    for (let i = 1; i <= amount; i++) {
        list.push(
            <StyledCol md={6} lg={4} xl={3}>
                <CardSkeleton key={i} />
            </StyledCol>
        );
    }

    return list;
};

export default ListingPlaceholders;
