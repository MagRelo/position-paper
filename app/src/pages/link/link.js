import React, { useState, useEffect, useContext } from 'react';

import LinkAdmin from './linkAdmin';
import LinkDisplay from './linkDisplay';

import { AuthContext } from 'App';

function Link(props) {
  const authContext = useContext(AuthContext);
  // console.log(authContext);

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({});
  const [link, setLink] = useState({});
  const [query, setQuery] = useState({});
  const [queryData, setQueryData] = useState({});
  const [traffic, setTraffic] = useState({});
  const [responses, setResponses] = useState([]);
  const [stream, setStream] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getLink(props.match.params.linkId, authContext.clearSession).then(body => {
      // display & admin
      setUser(body.user);
      setLink(body.link);
      setQuery(body.query);

      // admin only
      setQueryData(body.query.data);
      setTraffic(body.traffic);
      setResponses(body.responses);
      setStream(body.stream);

      setIsLoading(false);
    });
  }, props.match.params.linkId);

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="spinner" style={{ margin: '0 auto' }}>
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <LinkDisplay
            query={query}
            link={link}
            user={user}
            queryData={queryData}
          />

          {user.isLinkOwner ? (
            <LinkAdmin
              query={query}
              link={link}
              traffic={traffic}
              childLinks={link.children}
              responses={responses}
              stream={stream}
            />
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
}

export default Link;

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
