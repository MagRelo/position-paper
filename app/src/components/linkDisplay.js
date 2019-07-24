import React from 'react';

import { formatCurrency } from 'components/util/random';

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

      <div className="row row-2 query-data-button-wrapper">
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
  );
}

export default LinkDisplay;
