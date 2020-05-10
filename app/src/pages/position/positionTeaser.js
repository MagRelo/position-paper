import React from 'react';
import { Link } from '@reach/router';

import { UserProfile } from 'pages/account/userProfile';

import { formatDate, formatCurrency } from 'components/random';

function Teaser({ position, hideUser }) {
  return (
    <div className="panel position">
      <div className="trade-band">{tradeCaption(position)}</div>

      <div className="mb-3"></div>
      <Link to={'/position/' + position._id}>
        <span style={{ float: 'right' }}>{formatDate(position.createdAt)}</span>
        <div style={{ fontSize: '1.25rem' }}>{position.title}</div>
      </Link>

      {hideUser ? null : (
        <React.Fragment>
          <hr />
          <UserProfile displayUser={position.user} hideDescription={true} />
        </React.Fragment>
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
