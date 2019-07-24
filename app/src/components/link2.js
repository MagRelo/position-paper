import React, { useState, useEffect } from 'react';

import LinkAdmin from 'components/linkAdmin';
import LinkDisplay from 'components/linkDisplay';

function Link(props) {
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

    getLink(props.match.params.linkId).then(body => {
      setUser(body.user);
      setLink(body.link);
      setQuery(body.query);
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
          {user.isLinkOwner ? (
            <React.Fragment>
              <LinkDisplay
                query={query}
                link={link}
                traffic={traffic}
                childLinks={link.children}
                responses={responses}
                user={user}
                queryData={queryData}
              />
              <LinkAdmin
                query={query}
                link={link}
                traffic={traffic}
                childLinks={link.children}
                responses={responses}
                stream={stream}
              />
            </React.Fragment>
          ) : (
            <LinkDisplay
              query={query}
              link={link}
              traffic={traffic}
              childLinks={link.children}
              responses={responses}
              user={user}
              queryData={queryData}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default Link;

async function getLink(linkId) {
  return await fetch('/api/link/' + linkId).then(response => response.json());
}
