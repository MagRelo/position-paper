import React from 'react';

import { formatCurrency, lineItem } from 'components/util/random';

import LinkMap from './linkMap';
import LinkPayoutDisplay from './linkDisplayBar';
import ChildLinksTable from './childLinksTable';
import LinkGraph from './childLinksGraph';
import ResponseList from './linkResponseTable';

import EmailButton from 'components/social/emailButton';
import TwitterButton from 'components/social/twitterButton';
import LinkedinButton from 'components/social/linkedinButton';

import InstaButton from 'components/social/instagramButton';

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
          <EmailButton enabled={true} link={props.link} />
          <LinkedinButton enabled={false} link={props.link} />
          <TwitterButton enabled={true} link={props.link} />
          <InstaButton enabled={false} link={props.link} />
        </div>

        <h3 className="section-header">Traffic</h3>
        <div>
          <LinkMap />
          {lineItem('Last 24 hours', props.traffic.last1days)}
          {lineItem('Last 7 days', props.traffic.last7days)}
          {lineItem('Last 30 days', props.traffic.last30days)}
        </div>

        <h3 className="section-header">Insights</h3>
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No insights...</i>
        </div>

        <h3 className="section-header">Responses</h3>
        <ResponseList responses={props.responses} />
      </div>
    </div>
  );
}

export default LinkAdmin;

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

        <LinkPayoutDisplay
          payoffs={props.link.payoffs}
          generation={props.link.generation}
        />
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
        <LinkPayoutDisplay
          payoffs={props.link.potentialPayoffs}
          generation={props.link.generation}
        />

        <h4 className="section-header">Create Child Link and Share</h4>
        <div className="social-grid">
          <EmailButton enabled={true} link={props.link} />
          <LinkedinButton enabled={false} link={props.link} />
          <TwitterButton enabled={true} link={props.link} />
          <InstaButton enabled={false} link={props.link} />
        </div>

        <h4 className="section-header">Child Links</h4>
        <ChildLinksTable links={props.link.children} />
        <LinkGraph parent={props.link} links={props.link.children} />
      </div>
    </div>
  );
}
