import React, { Component } from 'react';
import { connect } from 'react-redux';

import Lobby from 'components/lobby/lobby';
import AuthWrapper from 'components/util/authWrapper';
import Web3Wrapper from 'components/util/web3Wrapper';

class LobbyPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Web3Wrapper skipContracts={true}>
          <AuthWrapper skipAuth={true}>
            <Lobby contractAddress={this.props.match.params.contractAddress} />
          </AuthWrapper>
        </Web3Wrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyPage);
