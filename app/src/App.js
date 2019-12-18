import React, { useState, useEffect } from 'react';

import { Router, Link, navigate } from '@reach/router';

import Cookies from 'js-cookie';

import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

// CSS
import 'react-input-range/lib/css/index.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './index.css';
import './app.css';

// Header
import Header from 'components/header';

// Routes
import LandingPage from 'networkData/landingPage';
import Terms from 'pages/legal';
import About from 'pages/about';
import Signup from 'networkData/alphaSignup';

// Maybe Auth
import Search from 'pages/search';
import LinkPage from 'pages/link/link';

// Auth
import User from 'pages/user/user2';
import UserBankAccount from 'pages/user/userBankAccount';
import Response from 'pages/response/response';
import CreateQuery2 from 'networkData/createJob';
import Respond from 'pages/response/respond';

import Admin from 'pages/admin';

// Setup Auth context
export const AuthContext = React.createContext({});

function App(props) {
  const [activeSession, setActiveSession] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const servesaCookie = Cookies.get('servesa-auth-token');
    if (servesaCookie) {
      // hit server and see if logged in
      getUser().then(user => {
        if (!!user) {
          setUser(user);
          setActiveSession(true);
        } else {
          Cookies.remove('servesa-auth-token');
          setActiveSession(false);
        }
      });
    }
  }, [activeSession]);

  function createSession(user) {
    Cookies.set('servesa-auth-token', user.token);
    setActiveSession(true);
    navigate('/user');
  }

  function clearSession() {
    Cookies.remove('servesa-auth-token');
    setActiveSession(false);
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{ activeSession: activeSession, clearSession: clearSession }}
    >
      <div className="container">
        <Header
          user={user}
          activeSession={activeSession}
          createSession={createSession}
          clearSession={clearSession}
        />
        <div className="content-wrapper">
          {activeSession ? (
            <Router primary={false}>
              {/* Auth required */}
              <CreateQuery2 path="/addquery" />
              <Response path="/response/:responseId" />
              <Respond path="/respond/:linkId" />
              <UserBankAccount path="/user/account" />
              <User path="/user" />
              <Admin path="/admin" />

              <Search path="/search" />
              <LinkPage path="/link/:linkId" />
              <Terms path="/terms" />
              <About path="/about" />
              <LandingPage path="/" />
            </Router>
          ) : (
            <Router primary={false}>
              <LinkedInPopUp exact path="/linkedin/callback" />

              <Search path="/search" />
              <LinkPage path="/link/:linkId" />
              <Terms path="/terms" />
              <About path="/about" />
              <Signup path="/signup" />
              <LandingPage path="/" />
            </Router>
          )}
        </div>

        <footer>
          <ul>
            <li>Talent Relay</li>
            <li>
              <Link to="/terms">Terms of Service & Privacy</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </footer>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

async function getUser() {
  const apiEndpoint = '/api/auth/status';

  return await fetch(apiEndpoint)
    .then(r => {
      return r.json();
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}
