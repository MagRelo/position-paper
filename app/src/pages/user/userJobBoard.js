import React, { useState, useEffect } from 'react';
import { Loading } from 'components/random';
// import { Helmet } from 'react-helmet';

import SearchResults from 'networkData/searchResult_tile';

function SearchFlow({ userId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLoading(true);

    getUserJobs(userId).then(results => {
      setResults(results.jobs);
      setUser(results.user);
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <div className="page-container">
      <div className="container">
        <div className="user-profile">
          <img src={user.avatar} alt="avatar" className="user-avatar" />
          <div className="user-info">
            <div className="user-name">{user.displayName}</div>
          </div>
        </div>

        {isLoading ? <Loading /> : <SearchResults results={results} />}
      </div>
    </div>
  );
}

export default SearchFlow;

async function getUserJobs(userId) {
  // const queryString = `?searchTerm=${searchTerm}&days=${days}`;

  return await fetch('/api/user/jobs/' + userId, {
    method: 'GET'
  })
    .then(r => r.json())
    .catch(error => {
      console.error(error);
      return [];
    });
}

// <MetaData />
// function MetaData() {
//   return (
//     <Helmet>
//       <title>Talent Relay | Search</title>
//       <meta name="description" content="Talent Relay – Search for Links" />
//       <link rel="canonical" href={'https://talent.incentive.exchange/search'} />

//       <meta property="og:site_name" content="Talent Relay" />
//       <meta property="og:type" content="website" />
//       <meta
//         property="og:url"
//         content={'https://talent.incentive.exchange/search'}
//       />
//       <meta property="og:title" content="Talent Relay | Search" />
//       <meta
//         property="og:description"
//         content="Talent Relay – Search for Links"
//       />

//       {/* <meta property="og:image" content="" /> */}
//       {/* <meta property="og:image:secure_url" content="" /> */}
//       {/* <meta property="og:image:type" content="jpeg" /> */}
//       {/* <meta property="og:image:height" content="606" /> */}
//       {/* <meta property="og:image:width" content="808" /> */}

//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:site" content="@spoonuniversity" />
//       <meta name="twitter:title" content="Talent Relay | Search" />
//       <meta
//         name="twitter:description"
//         content="Talent Relay – Search for Links"
//       />
//       {/* <meta name="twitter:image" content="" /> */}
//     </Helmet>
//   );
// }
