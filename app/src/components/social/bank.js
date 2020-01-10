import React from 'react';
// import { Dialog } from '@reach/dialog';

import { AiTwotoneBank } from 'react-icons/ai';

function EmailButton(props) {
  return (
    <span
      className="icon"
      style={{
        fontSize: '18px',
        background: '#cbcbcb'
      }}
    >
      <AiTwotoneBank />
    </span>
  );
}

export default EmailButton;
