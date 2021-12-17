import qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { BsChevronLeft } from 'react-icons/bs';
import styles from './Pagination.module.css';

interface PageProps {
    currPage: number;
}

const PagePrev = ({ currPage }: PageProps) => {
    const history = useHistory();
    const location = useLocation();

    const changePage = (number: number) => {
        const params = qs.parse(location.search);
        const newQueries = { ...params, page: number };

        history.push({ search: qs.stringify(newQueries) });
    };

    return (
        <Pagination.Prev className={styles.pageLink} onClick={() => changePage(currPage - 1)}>
            <BsChevronLeft size={'14px'} />
        </Pagination.Prev>
    );
};

export default PagePrev;
