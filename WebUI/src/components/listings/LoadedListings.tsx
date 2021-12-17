import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import Card from '../card/Card';

interface Item {
    id: string;
    name: string;
    uploader: string;
    imageUrls: string[];
}

interface Props {
    list: Item[];
}

const StyledCol = styled(Col)`
    margin-bottom: 16px;
`;

const LoadedListings: Function = ({ list }: Props) => {
    return list.map((item: Item) => (
        <StyledCol key={item.id} md={6} lg={4} xl={3}>
            <Card
                key={item.id}
                itemId={item.id}
                title={item.name || 'Unknown name'}
                uploader={item.uploader || 'Unknown uploader'}
                image={item.imageUrls[0]}
            />
        </StyledCol>
    ));
};

export default LoadedListings;
