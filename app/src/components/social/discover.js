import React from 'react';

const brandColor = '#FF6000';

function SocialButton(props) {
  return (
    <span
      className="icon"
      style={{
        background: brandColor
      }}
    >
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Discover icon</title>
        <path d="M12 0A12 12 0 1 0 12 24A12 12 0 1 0 12 0Z" />
      </svg>
    </span>
  );
}

export default SocialButton;
