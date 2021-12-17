import { Placeholder } from 'react-bootstrap';
import styled from 'styled-components';

export const Skeleton = styled(Placeholder)`
    min-height: 0;
    border-radius: 4px;
    cursor: default;
`;

export const CategorySkeleton = styled(Skeleton)`
    height: 15px;
    width: 45px;
    margin-bottom: 0.5rem;
`;

export const TitleSkeleton = styled(Skeleton)`
    height: 32px;
    width: 225px;
`;

export const StatSkeleton = styled(Skeleton)`
    height: 18px;
    width: 150px;
    margin-top: 0.25rem;
`;

export const DescriptionSkeleton = styled(Skeleton)`
    height: 40px;
    width: 400px;
`;

export const HeartSkeleton = styled(Skeleton)`
    height: 24px;
    width: 24px;
`;

/* Uploader */
export const AvatarSkeleton = styled(Skeleton)`
    width: 72px;
    height: 72px;
    border-radius: 100%;
`;

export const UsernameSkeleton = styled(Skeleton)`
    width: 100px;
    height: 18px;
`;

export const RatingSkeleton = styled(Skeleton)`
    width: 50px;
    height: 16px;
`;

/* Form */
export const TextareaSkeleton = styled(Skeleton)`
    width: 100%;
    height: 80px;
`;

/* Carousel */
export const ImageSkeleton = styled(Skeleton)`
    width: 100%;
    height: 450px;
`;
