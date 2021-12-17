import { Card } from 'react-bootstrap';
import styles from './DetailCategory.module.css';

interface DetailCategoryProps {
    category: number;
}

const DetailCategory = ({ category }: DetailCategoryProps) => {
    const arr = ['None', 'Clothing', 'Electronics', 'Food', 'Furniture'];

    return <Card.Subtitle className={`${styles.subtitle} mb-1`}>{arr[category]}</Card.Subtitle>;
};

export default DetailCategory;
