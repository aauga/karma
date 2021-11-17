import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const LikedCount = () => {
  const [isHovered, setIsHovered] = useState(false);

  const Heart = () => {
    if (isHovered) {
      return (
        <AiFillHeart
          style={{
            width: '15px',
            height: '15px',
            color: '#ea4c89'
          }}
        />
      );
    }

    return (
      <AiOutlineHeart
        style={{
          width: '22px',
          height: '22px',
          color: '#9e9ea7'
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '0',
        right: '5px'
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Heart />
      </div>
      <span
        style={{
          fontSize: '15px',
          fontWeight: 500,
          marginLeft: '2px',
          color: '#3d3d4e'
        }}
      >
        100
      </span>
    </div>
  );
};

export default LikedCount;
