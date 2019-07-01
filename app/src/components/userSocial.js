// import React, { useState, useEffect } from 'react';
import React from 'react';
import SocialIcon from 'components/socialButton';

function SocialButton(props) {
  return (
    <div className="social-grid">
      <div className="icon-block">
        <SocialIcon company="gmail" />
        <span className="icon-label">Not Connected</span>
      </div>
      <div className="icon-block">
        <SocialIcon company="linkedin" />
        <span className="icon-label">Not Connected</span>
      </div>
      <div className="icon-block">
        <SocialIcon company="twitter" />
        <span className="icon-label">Not Connected</span>
      </div>
      <div className="icon-block">
        <SocialIcon company="instagram" />
        <span className="icon-label">Not Connected</span>
      </div>
    </div>
  );
}

export default SocialButton;
