import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import { OnRouteChange } from 'routingHack.js';

import Helmet from 'react-helmet';
// import Cookies from 'js-cookie';
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

import Account from 'pages/account/account';
import ViewUser from 'pages/account/user';
import UpdateProfile from 'pages/account/updateProfile';
import Leaderboard from 'pages/frontpage';
import Network from 'pages/network/network';

import AddProp from 'pages/position/addPosition';
import ViewProp from 'pages/position/position';

// Setup Auth context
export const AuthContext = React.createContext({});

function App() {
  const [loadingSession, setLoadingSession] = useState(true);
  const [activeSession, setActiveSession] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('auth/status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      // success (201's?)
      if (response.status === 200) {
        const user = await response.json();
        setUser(user);
        setActiveSession(true);
        setLoadingSession(false);
        return;
      }

      console.log(response.status, response.statusText);
      if (response.status === 401) {
        setLoadingSession(false);
        return clearSession();
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
      if (response.status === 200 || response.status === 201) {
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
      navigate('/account');
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

      <div className="page-wrapper">
        <Header />

        {loadingSession ? (
          <Loading />
        ) : (
          <div className="content-wrapper">
            <Router>
              <LandingPage path="/" />

              <Login path="/login" />
              <Terms path="/terms" />
              <About path="/about" />

              <Leaderboard path="/leaderboard" />
              <ViewProp path="/position/:propId" />
              <ViewUser path="/user/:userId" />

              {/* Auth required */}
              {activeSession ? (
                <React.Fragment>
                  <Network path="/network" />
                  <Account path="/account" />
                  <AddProp path="/addposition" />
                  <UpdateProfile path="/profile" />
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
        )}
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;

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
