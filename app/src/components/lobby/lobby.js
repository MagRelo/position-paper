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
  state = { groupName: '', midDeposit: 0 };

  async componentDidMount() {
    // init socket connection w/ contract address
    initSockets(this.props.match.params.contractAddress);

    const response = await fetch(
      '/group/' + this.props.match.params.contractAddress
    ).then(res => res.json());

    console.log(response);

    this.setState({
      contractAddress: this.props.match.params.contractAddress,
      groupName: response.groupName,
      minDeposit: response.minDeposit
    });
  }

  render() {
    return (
      <div>
        <div className="lobby-grid">
          <h2>{this.state.groupName}</h2>
          <Proposals />

          <AddProposal />

          <Discuss />

          <Portfolio portfolio={['BTC', 'ETH', 'DAI']} />

          <Members members={['Matt', 'Jim']} />

          <div className="lobby-footer">
            <p>Footer</p>
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
)(Lobby);
