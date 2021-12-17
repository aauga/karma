import { Link } from 'react-router-dom';
import { ImageDiv, InformationDiv, Image, Information, Title, Uploader, Stats } from './Card.styles';
import styles from './Card.module.css';
import HeartButton from '../common/HeartButton';

interface CardProps {
    itemId: string;
    title: string;
    uploader: string;
    image?: string;
}

const Card = (props: CardProps) => {
    return (
        <div>
            <Link className={styles.link} to={`/details/${props.itemId}`} onClick={() => window.scrollTo(0, 0)}>
                <ImageDiv>
                    <Image src={props.image} />
                </ImageDiv>
            </Link>
            <InformationDiv>
                <Information>
                    <Title className={styles.wrapText}>
                        <Link className={styles.link} to={`/details/${props.itemId}`} onClick={() => window.scrollTo(0, 0)}>
                            {props.title}
                        </Link>
                    </Title>
                    <Uploader className={styles.wrapText}>{props.uploader}</Uploader>
                </Information>
                <Stats>
                    <HeartButton size={16} />
                </Stats>
            </InformationDiv>
        </div>
    );
};

export default Card;
