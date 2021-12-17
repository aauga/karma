import { Pagination } from 'react-bootstrap';
import styles from './Pagination.module.css';

const PageEllipsis = () => {
    return <Pagination.Ellipsis className={styles.pageLink} />;
};

export default PageEllipsis;
