import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const FilledHeart = styled(AiFillHeart)`
    display: block;
    color: #ea4c89;
`;

const OutlinedHeart = styled(AiOutlineHeart)`
    display: block;
`;

interface HeartProps {
    size: number;
    color?: string;
}

const defaultProps: HeartProps = {
    size: 16,
    color: '#000000'
};

const HeartButton = ({ size, color }: HeartProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const Heart = () => {
        return isHovered ? <FilledHeart size={size} /> : <OutlinedHeart size={size} color={color} />;
    };

    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Heart />
        </div>
    );
};

export default HeartButton;
