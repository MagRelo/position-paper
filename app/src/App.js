import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import { OnRouteChange } from 'routingHack.js';

import Helmet from 'react-helmet';
import Cookies from 'js-cookie';
import { Loading } from 'components/random';

// Compoenent CSS
import 'react-input-range/lib/css/index.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';

// Template CSS
import './css/bootstrap.min.css';
import './css/fontawesome-all.css';

// Site CSS
import './css/talent-relay.scss';
import './css/header.scss';
import './css/loaders.scss';
import './css/stars.scss';

// Header
import Header from 'components/header';
import Footer from 'components/footer';

// Routes
import LandingPage from 'pages/landingPage';
import Terms from 'pages/legal';
import About from 'pages/about';
import Employers from 'pages/employer';
import NotFound from 'pages/404';

// Maybe Auth
import Login from 'pages/login';
import Search from 'pages/search/search';
import UserJobs from 'pages/user/userJobBoard';
import LinkPage from 'pages/link/link';
import EditLink from 'pages/link/editLink';
import Applications from 'pages/link/applications';
import ApplicationPayment from 'pages/link/applicationPayment';

import AddLink from 'networkData/jobForm';

// Auth
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import Profile from 'pages/user/userProfile';
import Dashboard from 'pages/user/userDashboard';
import EmployeeOnboarding from 'pages/user/employerOnboardingForm';
// import Response from 'pages/response/response';
// import Respond from 'pages/response/respond';

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
                <AddLink path="/addquery" />
                <EditLink path="/link/:linkId/edit" />

                <Dashboard path="/dashboard" />
                <Profile path="/profile" />

                <LinkPage path="/link/:linkId" />
                <Applications path="/applications/:linkId" />
                <ApplicationPayment path="/payment/:linkId" />

                <UserJobs path="/jobs/:userId" />
                <Search path="/search" />
                <Terms path="/terms" />
                <About path="/about" />

                <Employers path="/employers" />

                <EmployeeOnboarding path="/employer-account" />

                <LandingPage path="/" />
                <NotFound default />
              </Router>
            ) : (
              <Router>
                <LinkedInPopUp exact path="/linkedin/callback" />
                <Login path="/login" />

                <LinkPage path="/link/:linkId" />

                <UserJobs path="/jobs/:userId" />
                <Search path="/search" />
                <Terms path="/terms" />
                <About path="/about" />

                <Employers path="/employers" />
                <EmployeeOnboarding path="/employer-account" />

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
      <title>Talent Relay</title>
      <meta
        name="description"
        content="Talent Relay super-charges your talent search. We combine cash incentives, social networking, and human judgement to provide a steady stream of high-quality, pre-screened candidates."
      />
      <link rel="canonical" href={'https://talentrelay.app'} />

      <meta property="og:site_name" content="Talent Relay" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={'https://talentrelay.app'} />
      <meta property="og:image:secure_url" content="https://talentrelay.app" />
      <meta property="og:image" content="https://talentrelay.app/logo.png" />
      <meta property="og:image:type" content="png" />
      <meta property="og:image:height" content="201" />
      <meta property="og:image:width" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@i_dot_e" />
      <meta name="twitter:title" content="TalentRelay" />
      <meta
        name="twitter:description"
        content="Talent Relay super-charges your talent search. We combine cash incentives, social networking, and human judgement to provide a steady stream of high-quality, pre-screened candidates."
      />
      <meta name="twitter:image" content="https://talentrelay.app/logo.png" />
    </Helmet>
  );
}
