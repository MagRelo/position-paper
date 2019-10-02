import React, { useState, useEffect, useContext } from 'react';

import { LinkDisplay } from 'networkData/jobDisplay';
import CreateResponse from 'pages/response/createResponse';
import { AuthContext } from 'App';

function Respond(props) {
  const authContext = useContext(AuthContext);

  const [setIsLoading] = useState(true);

  const [user, setUser] = useState({});
  const [link, setLink] = useState({});
  const [queryData, setQueryData] = useState({});
  // const [traffic, setTraffic] = useState({});
  // const [stream, setStream] = useState([]);

  useEffect(
    () => {
      setIsLoading(true);

      getLink(props.linkId, authContext.clearSession).then(body => {
        // display & admin
        setUser(body.user);
        setLink(body.link);
        setQueryData(body.link.data);

        setIsLoading(false);
      });
    },
    [props.linkId]
  );

  return (
    <div>
      <div className="row row-5-3">
        <div>
          <LinkDisplay data={queryData} />
        </div>
        <div>
          <CreateResponse link={link} user={user} />
        </div>
      </div>
    </div>
  );
}

export default Respond;

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
