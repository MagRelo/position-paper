import React, { useState, useEffect, useContext } from 'react';

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
  const [responses, setResponses] = useState([]);

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
        setResponses(body.responses);
        setStream(body.stream);

        setIsLoading(false);
      });
    },
    [props.linkId]
  );

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <LinkDisplay link={link} user={user} queryData={queryData} />

          {user.isLinkOwner ? (
            <LinkAdmin
              link={link}
              traffic={traffic}
              responses={responses}
              stream={stream}
              childLinks={link.children}
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
