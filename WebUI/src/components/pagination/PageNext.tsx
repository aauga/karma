import qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import styles from './Pagination.module.css';

interface PageProps {
    currPage: number;
}

const PageNext = ({ currPage }: PageProps) => {
    const history = useHistory();
    const location = useLocation();

    const changePage = (number: number) => {
        const params = qs.parse(location.search);
        const newQueries = { ...params, page: number };

        history.push({ search: qs.stringify(newQueries) });
    };

    return (
        <Pagination.Next className={styles.pageLink} onClick={() => changePage(currPage + 1)}>
            <BsChevronRight size={'14px'} />
        </Pagination.Next>
    );
};

export default PageNext;
