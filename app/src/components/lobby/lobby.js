import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSockets } from './sockets';

import './lobby.css';
import Portfolio from './portfolio';
import PortfolioHistory from './portfolioHistory';
import Proposals from './proposals';
// import AddProposal from './addProposal';
// import Discuss from './discuss';
// <Discuss
// messages={this.props.chatMessages}
// groupKey={this.props.groupKey}
// userKey={this.props.selectedAccount}
// />

import Members from './member';

class Lobby extends Component {
  state = { groupName: 'loading...', midDeposit: 0 };

  async componentDidMount() {
    // console.log('lobby cdm', this.props.selectedAccount);
    initSockets(this.props.contractAddress, this.props.selectedAccount);
  }

  componentDidUpdate(prevState) {
    if (prevState.selectedAccount !== this.props.selectedAccount) {
      // console.log('lobby cdu', this.props.selectedAccount);
      initSockets(this.props.contractAddress, this.props.selectedAccount);
    }
  }

  render() {
    return (
      <div className="lobby-grid">
        <h2>{this.props.groupName}</h2>
        <PortfolioHistory portfolio={this.props.portfolio} />
        <Proposals />
        <Portfolio portfolio={this.props.portfolio} />
        <Members members={this.props.members} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groupName: state.lobby.group.groupname,
    members: state.lobby.members,
    portfolio: state.lobby.portfolio,
    chatMessages: state.lobby.chat,
    selectedAccount: state.account.selectedAccount
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
