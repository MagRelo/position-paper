// import React, { useState, useEffect } from 'react';
import React from 'react';
import SocialIcon from 'components/socialButton';

function SocialButton(props) {
  return (
    <div className="social-grid">
      <div className="icon-block">
        <SocialIcon company="gmail" />
      </div>
      <div className="icon-block">
        <SocialIcon company="linkedin" />
      </div>
      <div className="icon-block">
        <SocialIcon company="twitter" />
      </div>
      <div className="icon-block">
        <SocialIcon company="instagram" />
      </div>
    </div>
  );
}

export default SocialButton;
