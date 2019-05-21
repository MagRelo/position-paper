import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaymentForm from './paymentFormWrapper';
// import '@reach/dialog/styles.css';

import RefferalsList from './referralsList';

class Profile extends Component {
  state = { accounts: null, contactOpen: false, linkOpen: false };

  render() {
    return (
      <div>
        <h2>Name</h2>
        <div className="row row-3">
          <div>
            <p>profile pic</p>
          </div>
          <div>
            <p>bio</p>
          </div>
        </div>
        <hr />

        <div className="row row-2">
          <div>
            <RefferalsList />
          </div>
          <div>
            <h3>Add Payment Source</h3>

            <PaymentForm />
            <h3>Payment Sources</h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
