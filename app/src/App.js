import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import { OnRouteChange } from 'routingHack.js';

import Helmet from 'react-helmet';
import Cookies from 'js-cookie';
import { Loading } from './components/random';

// Header
import Header from 'components/header';
import Footer from 'components/footer';

// Routes
import LandingPage from 'pages/landingPage';
import Login from 'pages/login';
import Terms from 'pages/legal';
import About from 'pages/about';
import NotFound from 'pages/404';

import Dashboard from 'pages/dashboard';

// Setup Auth context
export const AuthContext = React.createContext({});

function App() {
  const [loadingSession, setLoadingSession] = useState(true);
  const [activeSession, setActiveSession] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    // hit server and see if logged in
    getUser().then((user) => {
      if (!!user) {
        setUser(user);
        setActiveSession(true);
        setLoadingSession(false);
      } else {
        clearSession();
        setLoadingSession(false);
      }
    });
  }, []);

  async function callApi(method, endPoint, body) {
    return fetch(endPoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      // success (201's?)
      if (response.status === 200) {
        return response.json();
      }

      if (response.status === 401) {
        clearSession();
      }

      // some type of error has occured...
      console.log(response.status, response.statusText);
      throw new Error(response.statusText);
    });
  }

  function createSession(user, redirect) {
    // update context
    setUser(user);
    setActiveSession(true);

    if (redirect) {
      navigate(redirect);
    } else {
      navigate('/dashboard');
    }
  }

  function clearSession() {
    setActiveSession(false);
    navigate('/login');
  }

  return (
    <AuthContext.Provider
      value={{ activeSession, createSession, clearSession, callApi, user }}
    >
      {MetaData()}
      {loadingSession ? (
        <Loading />
      ) : (
        <div className="page-wrapper">
          <Header />
          <div className="content-wrapper">
            <Router>
              <LandingPage path="/" />

              <Login path="/login" />
              <Terms path="/terms" />
              <About path="/about" />

              {/* Auth required */}
              {activeSession ? (
                <React.Fragment>
                  <Dashboard path="/dashboard" />
                </React.Fragment>
              ) : null}

              <NotFound default />
            </Router>

            <OnRouteChange
              action={() => {
                window.scrollTo(0, 0);
              }}
            ></OnRouteChange>
          </div>

          <Footer />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export default App;

async function getUser() {
  return await fetch('/auth/status')
    .then((r) => {
      return r.json();
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

function MetaData() {
  return (
    <Helmet>
      <title>Position Paper</title>
      <meta name="description" content="Stake Your Claim" />
      <link rel="canonical" href={'https://localconnect.app'} />

      <meta property="og:site_name" content="Local Connect" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={'https://localconnect.app'} />
      <meta property="og:image:secure_url" content="https://localconnect.app" />
      <meta
        property="og:image"
        content="https://localconnect.app/logo_share.png"
      />
      <meta property="og:image:type" content="png" />
      <meta property="og:image:height" content="201" />
      <meta property="og:image:width" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@i_dot_e" />
      <meta name="twitter:title" content="LocalConnect" />
      <meta name="twitter:description" content="Connect to your Community" />
      <meta
        name="twitter:image"
        content="https://localconnect.app/logo_share.png"
      />
    </Helmet>
  );
}
