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
import About from 'components/about';
import LandingPage from 'components/landingPage';
import UserSignup from 'components/login';
import User from 'components/user';

// employers
import createPosition from 'components/createPosition';
import Position from 'components/profile';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_dMv1AAldL0wj69FLCG4c8jce00J8jWxWg9">
        <div className="container">
          <Header />

          <Switch>
            <Route path="/login" component={UserSignup} />
            <Route path="/user/:userId" component={User} />

            <Route path="/newposition" component={createPosition} />

            <Route path="/link/:linkId" component={Position} />

            <Route path="/about" component={About} />
            <Route component={LandingPage} />
          </Switch>
        </div>
      </StripeProvider>
    );
  }
}

export default withRouter(App);
