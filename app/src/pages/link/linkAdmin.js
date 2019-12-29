import React from 'react';
import { Link } from '@reach/router';

import {
  formatCurrency,
  lineItem,
  copyTextToClipboard
} from 'components/util/random';

// import LinkPayoutDisplayFixed from './linkDisplayBarFixed';
// import LinkMap from './linkMap';
// import ChildLinksTable from './childLinksTable';
// import LinkGraph from './childLinksGraph';

import LinkButton from './linkButton';

import EmailButton from 'components/social/emailButton';
import TwitterButton from 'components/social/twitterButton';
import LinkedinButton from 'components/social/linkedinButton';
import InstaButton from 'components/social/instagramButton';

function LinkAdmin({ link, user, stream, traffic, activeSession }) {
  return (
    <div>
      {/* Will show if logged out, or logged in & not a link owner */}
      <PromotePanel link={link} user={user} activeSession={activeSession} />

      {/* Will show logged in & the link owner */}
      {user.isLinkOwner ? (
        <AdminPanel
          activeSession={activeSession}
          user={user}
          link={link}
          stream={stream}
          traffic={traffic}
        ></AdminPanel>
      ) : null}
    </div>
  );
}

export default LinkAdmin;

// function LinkOwnerMessage(props) {
//   return (
//     <div>
//       <h4 className="section-header">Direct Links</h4>
//       <div>
//         <p>
//           You will be paid{' '}
//           <b>
//             {formatCurrency(
//               props.link.payoffs && props.link.payoffs[props.link.generation]
//             )}
//           </b>{' '}
//           if the candidate responds through this link and the candidate bonus is
//           paid.
//         </p>

//         <LinkPayoutDisplayFixed
//           employer={props.link.data.employer}
//           showLink={true}
//           linkPayout={props.link.payoffs[props.link.generation]}
//           showChild={false}
//         />
//       </div>

//       <h4 className="section-header">Network Links</h4>
//       <p>
//         You will be paid{' '}
//         <b>
//           {formatCurrency(
//             props.link.potentialPayoffs &&
//               props.link.potentialPayoffs[props.link.generation]
//           )}
//         </b>{' '}
//         if the candidate responds through a child of this link and the candidate
//         bonus is paid.
//       </p>

//       <LinkPayoutDisplayFixed
//         employer={props.link.data.employer}
//         showLink={true}
//         linkPayout={props.link.potentialPayoffs[props.link.generation]}
//         showChild={true}
//         childPayout={props.link.potentialPayoffs[props.link.generation + 1]}
//       />
//     </div>
//   );
// }

function PromotePanel({ link, user, activeSession, traffic }) {
  return (
    <div>
      {user.isLinkOwner ? null : (
        <div>
          <h4>Promote this Job</h4>
          <p>
            Create your own link to this position and collect up to{' '}
            {formatCurrency(
              link.potentialPayoffs &&
                link.potentialPayoffs[link.generation + 1]
            )}{' '}
            if the candidate responds through your link.
          </p>

          {!activeSession ? (
            <Link
              className="btn btn-sm btn-theme"
              to="/login"
              redirect={'/link/' + link.linkId}
            >
              {'Promote @ ' +
                formatCurrency(
                  link.potentialPayoffs &&
                    link.potentialPayoffs[link.generation + 1]
                )}
            </Link>
          ) : (
            <LinkButton
              parentLink={link.linkId}
              disabled={user._id === 0 || user.isLinkOwner}
              label={
                'Promote @ ' +
                formatCurrency(
                  link.potentialPayoffs &&
                    link.potentialPayoffs[link.generation + 1]
                )
              }
            />
          )}
        </div>
      )}
    </div>
  );
}

function AdminPanel({ link, user, stream, traffic }) {
  const domain = window.location.origin || 'http://localhost:3000';

  return (
    <div>
      <div className="share">
        <h3>Promote this Job</h3>

        {user.isQueryOwner ? null : (
          <div>
            <p className="p-tight">
              This is your link. If a candidate gets the job using this link
              then you will be paid{' '}
              <b>{formatCurrency(link.payoffs[link.generation])}</b>.
            </p>

            <p className="p-tight">
              You can also recruit other people to promote this job. If they
              find the candidate then you will be paid{' '}
              <b>{formatCurrency(link.potentialPayoffs[link.generation])}</b>.
            </p>

            <p className="p-tight">
              <a href="/#how">Learn more about earning on Talent Relay...</a>
            </p>
          </div>
        )}

        <div>
          <label htmlFor="inlineFormInputGroup">URL</label>

          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              style={{ border: 'none' }}
              id="inlineFormInputGroup"
              placeholder="Username"
              disabled={true}
              value={domain + '/link/' + link.linkId}
            />
            <div className="input-group-append">
              <div
                className="input-group-text"
                style={{
                  fontSize: 'smaller',
                  border: 'none'
                }}
              >
                <button
                  className="button-unstyled"
                  onClick={() => {
                    const text = `${domain}/link/${link.linkId}`;
                    copyTextToClipboard(text);
                  }}
                >
                  (copy)
                </button>
              </div>
            </div>
          </div>
        </div>

        <label>Social</label>
        <div className="social-grid">
          <EmailButton enabled={true} link={link} />
          <LinkedinButton enabled={true} link={link} />
          <TwitterButton enabled={false} link={link} />
          <InstaButton enabled={false} link={link} />
        </div>
      </div>

      <div>
        <hr />
        <h3>Job Activity</h3>
        {lineItem('Views', traffic.last30days)}
        {lineItem('Promoters', link.children ? link.children.length : 0)}
        {lineItem('Applications', link.responses ? link.responses.length : 0)}
      </div>

      {user.isQueryOwner ? (
        <div>
          <hr />
          <h3>Edit Job</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <button className="btn btn-theme btn-sm">Edit Job (d)</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// function QueryOwnerMessage(props) {
//   return (
//     <div>
//       <p>This is the owner message.</p>

//       <ul>
//         <li>Target Bonus Cost: {formatCurrency(props.link.target_bonus)}</li>
//         <li>Network Bonus Cost: {formatCurrency(props.link.network_bonus)}</li>
//       </ul>
//     </div>
//   );
// }
