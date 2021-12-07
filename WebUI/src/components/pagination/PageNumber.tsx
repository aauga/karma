import qs from 'query-string';
import { Pagination } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './Pagination.module.css';

interface PageProps {
    totalPages: number;
    currPage: number;
    page: number;
}

const PageNumber = ({ totalPages, currPage, page }: PageProps) => {
    const history = useHistory();
    const location = useLocation();

    const changePage = (number: number) => {
        if (number >= 1 && number <= totalPages) {
            const params = qs.parse(location.search);
            const newQueries = { ...params, page: number };

            history.push({ search: qs.stringify(newQueries) });
        }
    };

    return (
        <Pagination.Item className={styles.pageLink} key={page} active={currPage === page} onClick={() => changePage(page)}>
            {page}
        </Pagination.Item>
    );
};

export default PageNumber;
