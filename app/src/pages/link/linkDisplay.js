import React from 'react';
import { Link } from '@reach/router';

import { formatCurrency } from 'components/util/random';

import FollowButton from 'components/followButton';
import LinkButton from 'components/linkButton';

function LinkDisplay(props) {
  return (
    <div className="link-display">
      <div>
        <h4 className="section-header">Apply</h4>
        <p>
          Apply for this position. This position comes with a{' '}
          {formatCurrency(props.link.target_bonus)} signing bonus.
        </p>

        <Link
          className="pure-button pure-button-primary"
          disabled={props.user._id === 0 || props.user.isLinkOwner}
          style={{ background: 'rgb(14, 165, 29)' }}
          to={'/respond/' + props.link.linkId}
        >
          {'Apply @ ' + formatCurrency(props.link.target_bonus)}
        </Link>
      </div>

      <div>
        <h4 className="section-header">Promote</h4>
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

      <div>
        <h4 className="section-header">Follow</h4>
        <FollowButton
          type="Link"
          targetId={props.link._id}
          isFollowing={props.user.isFollowingLink}
          disabled={props.user._id === 0 || props.user.isLinkOwner}
        />
        <FollowButton
          type="User"
          targetId={props.link.userId}
          isFollowing={props.user.isFollowingUser}
          disabled={props.user._id === 0 || props.user.isLinkOwner}
        />
      </div>
    </div>
  );
}

export default LinkDisplay;
