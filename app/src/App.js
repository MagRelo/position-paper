import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import { StripeProvider } from 'react-stripe-elements';
import Cookies from 'js-cookie';

// CSS
import './css/open-sans.css';
import './css/pure-min.css';
import './index.css';
import './app.css';

// Header
import LoginButton from 'components/loginButton';

import LandingPage from 'components/landingPage';
import User from 'components/user';
import Query from 'components/query';
import QueryLink from 'components/link';
import Search from 'components/search';
import Response from 'components/response';
import Signup from 'components/createUser';

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
        console.log(servesaCookie);
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
    <div className="container">
      <nav className="header">
        <div className="menu">
          <Link to={'/search'}>Search</Link>
          {activeSession ? <Link to={'/user'}>Account</Link> : null}

          <span>|</span>

          <LoginButton
            activeSession={activeSession}
            createSession={createSession}
            clearSession={clearSession}
          />
        </div>

        <h1>
          <Link to="/">Incentive Exchange</Link>
        </h1>

        <h2>Business protocol layer</h2>
      </nav>

      {activeSession ? (
        <Switch>
          <Route path="/adduser" component={createUser} />
          <Route path="/addlink" component={createLink} />
          <Route path="/addquery" component={createQuery} />

          <Route path="/search" component={Search} />
          <Route path="/link/:linkId" component={QueryLink} />
          <Route path="/query/:linkId" component={Query} />
          <Route path="/response/:responseId" component={Response} />
          <Route path="/user" component={User} />
          <Route component={LandingPage} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/link/:linkId" component={QueryLink} />
          <Route path="/search" component={Search} />
          <Route path="/signup" component={Signup} />
          <Route component={LandingPage} />
        </Switch>
      )}
    </div>
  );
}

export default withRouter(App);
