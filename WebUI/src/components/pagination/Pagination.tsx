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

    // Hide previous page button if first page
    if (currPage > 1) {
        items.push(<Prev currPage={currPage} key={'prev'} />);
    }

    items.push(<Number key={'first-page'} totalPages={totalPages} currPage={currPage} page={1} />);

    // Case 1 2 3 4 5 ... X
    if (currPage < 5) {
        for (let number = 2; number <= 5 && number < totalPages; number++) {
            items.push(<Number key={number} totalPages={totalPages} currPage={currPage} page={number} />);
        }

        totalPages > 6 && items.push(<Ellipsis key={'first-ellipsis'} />);
        // Case 1 ... X X X X X
    } else if (currPage > totalPages - 4) {
        totalPages > 6 && items.push(<Ellipsis key={'second-ellipsis'} />);

        for (let number = totalPages - 4; number < totalPages; number++) {
            items.push(<Number key={number} totalPages={totalPages} currPage={currPage} page={number} />);
        }
        // Case 1 ... Y Y Y Y Y ... X
    } else {
        items.push(<Ellipsis key={'third-ellipsis'} />);

        for (let number = currPage - 2; number <= currPage + 2; number++) {
            items.push(<Number key={number} totalPages={totalPages} currPage={currPage} page={number} />);
        }

        items.push(<Ellipsis key={'fourth-ellipsis'} />);
    }

    // This is to prevent 1 1 being displayed if there's only one page
    if (totalPages > 1) {
        items.push(<Number key={totalPages} totalPages={totalPages} currPage={currPage} page={totalPages} />);
    }

    // Hide next page button if reached the end
    if (currPage < totalPages) {
        items.push(<Next key={'next-page'} currPage={currPage} />);
    }

    return <StyledPagination>{items}</StyledPagination>;
};

export default ListingPagination;
