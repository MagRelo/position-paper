// import React, { useState, useEffect } from 'react';
import React from 'react';
import SocialIcon from 'components/socialButton';

function SocialButton(props) {
  return (
    <div className="social-grid">
      <SocialIcon company="gmail" />
      <SocialIcon company="linkedin" />
      <SocialIcon company="twitter" />
      <SocialIcon company="instagram" />
    </div>
  );
}

export default SocialButton;
