import React from 'react';
import { Link } from '@reach/router';

import { UserProfile } from 'pages/account/userProfile';

import { formatDate, formatCurrency } from 'components/random';

function Teaser({ position, hideUser }) {
  return (
    <div className="panel position">
      <div className="trade-band">
        <span style={{ float: 'right' }}>{formatDate(position.createdAt)}</span>
        {tradeCaption(position)}
      </div>

      <div className="mb-3"></div>
      <Link to={'/position/' + position._id}>
        <div className="h4">{position.title}</div>
      </Link>

      <div className="mb-3"></div>
      {hideUser ? null : (
        <UserProfile displayUser={position.user} hideDescription={true} />
      )}
    </div>
  );
}

function tradeCaption(position) {
  let start = '';
  start += position.direction === 'long' ? 'Long ETH ' : 'Short ETH ';
  start += 'for ' + position.length + ' – ';
  start +=
    formatCurrency(position.amount) + ' at ' + position.leverage + ' leverage';

  return start;
}

export default Teaser;
