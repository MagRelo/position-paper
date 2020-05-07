import React from 'react';

import { UserProfile } from 'pages/account/userProfile';

function Teaser({ position }) {
  return (
    <div className="panel position">
      <div className="h4">{position.title}</div>

      <div className="trade-band">{tradeCaption(position)}</div>

      <div className="mb-3"></div>
      <UserProfile user={position.user} hideDescription={true} />
    </div>
  );
}

function tradeCaption(position) {
  let start = '';
  start += position.direction === 'long' ? 'Long ETH ' : 'Short ETH ';
  start += 'for ' + position.length + ' – ';
  start += '$' + position.amount + ' at ' + position.leverage + ' leverage';

  return start;
}

function createMarkup(markup) {
  return { __html: markup };
}

export default Teaser;
