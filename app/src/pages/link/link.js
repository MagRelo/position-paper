import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
import LinkedInLogin from 'components/linkedinLogin';

import { AiFillFileAdd } from 'react-icons/ai';
// network Data
import { AuthContext } from 'App';
import { JobDisplay } from 'networkData/jobDisplay.js';
import {
  formatCurrency,
  lineItem,
  JobBoard,
  UserProfile,
  Loading
} from 'components/random';

import LinkButton from './linkButton';

import ApplyPanel from './applyPanel';

function LinkPage(props) {
  const { activeSession, clearSession, user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [userData, setUserData] = useState(user);
  const [link, setLink] = useState({});
  const [queryData, setQueryData] = useState({});
  const [traffic, setTraffic] = useState({});
  const [stream, setStream] = useState([]);

  // sync page with linkId
  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    getLink(props.linkId, clearSession)
      .then(body => {
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
      })
      .catch(error => {
        console.log(error);
        setError(error.toString());
        setIsLoading(false);
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
      ) : null}

      {error ? <p style={{ textAlign: 'center' }}>{error}</p> : null}

      {!isLoading && !error ? (
        <div className="container">
          <div className="grid grid-5-3">
            {/* Job Description */}
            <div>
              <JobDisplay data={queryData} />
              <hr />
            </div>

            {/* CTA's */}
            <div>
              <div className="link-display">
                {/* Apply */}
                {userData.isLinkOwner ? null : (
                  <React.Fragment>
                    <div className="panel">
                      <ApplyPanel
                        link={link}
                        user={userData}
                        activeSession={activeSession}
                      />
                    </div>
                    <div className="mb-4"></div>
                  </React.Fragment>
                )}

                {/* Promote/Admin */}
                <div className="panel">
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
      ) : null}
    </div>
  );
}

export default LinkPage;

async function getLink(linkId, clearSession) {
  return fetch('/api/link/' + linkId).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    console.log(response.status, response.statusText);

    // clearSession if 401
    if (response.status === 401) {
      console.log('logging out...');
      clearSession();
    }

    throw new Error(response.statusText);
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
        <h3>Add To Your Job Board</h3>

        <p className="p-tight">
          Add this job to your job board and collect <b>{promoteBonus}</b> if
          the candidate responds through your link.
        </p>
        {!activeSession ? (
          <LinkedInLogin
            redirect={'/link/' + link.linkId}
            className="btn btn-theme"
          >
            Add To Your Job Board <AiFillFileAdd />
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
  return (
    <div>
      <UserProfile user={user} hideDescription={true} />
      <div className="mb-3"></div>

      <p style={{ margin: 0 }}>
        <b>Your Unique URL</b>
      </p>
      <JobBoard jobBoardId={user.jobBoardId} />
      <div className="mb-3"></div>

      {user.isQueryOwner ? null : (
        <div>
          <p style={{ margin: 0 }}>
            <b>Direct Referral</b>
          </p>
          <p className="p-tight">
            If a candidate gets the job using this link then you will be paid{' '}
            <b>{formatCurrency(link.payoffs[link.generation])}</b>.
          </p>

          <p style={{ margin: 0 }}>
            <b>Network Referral</b>
          </p>
          <p className="p-tight">
            You can also recruit other people to promote this job. If they find
            the candidate then you will be paid{' '}
            <b>{formatCurrency(link.potentialPayoffs[link.generation])}</b>.
          </p>
        </div>
      )}

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
