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
  state = { accounts: null };

  async componentDidMount() {
    // init socket connection w/ contract address
    const loaded = await initSockets(this.props.match.params.contractAddress);

    this.setState({
      contractAddress: this.props.match.params.contractAddress,
      contractLoaded: loaded
    });
  }

  render() {
    return (
      <div>
        <div className="lobby-grid">
          <h2>{this.state.contractAddress}</h2>

          <Proposals />

          <AddProposal />

          <Discuss messages={['adsf', 'asdfsdf']} />

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
