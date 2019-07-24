import React from 'react';

import { formatCurrency } from 'components/util/random';

import FollowButton from 'components/followButton';
import LinkButton from 'components/linkButton';
import ResponseButton from 'components/responseButton';

// network Data
import { LinkDisplay as JobDisplay } from 'components/networkData/talent.js';

function LinkDisplay(props) {
  return (
    <div>
      <div className="query-data-panel">
        <JobDisplay data={props.queryData} />
      </div>

      <div className=" query-data-button-wrapper">
        <h4 className="section-header">Follow</h4>
        <div>
          <FollowButton
            type="Link"
            targetId={props.link._id}
            isFollowing={props.user.isFollowingLink}
            disabled={
              !props.user.userId ||
              props.user.isLinkOwner ||
              props.user.isQueryOwner
            }
          />
          <FollowButton
            type="User"
            targetId={props.link.userId}
            isFollowing={props.user.isFollowingUser}
            disabled={
              !props.user.userId || props.user.userId === props.link.user
            }
          />
        </div>

        <div className="row row-2">
          <div>
            <h4 className="section-header">Apply</h4>
            <p>
              Apply for this position. If hired, this position includes a{' '}
              {formatCurrency(props.query.target_bonus)} signing bonus.
            </p>
            <ResponseButton
              queryId={props.query._id}
              linkId={props.link.linkId}
              payoff={props.query.target_bonus}
              disabled={props.user.isLinkOwner || props.user.isQueryOwner}
            />
          </div>

          <div>
            <h4 className="section-header">Promote</h4>
            <p>
              Create a child link and promote this query to collect up to{' '}
              {formatCurrency(
                props.link.potentialPayoffs &&
                  props.link.potentialPayoffs[props.link.generation + 1]
              )}{' '}
              if the candidate responds through your link.
            </p>
            <LinkButton
              queryId={props.query._id}
              parentLink={props.link.linkId}
              disabled={props.user.isLinkOwner || props.user.isQueryOwner}
              label={
                'Promote: ' +
                formatCurrency(
                  props.link.potentialPayoffs &&
                    props.link.potentialPayoffs[props.link.generation + 1]
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkDisplay;
