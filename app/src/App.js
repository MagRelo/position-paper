import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import { OnRouteChange } from 'routingHack.js';

import Helmet from 'react-helmet';
import Cookies from 'js-cookie';
import { Loading } from './components/random';

// Component CSS
import 'react-input-range/lib/css/index.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';

// Template CSS
import './css/bootstrap.min.css';
import './css/fontawesome-all.css';

// Site CSS
import './css/typography.scss';
import './css/talent-relay.scss';
import './css/header.scss';
import './css/loaders.scss';
import './css/stars.scss';

// Header
import Header from 'components/header';
import Footer from 'components/footer';

// Routes
import Login from 'pages/login';
import LandingPage from 'pages/landingPage';
import UserDashboard from 'pages/userDashboard';
import AdminDashboard from 'pages/adminDashboard';

import GiveHelp from 'pages/giveHelp';
import GetHelp from 'pages/getHelp';
import Organizers from 'pages/organizers';

import Terms from 'pages/legal';
import About from 'pages/about';
import NotFound from 'pages/404';

// Setup Auth context
export const AuthContext = React.createContext({});

function App(props) {
  const [loadingSession, setLoadingSession] = useState(true);
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
          setLoadingSession(false);
        } else {
          clearSession();
          setLoadingSession(false);
        }
      });
    } else {
      // no cookie
      setLoadingSession(false);
    }
    // no cookie
  }, [activeSession]);

  function createSession(user, redirect) {
    Cookies.set('servesa-auth-token', user.token);
    setActiveSession(true);

    if (redirect) {
      navigate(redirect);
    } else {
      navigate('/dashboard');
    }
  }

  function clearSession() {
    Cookies.remove('servesa-auth-token');
    setActiveSession(false);
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{ activeSession, createSession, clearSession, user }}
    >
      {MetaData()}
      {loadingSession ? (
        <Loading />
      ) : (
        <div className="page-wrapper">
          <Header />
          <div className="content-wrapper">
            {activeSession ? (
              <Router>
                {/* Auth required */}
                <Login path="/login" />

                <UserDashboard path="/dashboard" />
                <AdminDashboard path="/admin" />

                <GetHelp path="/gethelp" />
                <GiveHelp path="/givehelp" />
                <Organizers path="/organizers" />

                <Terms path="/terms" />
                <About path="/about" />
                <LandingPage path="/" />
                <NotFound default />
              </Router>
            ) : (
              <Router>
                {/* Non Auth */}
                <Login path="/login" />

                <GetHelp path="/gethelp" />
                <GiveHelp path="/givehelp" />
                <Organizers path="/organizers" />

                <Terms path="/terms" />
                <About path="/about" />
                <LandingPage path="/" />
                <NotFound default />
              </Router>
            )}

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

function MetaData() {
  return (
    <Helmet>
      <title>Local Connect</title>
      <meta name="description" content="Connect to your Community" />
      <link rel="canonical" href={'https://localconnect.app'} />

      <meta property="og:site_name" content="Local Connect" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={'https://localconnect.app'} />
      <meta property="og:image:secure_url" content="https://localconnect.app" />
      <meta property="og:image" content="https://localconnect.app/logo.png" />
      <meta property="og:image:type" content="png" />
      <meta property="og:image:height" content="201" />
      <meta property="og:image:width" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@i_dot_e" />
      <meta name="twitter:title" content="LocalConnect" />
      <meta name="twitter:description" content="Connect to your Community" />
      <meta name="twitter:image" content="https://localconnect.app/logo.png" />
    </Helmet>
  );
}
