import React from 'react';
import { Link } from '@reach/router';

import { UserScore } from 'pages/account/userScore';

import { formatDate } from 'components/random';

function Teaser({ position, hideUser }) {
  return (
    <div className="panel position">
      <div className="trade-band">{tradeCaption(position)}</div>

      <div className="mb-3"></div>
      <Link to={'/position/' + position._id}>
        <span style={{ float: 'right' }}>{formatDate(position.createdAt)}</span>

        <div
          className="job-description"
          dangerouslySetInnerHTML={createMarkup(position.renderedHtml)}
        />
      </Link>

      {hideUser ? null : (
        <React.Fragment>
          <hr />
          <UserScore displayUser={position.user} />
        </React.Fragment>
      )}
    </div>
  );
}

export function tradeCaption(position) {
  const leverageClass =
    'badge ' +
    (position.direction === 'short' ? ' badge-danger' : ' badge-success');
  const leverageCaption =
    position.leverage +
    ' ' +
    (position.direction === 'long' ? 'Long ETH' : 'Short ETH');

  return (
    <div>
      <span className={leverageClass}>{leverageCaption}</span>
      <span className="sr-only">leverage and direction</span>
      <span className="ml-2"></span>

      {/* length */}
      <span className="badge badge-secondary">{position.amount}</span>
      <span className="sr-only">amount</span>
      <span className="ml-2"></span>

      <span className="badge badge-danger badge-light">{position.length}</span>
      <span className="sr-only">length</span>
    </div>
  );
}

function createMarkup(markup) {
  return { __html: markup };
}

export default Teaser;
