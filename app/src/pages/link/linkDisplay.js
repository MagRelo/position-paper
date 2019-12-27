import React from 'react';
// import { Link } from '@reach/router';

import { formatCurrency } from 'components/util/random';

import LinkButton from 'pages/link/linkButton';

function LinkDisplay(props) {
  return (
    <div className="link-display">
      <div className="link-display-item">
        <h4 className="section-header">Promote this Job</h4>
        <p>
          Create your own link to this position and collect up to{' '}
          {formatCurrency(
            props.link.potentialPayoffs &&
              props.link.potentialPayoffs[props.link.generation + 1]
          )}{' '}
          if the candidate responds through your link.
        </p>
        <LinkButton
          parentLink={props.link.linkId}
          disabled={props.user._id === 0 || props.user.isLinkOwner}
          label={
            'Promote @ ' +
            formatCurrency(
              props.link.potentialPayoffs &&
                props.link.potentialPayoffs[props.link.generation + 1]
            )
          }
        />
      </div>
    </div>
  );
}

export default LinkDisplay;
