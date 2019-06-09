import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { StripeProvider } from 'react-stripe-elements';

// CSS
import './css/open-sans.css';
import './css/pure-min.css';
import './index.css';
import './app.css';

import Header from 'components/header';

import LandingPage from 'components/landingPage';
import UserSignup from 'components/loginButton';
import User from 'components/user';
import Query from 'components/query';

// testing
import createUser from 'components/createUser';
import createQuery from 'components/createQuery';
import createLink from 'components/createLink';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_dMv1AAldL0wj69FLCG4c8jce00J8jWxWg9">
        <div className="container">
          <Header />
          <Switch>
            {/* Testing */}
            <Route path="/adduser" component={createUser} />
            <Route path="/addlink" component={createLink} />
            <Route path="/addquery" component={createQuery} />

            {/* non auth */}
            <Route path="/link/:linkId" component={Query} />
            <Route path="/login" component={UserSignup} />
            <Route path="/user/:userId" component={User} />
            <Route component={LandingPage} />
          </Switch>
        </div>
      </StripeProvider>
    );
  }
}

export default withRouter(App);
