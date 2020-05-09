import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'App';
import { Link } from '@reach/router';

import { Loading } from 'components/random';

import Teaser from 'pages/position/positionTeaser';
import { UserScore } from 'pages/account/userScore';
import PriceFeed from 'components/priceFeed';

function NetworkFeed(props) {
  const { callApi } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [networkPosts, setNetworkPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    setLoading(true);

    const method = 'GET';
    const endPoint = '/api/user/network';
    callApi(method, endPoint)
      .then((body) => {
        setNetworkPosts(body.feed);
        setFollowing(body.following || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
        setLoading(false);
      });
  }, [callApi]);

  return (
    <section className="container">
      {error ? <p>{error}</p> : null}
      <div className="grid grid-3-5-3">
        <div>
          <div className="h3">Current Prices</div>

          <PriceFeed />
        </div>
        <div>
          <div className="clearfix">
            <Link
              to="/addposition"
              className="btn btn-sm btn-theme"
              style={{ float: 'right' }}
            >
              Add Position
            </Link>
          </div>

          <hr />

          {loading ? (
            <Loading />
          ) : (
            <div>
              {networkPosts.map((object) => {
                switch (object.verb) {
                  case 'addFollow:User':
                    return (
                      <div className="mb-3" key={object.id}>
                        <div className="grid grid-x-2">
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              textTransform: 'uppercase',
                            }}
                          >
                            new follow
                          </div>
                          <div className="panel">
                            <UserScore displayUser={object.data} />
                          </div>
                        </div>
                      </div>
                    );
                  case 'addPosition':
                    return (
                      <div className="mb-3" key={object.id}>
                        <Teaser position={object.data} />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          )}
        </div>
        <div>
          <div className="h3">Leaderboard</div>
          {following.map((follow) => {
            return (
              <div className="mb-2" key={follow._id}>
                <UserScore displayUser={follow} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NetworkFeed;