import styled from 'styled-components';
import { Pagination } from 'react-bootstrap';
import Number from './PageNumber';
import Prev from './PagePrev';
import Next from './PageNext';
import Ellipsis from './PageEllipsis';

interface Props {
    props: {
        totalPages: number;
        page: number;
    };
}

const StyledPagination = styled(Pagination)`
    display: flex;
    justify-content: center;
    margin: 8px 0;
`;

const ListingPagination = ({ props }: Props) => {
    let items = [];
    let totalPages = props.totalPages;
    let currPage = props.page;

    if (currPage > 1) {
        items.push(<Prev currPage={currPage} />);
    }

    items.push(<Number totalPages={totalPages} currPage={currPage} page={1} />);

    if (currPage < 5) {
        for (let number = 2; number <= 5 && number < totalPages; number++) {
            items.push(<Number totalPages={totalPages} currPage={currPage} page={number} />);
        }

        totalPages > 6 && items.push(<Ellipsis />);
    } else if (currPage > totalPages - 4) {
        totalPages > 6 && items.push(<Ellipsis />);

        for (let number = totalPages - 4; number < totalPages; number++) {
            items.push(<Number totalPages={totalPages} currPage={currPage} page={number} />);
        }
    } else {
        items.push(<Ellipsis />);

        for (let number = currPage - 2; number <= currPage + 2; number++) {
            items.push(<Number totalPages={totalPages} currPage={currPage} page={number} />);
        }

        items.push(<Ellipsis />);
    }

    if (totalPages > 1) {
        items.push(<Number totalPages={totalPages} currPage={currPage} page={totalPages} />);
    }

    if (currPage < totalPages) {
        items.push(<Next currPage={currPage} />);
    }

    return <StyledPagination>{items}</StyledPagination>;
};

export default ListingPagination;
