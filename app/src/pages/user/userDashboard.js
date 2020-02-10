import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
import { useTrail, animated } from 'react-spring';

import { FaEdit } from 'react-icons/fa';

import ActivityTile from 'pages/search/searchResult_tile';

import { Loading, JobBoard, UserProfile, SocialGrid } from 'components/random';

import { AuthContext } from 'App';

function User(props) {
  const { clearSession, user } = useContext(AuthContext);

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(user);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUser(clearSession)
      .then(body => {
        if (isSubscribed) {
          setUserData(body.user);
          setLinks(body.links);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setError(error.toString());
      });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, []);

  const config = { mass: 5, tension: 2000, friction: 200 };
  const trail = useTrail(links.length, {
    config,
    opacity: 1,
    x: 0,
    height: 80,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <div className="container user-container">
      {error ? <p style={{ textAlign: 'center' }}>{error}</p> : null}

      <div>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <div className="mb-4"></div>
              <div className="user-panel">
                <div className="grid grid-5-3">
                  <UserProfile user={userData} />

                  <SocialGrid />
                </div>

                <div className="mb-4"></div>

                <div className="grid grid-2-x">
                  <div>
                    <JobBoard jobBoardId={userData.jobBoardId} />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Link to="/profile" className="btn btn-sm btn-unstyled">
                      Edit Profile <FaEdit />
                    </Link>
                  </div>
                </div>

                <div className="mb-4"></div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="grid grid-3">
                    {trail.map(({ x, height, ...rest }, index) => {
                      return (
                        <animated.div
                          key={index}
                          style={{
                            ...rest,
                            transform: x.interpolate(
                              x => `translate3d(0,${x}px,0)`
                            )
                          }}
                        >
                          {ActivityTile(links[index])}
                        </animated.div>
                      );
                    })}

                    <div
                      style={{
                        border: 'dashed 2px #ddd',
                        borderRadius: '7px',
                        padding: '1rem'
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <h4>Add Jobs</h4>
                        <p>
                          Every job on Talent Relay includes a referral bonus
                          – add jobs to your job board.
                        </p>

                        <div className="mb-4"></div>
                        <Link to="/search" className="btn btn-theme btn-sm">
                          Find Jobs To Add
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <section>
                <div className="container section-title">
                  <h2>Side Hustles</h2>
                  <p>Other Ways to Earn Money on Talent Relay</p>
                </div>

                <div className="grid grid-2 text-center">
                  <div className="panel">
                    <h3>Onboard Employers → Get Paid</h3>
                    <p>
                      <i>Sign-up Employers and get 5% of every job posted.</i>
                    </p>
                    <div>
                      <JobBoard jobBoardId={userData.jobBoardId} />
                    </div>
                  </div>

                  <div className="panel">
                    <h3>Onboard Candidates → Get Paid</h3>
                    <p>
                      <i>Sign-up Employers and get 5% of every job posted.</i>
                    </p>
                    <div>
                      <JobBoard jobBoardId={userData.jobBoardId} />
                    </div>
                  </div>

                  <div className="panel">
                    <h3>Get Hired → Get Paid</h3>
                    <p>
                      <i>Every job on Talent Relay includes a hiring bonus</i>
                    </p>
                    <div style={{ textAlign: 'center' }}>
                      <Link to="/search" className="btn btn-theme btn-sm">
                        Search for Jobs
                      </Link>
                    </div>
                  </div>

                  <div className="panel">
                    <h3>For Employers</h3>

                    <div style={{ textAlign: 'center' }}>
                      {userData.hasPaymentSource ? (
                        <Link to="/addquery" className="btn btn-theme btn-sm">
                          Post a Job
                        </Link>
                      ) : (
                        <div>
                          <p>Activate your Employer Account to post jobs</p>
                          <Link
                            className="btn btn-theme btn-sm"
                            to="/employer-account"
                          >
                            Activate Employer Account
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;

async function getUser(clearSession) {
  return await fetch('/api/user').then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    if (response.status === 401) {
      // logout with context function
      console.log(response.status, 'logging out...');
      clearSession();
    }

    console.log(response.status);
    throw new Error(response.statusText);
  });
}
