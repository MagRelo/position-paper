import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSockets } from './sockets';

import './lobby.css';
import Portfolio from './portfolio';
import Proposals from './proposals';
import AddProposal from './addProposal';
import Discuss from './discuss';
import Members from './member';

class Lobby extends Component {
  state = { groupName: 'loading...', midDeposit: 0 };

  async componentDidMount() {
    // init socket connection w/ contract address
    initSockets(this.props.match.params.contractAddress);
  }

  render() {
    return (
      <div className="lobby-grid">
        <h2>{this.props.groupName}</h2>
        <Proposals groupKey={this.props.groupKey} />

        <AddProposal groupKey={this.props.groupKey} />

        <Discuss
          messages={this.props.chatMessages}
          groupKey={this.props.groupKey}
          userKey={this.props.selectedAccount}
        />

        <Portfolio portfolio={this.props.portfolio} />

        <Members members={this.props.members} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groupName: state.lobby.group.groupName,
    groupKey: state.lobby.group.groupKey,
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
