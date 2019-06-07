import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PaymentForm from './paymentFormWrapper';
// import '@reach/dialog/styles.css';
// import PaymentSourceList from './paymentSourceList';

// import AuthWrapper from './util/authWrapper';
// import Web3Wrapper from './util/web3Wrapper';

import LinksList from './linksList';
import PositionsList from './positionsList';

class Profile extends Component {
  state = { linkOpen: false };

  render() {
    return (
      <div>
        <h2>My Name</h2>

        <hr />
        <div className="row row-2">
          <LinksList />
          <PositionsList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount,
    activeSession: !!state.account.expires
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
