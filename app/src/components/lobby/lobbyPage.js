import React, { Component } from 'react';
import { connect } from 'react-redux';

import Lobby from 'components/lobby/lobby';
import AuthWrapper from 'components/util/authWrapper';

class LobbyPage extends Component {
  state = { groupName: 'loading...', midDeposit: 0 };

  componentDidUpdate(prevState) {}

  render() {
    return (
      <React.Fragment>
        <AuthWrapper>
          <Lobby contractAddress={this.props.match.params.contractAddress} />
        </AuthWrapper>
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
