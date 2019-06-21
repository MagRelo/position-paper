import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { StripeProvider } from 'react-stripe-elements';
import Cookies from 'js-cookie';

// CSS
import './css/open-sans.css';
import './css/pure-min.css';
import './index.css';
import './app.css';

import LoginButton from './components/loginButton';

import LandingPage from 'components/landingPage';
import UserSignup from 'components/loginButton';
import User from 'components/user';
import Query from 'components/query';
import QueryLink from 'components/link';

// testing
import createUser from 'components/createUser';
import createQuery from 'components/createQuery';
import createLink from 'components/createLink';

function App() {
  const [activeSession, setActiveSession] = useState(false);

  useEffect(
    () => {
      const servesaCookie = Cookies.get('servesa');
      if (servesaCookie) {
        setActiveSession(true);
      }
    },
    [activeSession]
  );

  function createSession() {
    setActiveSession(true);
  }

  function clearSession() {
    Cookies.remove('servesa');
    setActiveSession(false);
  }

  return (
    <StripeProvider apiKey="pk_test_dMv1AAldL0wj69FLCG4c8jce00J8jWxWg9">
      <div className="container">
        <div className="header">
          <div className="menu">
            {activeSession ? (
              <React.Fragment>
                <Link to={'/user'}>Account</Link>
              </React.Fragment>
            ) : null}

            <span>|</span>
            <LoginButton
              activeSession={activeSession}
              createSession={createSession}
              clearSession={clearSession}
            />
          </div>

          <h1>
            <Link to="/">Social Referrals</Link>
          </h1>

          <h2>Paid participation</h2>
        </div>

        <Switch>
          {activeSession ? (
            <React.Fragment>
              <Route path="/adduser" component={createUser} />
              <Route path="/addlink" component={createLink} />
              <Route path="/addquery" component={createQuery} />
              <Route path="/link/:linkId" component={QueryLink} />
              <Route path="/query/:linkId" component={Query} />
              <Route path="/user" component={User} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path="/login" component={UserSignup} />
              <Route component={LandingPage} />
            </React.Fragment>
          )}
        </Switch>
      </div>
    </StripeProvider>
  );
}

export default withRouter(App);
