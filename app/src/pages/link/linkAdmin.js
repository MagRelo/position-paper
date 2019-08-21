import React from 'react';

import { formatCurrency, lineItem } from 'components/util/random';

import LinkMap from './linkMap';
import LinkPayoutDisplay from './linkDisplayBar';
import ChildLinksTable from './childLinksTable';
import LinkGraph from './childLinksGraph';

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
        traffic={props.traffic}
      />

      <div>
        <div>
          <h3 className="section-header">Child Links</h3>
          <p>
            You will be paid{' '}
            <b>
              {formatCurrency(
                props.link.potentialPayoffs &&
                  props.link.potentialPayoffs[props.link.generation]
              )}
            </b>{' '}
            if the candidate responds through a child of this link and the
            candidate bonus is paid.
          </p>
          <LinkPayoutDisplay
            payoffs={props.link.potentialPayoffs}
            generation={props.link.generation}
          />

          <h4 className="section-header">Child Links</h4>
          <ChildLinksTable links={props.link.children} />
          <LinkGraph parent={props.link} links={props.link.children} />
        </div>

        <h3 className="section-header">Insights</h3>
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No insights...</i>
        </div>
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
          <b>
            {formatCurrency(
              props.link.payoffs && props.link.payoffs[props.link.generation]
            )}
          </b>{' '}
          if the candidate responds through this link and the candidate bonus is
          paid.
        </p>

        <LinkPayoutDisplay
          payoffs={props.link.payoffs}
          generation={props.link.generation}
        />

        <h4 className="section-header">Share Link</h4>
        <div className="social-grid">
          <EmailButton enabled={true} link={props.link} />
          <LinkedinButton enabled={false} link={props.link} />
          <TwitterButton enabled={true} link={props.link} />
          <InstaButton enabled={false} link={props.link} />
        </div>

        <h4 className="section-header">Link Traffic</h4>
        <div>
          <LinkMap />
          {lineItem('Last 24 hours', props.traffic.last1days)}
          {lineItem('Last 7 days', props.traffic.last7days)}
          {lineItem('Last 30 days', props.traffic.last30days)}
        </div>
      </div>
    </div>
  );
}
