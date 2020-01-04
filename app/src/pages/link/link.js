import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
// import { Helmet } from 'react-helmet';

import { AuthContext } from 'App';

// network Data
import { JobDisplay } from 'networkData/jobDisplay.js';
import LinkAdmin from './linkAdmin';

import ResponseStatus from 'pages/response/responseStatus';

import ApplyButton from './applyButton';

import { Loading, formatCurrency } from 'components/random';

function LinkPage(props) {
  const { activeSession, clearSession } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({});
  const [link, setLink] = useState({});
  const [queryData, setQueryData] = useState({});
  const [traffic, setTraffic] = useState({});
  const [stream, setStream] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    getLink(props.linkId, clearSession).then(body => {
      if (isSubscribed) {
        // display & admin
        setUser(body.user);
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
  }, [props.linkId]);

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
                  user={user}
                  activeSession={activeSession}
                />
              </div>

              <div className="col-lg-4">
                <div className="link-display">
                  <LinkAdmin
                    link={link}
                    traffic={traffic}
                    stream={stream}
                    user={user}
                    childLinks={link.children}
                    activeSession={activeSession}
                  />
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
    }
  });
}

function ApplyPanel({ link, user, activeSession }) {
  return (
    <div id="apply">
      {activeSession ? (
        <React.Fragment>
          {user.hasApplied ? (
            <div>
              <h3 className="section-header">Application Status</h3>
              <p>You applied to this job on Jan, 12th 2019.</p>
              <ResponseStatus status={'open'} />
            </div>
          ) : (
            <div>
              <h2>Apply for this Job</h2>
              <p>
                Apply for this position. We'll pay you{' '}
                {formatCurrency(link.target_bonus)} if you're hired.
              </p>
              <ApplyButton
                linkId={link.linkId}
                userId={user._id}
                label="Apply Now"
                disabled={user.isLinkOwner}
              />
            </div>
          )}
        </React.Fragment>
      ) : (
        // login link
        <Link
          className="btn btn-sm btn-theme"
          label={'Apply Now'}
          to={'/login?link=' + link.linkId}
        >
          Apply Now
        </Link>
      )}
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
