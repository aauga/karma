import styles from './DetailWinner.module.css';

const DetailWinner = () => {
    return (
        <h3 id={styles.title} style={{ marginBottom: '2rem' }}>
            <span id={styles.titleColor}>Yay! 🥳</span> You have won this item!
        </h3>
    );
};

export default DetailWinner;
