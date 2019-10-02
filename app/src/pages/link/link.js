import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

// network Data
import { LinkDisplay as JobDisplay } from 'networkData/jobDisplay.js';
import LinkAdmin from './linkAdmin';
import LinkDisplay from './linkDisplay';

import { AuthContext } from 'App';

import { Loading } from 'components/util/random';

function Link(props) {
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({});
  const [link, setLink] = useState({});
  const [queryData, setQueryData] = useState({});
  const [traffic, setTraffic] = useState({});
  const [stream, setStream] = useState([]);

  useEffect(
    () => {
      setIsLoading(true);

      getLink(props.linkId, authContext.clearSession).then(body => {
        // display & admin
        setUser(body.user);
        setLink(body.link);

        // admin only
        setQueryData(body.link.data);
        setTraffic(body.traffic);
        setStream(body.stream);

        setIsLoading(false);
      });
    },
    [props.linkId]
  );

  return (
    <div>
      {isLoading ? (
        <div style={{ marginTop: '2em' }}>
          <Loading />
        </div>
      ) : (
        <React.Fragment>
          <MetaData link={link} user={user} queryData={queryData} />

          {/* <h3 className="section-header">{link.title}</h3> */}
          <div className="row row-5-3">
            <div>
              <JobDisplay data={queryData} />
            </div>

            {/* Buttons */}
            {!user.isLinkOwner ? (
              <LinkDisplay link={link} user={user} queryData={queryData} />
            ) : null}
          </div>

          {user.isLinkOwner ? (
            <LinkAdmin
              link={link}
              traffic={traffic}
              stream={stream}
              user={user}
              childLinks={link.children}
            />
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
}

export default Link;

function MetaData({ queryData, link }) {
  return (
    <Helmet>
      <title>{queryData.jobTitle}</title>
      <meta name="description" content={queryData.description} />
      <link
        rel="canonical"
        href={'https://incentive.exchange/link/' + link.linkId}
      />

      <meta property="og:site_name" content="Incentive Exchange" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={'https://incentive.exchange/link/' + link.linkId}
      />

      {/* <meta property="og:image" content="" /> */}
      {/* <meta property="og:image:secure_url" content="" /> */}
      {/* <meta property="og:image:type" content="jpeg" /> */}
      {/* <meta property="og:image:height" content="606" /> */}
      {/* <meta property="og:image:width" content="808" /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@i_dot_e" />
      <meta name="twitter:title" content={queryData.jobTitle} />
      <meta name="twitter:description" content={queryData.description} />
      {/* <meta name="twitter:image" content="" /> */}
    </Helmet>
  );
}

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
