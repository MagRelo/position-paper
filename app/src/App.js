import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';

// import { StripeProvider } from 'react-stripe-elements';
import Cookies from 'js-cookie';

// CSS
import '@reach/dialog/styles.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './index.css';
import './app.css';

// Header
import LoginButton from 'components/loginButton';

import LandingPage from 'components/landingPage';
import User from 'components/user';
import Link2 from 'components/link2';
import Search from 'components/search';
import Response from 'components/response';

// testing
import createUser from 'components/createUser';
import createLink from 'components/createLink';

// import createQuery from 'components/createQuery';
import createQuery2 from 'components/createQuery-AL';

function App(props) {
  const [activeSession, setActiveSession] = useState(false);

  useEffect(
    () => {
      const servesaCookie = Cookies.get('servesa');
      if (servesaCookie) {
        console.log(servesaCookie);

        // hit server and see if logged in
        getUser().then(isLoggedIn => {
          if (isLoggedIn) {
            setActiveSession(true);
          } else {
            Cookies.remove('servesa');
            setActiveSession(false);
          }
        });
      }
    },
    [activeSession]
  );

  function createSession() {
    setActiveSession(true);
    props.history.push('/user');
  }

  function clearSession() {
    Cookies.remove('servesa');
    setActiveSession(false);
    props.history.push('/');
  }

  return (
    <div className="container">
      <nav className="header">
        <div className="menu">
          <NavLink exact={true} activeClassName="is-active" to={'/search'}>
            Search
          </NavLink>
          {activeSession ? (
            <NavLink activeClassName="is-active" to={'/user'}>
              My Account
            </NavLink>
          ) : null}

          <span>|</span>

          <LoginButton
            activeSession={activeSession}
            createSession={createSession}
            clearSession={clearSession}
          />
        </div>

        <h1>
          <Link to="/">incentive.exchange</Link>
        </h1>

        <h2>Business protocol layer</h2>
      </nav>

      {activeSession ? (
        <Switch>
          <Route path="/adduser" component={createUser} />
          <Route path="/addlink" component={createLink} />
          <Route path="/addquery" component={createQuery2} />

          <Route path="/search" component={Search} />
          <Route path="/link/:linkId" component={Link2} />
          {/* <Route path="/query/:linkId" component={Query} /> */}
          <Route path="/response/:responseId" component={Response} />
          <Route path="/user" component={User} />
          <Route component={LandingPage} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/link/:linkId" component={Link2} />
          <Route path="/search" component={Search} />
          <Route component={LandingPage} />
        </Switch>
      )}
    </div>
  );
}

export default withRouter(App);

async function getUser(queryId, parentLink) {
  const apiEndpoint = '/api/user/';

  return await fetch(apiEndpoint)
    .then(r => {
      return r.status === 200 ? true : false;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}
