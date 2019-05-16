import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// CSS
import './css/open-sans.css';
import './css/pure-min.css';
import './index.css';
import './app.css';

import About from 'components/about';
import LandingPage from 'components/landingPage';
import createProfile from 'components/createProfile';
import createPosition from 'components/createPosition';
import userSignup from 'components/userSignup';
import Profile from 'components/profile';
import Inbox from 'components/inbox';
// import AcceptInvite from 'components/acceptInvite';
// import Auto from 'components/util/autoPage';
// import allGroups from 'components/allGroups';
// import Lobby from 'components/lobby/lobbyPage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/newprofile" component={createProfile} />
          <Route path="/newposition" component={createPosition} />
          <Route path="/newuser" component={userSignup} />

          <Route path="/profile/:linkId" component={Profile} />
          <Route path="/inbox/:profileId" component={Inbox} />

          <Route path="/about" component={About} />
          <Route component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
