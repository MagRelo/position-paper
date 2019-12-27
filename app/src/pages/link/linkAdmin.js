import React from 'react';

import { formatCurrency, lineItem } from 'components/util/random';

import LinkMap from './linkMap';
import LinkPayoutDisplayFixed from './linkDisplayBarFixed';
// import ChildLinksTable from './childLinksTable';
import LinkGraph from './childLinksGraph';

import EmailButton from 'components/social/emailButton';
import TwitterButton from 'components/social/twitterButton';
import LinkedinButton from 'components/social/linkedinButton';
import InstaButton from 'components/social/instagramButton';

// import JobForm from 'networkData/createJob';
// <JobForm />

function LinkAdmin(props) {
  return (
    <React.Fragment>
      <h4>Job Dashboard</h4>

      <div className="share">
        {/* Share */}
        <h4 className="section-header">Promote</h4>
        <div className="social-grid">
          <EmailButton enabled={true} link={props.link} />
          <TwitterButton enabled={true} link={props.link} />
          <LinkedinButton enabled={false} link={props.link} />
          <InstaButton enabled={false} link={props.link} />
        </div>
      </div>

      <div className="info">
        {/* Info */}
        {props.user.isQueryOwner ? null : (
          <LinkOwnerMessage
            link={props.link}
            stream={props.stream}
            userId={props.userId}
            traffic={props.traffic}
          />
        )}
      </div>

      <div className="child-links">
        {/* Child Links */}
        <h4 className="section-header">Your Network Links</h4>
        <LinkGraph
          user={props.user}
          parent={props.link}
          links={props.link.children}
        />
      </div>

      <div className="traffic">
        {/* Traffic */}
        <h4 className="section-header">Link Traffic</h4>
        <div>
          <LinkMap />
          {lineItem('Last 24 hours', props.traffic.last1days)}
          {lineItem('Last 7 days', props.traffic.last7days)}
          {lineItem('Last 30 days', props.traffic.last30days)}
        </div>

        <h4 className="section-header">Insights</h4>
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No insights...</i>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LinkAdmin;

function LinkOwnerMessage(props) {
  return (
    <div>
      <h4 className="section-header">Direct Links</h4>
      <div>
        <p>
          You will be paid{' '}
          <b>
            {formatCurrency(
              props.link.payoffs && props.link.payoffs[props.link.generation]
            )}
          </b>{' '}
          if the candidate responds through this link and the candidate bonus is
          paid.
        </p>

        <LinkPayoutDisplayFixed
          employer={props.link.data.employer}
          showLink={true}
          linkPayout={props.link.payoffs[props.link.generation]}
          showChild={false}
        />
      </div>

      <h4 className="section-header">Network Links</h4>
      <p>
        You will be paid{' '}
        <b>
          {formatCurrency(
            props.link.potentialPayoffs &&
              props.link.potentialPayoffs[props.link.generation]
          )}
        </b>{' '}
        if the candidate responds through a child of this link and the candidate
        bonus is paid.
      </p>

      <LinkPayoutDisplayFixed
        employer={props.link.data.employer}
        showLink={true}
        linkPayout={props.link.potentialPayoffs[props.link.generation]}
        showChild={true}
        childPayout={props.link.potentialPayoffs[props.link.generation + 1]}
      />
    </div>
  );
}

function QueryOwnerMessage(props) {
  return (
    <div>
      <p>This is the owner message.</p>

      <ul>
        <li>Target Bonus Cost: {formatCurrency(props.link.target_bonus)}</li>
        <li>Network Bonus Cost: {formatCurrency(props.link.network_bonus)}</li>
      </ul>
    </div>
  );
}
