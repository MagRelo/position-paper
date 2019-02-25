import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSockets } from './sockets';

import './lobby.css';
import './accordian.css';
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

    // const response = await fetch(
    //   '/group/' + this.props.match.params.contractAddress
    // ).then(res => res.json());

    // this.setState({
    //   contractAddress: this.props.match.params.contractAddress,
    //   groupName: response.groupName,
    //   minDeposit: response.minDeposit
    // });
  }

  render() {
    return (
      <div className="lobby-grid">
        <h2>{this.state.groupName}</h2>
        <Proposals groupKey={this.state.contractAddress} />

        <AddProposal groupKey={this.state.contractAddress} />

        <Discuss
          messages={this.props.chatMessages}
          groupKey={this.state.contractAddress}
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
    groupName: state.lobby.group.groupLobby,
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
