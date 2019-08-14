import React from 'react';

import { formatCurrency, lineItem } from 'components/util/random';

import LinkDisplay from 'components/linkDisplayBar';
import LinksList from 'components/queryLinksTable';
import LinkGraph from 'components/queryLinkGraph';
import LinkMap from 'components/linkMap';
import ResponseList from 'components/queryResponseTable';
import SocialIcon from 'components/socialButton';

// <div>
// <h3 className="section-header">Activity</h3>
// <StreamList stream={stream} userId={user._id} />
// </div>

function LinkAdmin(props) {
  return (
    <div className="row row-2">
      <LinkInformation
        link={props.link}
        stream={props.stream}
        userId={props.userId}
      />

      <div>
        <h3 className="section-header">Share Link</h3>

        <div className="social-grid">
          <SocialIcon company="gmail" />
          <SocialIcon company="linkedin" />
          <SocialIcon
            company="twitter"
            enabled="true"
            message={`Check out my link on Incentive Exchange: https://incentive.exchange/link/${
              props.link.linkId
            }`}
          />
          <SocialIcon company="instagram" />
        </div>

        <Traffic traffic={props.traffic} />
        <h3 className="section-header">Responses</h3>
        <ResponseList responses={props.responses} />
      </div>
    </div>
  );
}

export default LinkAdmin;

function Traffic(props) {
  return (
    <div>
      <div>
        <h3 className="section-header">Traffic</h3>
        <LinkMap />
        {lineItem('Last 24 hours', props.traffic.last1days)}
        {lineItem('Last 7 days', props.traffic.last7days)}
        {lineItem('Last 30 days', props.traffic.last30days)}
      </div>
      <div>
        <h3 className="section-header">Insights</h3>
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No insights...</i>
        </div>
      </div>
    </div>
  );
}

function LinkInformation(props) {
  return (
    <div>
      <div>
        <h3 className="section-header">Link Information</h3>
        <p>
          You will be paid{' '}
          {formatCurrency(
            props.link.payoffs && props.link.payoffs[props.link.generation]
          )}{' '}
          if the candidate responds through this link and the candidate bonus is
          paid.
        </p>

        <div>
          <LinkDisplay
            payoffs={props.link.payoffs}
            generation={props.link.generation}
          />
        </div>
      </div>

      <div>
        <h3 className="section-header">Child Links</h3>
        <p>
          You will be paid{' '}
          {formatCurrency(
            props.link.potentialPayoffs &&
              props.link.potentialPayoffs[props.link.generation]
          )}{' '}
          if the candidate responds through a child of this link and the
          candidate bonus is paid.
        </p>
        <LinkDisplay
          payoffs={props.link.potentialPayoffs}
          generation={props.link.generation}
        />
        <h4 className="section-header">Create Child Link and Share</h4>
        <div className="social-grid">
          <SocialIcon company="gmail" />
          <SocialIcon company="linkedin" />
          <SocialIcon
            company="twitter"
            enabled="true"
            message={`Check out my link on Incentive Exchange: https://incentive.exchange/link/${
              props.link.linkId
            }`}
          />
          <SocialIcon company="instagram" />
        </div>

        <h4 className="section-header">Child Links</h4>
        <LinksList links={props.link.children} />

        <h4 className="section-header">Link Graph</h4>
        <LinkGraph parent={props.link} links={props.link.children} />
      </div>
    </div>
  );
}
