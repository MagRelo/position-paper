import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PaymentForm from './paymentFormWrapper';
// import '@reach/dialog/styles.css';
// import PaymentSourceList from './paymentSourceList';

import AuthWrapper from './util/authWrapper';
import Web3Wrapper from './util/web3Wrapper';

import RefferalsList from './referralsList';

class Profile extends Component {
  state = { linkOpen: false };

  render() {
    return (
      <Web3Wrapper skipContracts={true}>
        <AuthWrapper>
          <div>
            <h2>{this.props.selectedAccount}</h2>
            <hr />

            <RefferalsList />
          </div>
        </AuthWrapper>
      </Web3Wrapper>
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
