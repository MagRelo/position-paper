import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
import LinkedInLogin from 'components/linkedinLogin';

// network Data
import { AuthContext } from 'App';
import { JobDisplay } from 'networkData/jobDisplay.js';
import {
  formatCurrency,
  lineItem,
  copyTextToClipboard,
  Loading
} from 'components/random';

import LinkButton from './linkButton';

import EmailButton from 'components/social/emailButton';
import TwitterButton from 'components/social/twitterButton';
import LinkedinButton from 'components/social/linkedinButton';
import InstaButton from 'components/social/instagramButton';
import ApplyPanel from './applyPanel';

function LinkPage(props) {
  const { activeSession, clearSession, user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState(user);
  const [link, setLink] = useState({});
  const [queryData, setQueryData] = useState({});
  const [traffic, setTraffic] = useState({});
  const [stream, setStream] = useState([]);

  // sync page with linkId
  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    getLink(props.linkId, clearSession).then(body => {
      if (isSubscribed) {
        // display & admin
        setUserData(body.user);
        setLink(body.link);
        // admin only
        setQueryData(body.link.data);
        setTraffic(body.traffic);
        setStream(body.stream);
        setIsLoading(false);
      }
    });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, [props.linkId, activeSession]);

  return (
    <div className="page-container">
      {isLoading ? (
        <div style={{ marginTop: '2em' }}>
          <Loading />
        </div>
      ) : (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <JobDisplay data={queryData} />

                <hr />

                <ApplyPanel
                  link={link}
                  user={userData}
                  activeSession={activeSession}
                />
              </div>

              <div className="col-lg-4">
                <div className="link-display">
                  {userData.isLinkOwner ? (
                    <AdminPanel
                      activeSession={activeSession}
                      user={userData}
                      link={link}
                      stream={stream}
                      traffic={traffic}
                    ></AdminPanel>
                  ) : (
                    <PromotePanel
                      link={link}
                      user={userData}
                      activeSession={activeSession}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkPage;

async function getLink(linkId, clearSession) {
  return await fetch('/api/link/' + linkId).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    console.log(response.status, response.message);

    // clearSession if 401
    if (response.status === 401) {
      console.log('logging out...');
      clearSession();
      return {};
    }
  });
}

function PromotePanel({ link, user, activeSession }) {
  const promoteBonus = formatCurrency(
    link.potentialPayoffs && link.potentialPayoffs[link.generation + 1]
  );

  const promoteButtonLabel = `Promote @ ${promoteBonus}`;

  // Will show if logged out, or logged in & not a link owner
  return (
    <div>
      <div>
        <h3>Promote this Job</h3>
        <p>
          {`Create your own link to this position and collect up to ${promoteBonus} if the candidate responds through your link.`}
        </p>

        {!activeSession ? (
          <LinkedInLogin redirect={'/link/' + link.linkId}>
            {promoteButtonLabel}
          </LinkedInLogin>
        ) : (
          <LinkButton
            parentLink={link.linkId}
            disabled={user._id === 0 || user.isLinkOwner || user.isPromoting}
            label={promoteButtonLabel}
          />
        )}
      </div>
    </div>
  );
}

function AdminPanel({ link, user, traffic }) {
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

        <div
          style={{
            margin: '1em 0',
            border: 'solid 1px #cbcbcb',
            borderRadius: '4px'
          }}
        >
          <div className="input-group">
            <div className="input-group-prepend">
              <div
                className="input-group-text"
                style={{
                  fontSize: 'smaller',
                  border: 'none'
                }}
              >
                URL
              </div>
            </div>
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

        <div className="social-grid">
          <EmailButton enabled={false} link={link} />
          <LinkedinButton enabled={false} link={link} />
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
          {lineItem('Status', link.status)}
          <Link
            className="btn btn-theme btn-sm"
            to={'/link/' + link.linkId + '/edit'}
          >
            Edit Job
          </Link>
        </div>
      ) : null}
    </div>
  );
}

// <MetaData link={link} user={user} queryData={queryData} />
// function MetaData({ queryData, link }) {
//   return (
//     <Helmet>
//       <title>{queryData.jobTitle}</title>
//       <meta name="description" content={queryData.description} />
//       <link
//         rel="canonical"
//         href={'https://talent.incentive.exchange/link/' + link.linkId}
//       />

//       <meta property="og:site_name" content="Talent Relay" />
//       <meta property="og:type" content="website" />
//       <meta
//         property="og:url"
//         content={'https://talent.incentive.exchange/link/' + link.linkId}
//       />

//       {/* <meta property="og:image" content="" /> */}
//       {/* <meta property="og:image:secure_url" content="" /> */}
//       {/* <meta property="og:image:type" content="jpeg" /> */}
//       {/* <meta property="og:image:height" content="606" /> */}
//       {/* <meta property="og:image:width" content="808" /> */}

//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:site" content="@i_dot_e" />
//       <meta name="twitter:title" content={queryData.jobTitle} />
//       <meta name="twitter:description" content={queryData.description} />
//       {/* <meta name="twitter:image" content="" /> */}
//     </Helmet>
//   );
//}
