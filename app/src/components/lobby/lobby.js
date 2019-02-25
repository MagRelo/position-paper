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

    const response = await fetch(
      '/group/' + this.props.match.params.contractAddress
    ).then(res => res.json());

    this.setState({
      contractAddress: this.props.match.params.contractAddress,
      groupName: response.groupName,
      minDeposit: response.minDeposit
    });
  }

  render() {
    return (
      <div className="lobby-grid">
        <h2>{this.state.groupName}</h2>
        <Proposals groupKey={this.state.contractAddress} />

        <AddProposal groupKey={this.state.contractAddress} />

        <Discuss groupKey={this.state.contractAddress} />

        <Portfolio
          portfolio={[
            { asset: 'BTC', allocation: 0.21 },
            { asset: 'ETH', allocation: 0.72 },
            { asset: 'DAI', allocation: 0.07 }
          ]}
        />

        <Members members={['Matt', 'Jim']} />
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
