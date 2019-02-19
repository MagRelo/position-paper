import React, { Component } from 'react';
import { connect } from 'react-redux';

import './lobby.css';
import Portfolio from './portfolio';
import Proposals from './proposals';
import Discuss from './discuss';
import Members from './member';

class Lobby extends Component {
  state = { accounts: null };

  componentDidMount() {
    this.setState({ contractAddress: this.props.match.params.contractAddress });

    // init socket connection w/ contract address

    // init contract with updated address(?)
  }

  sendMessage(message) {
    console.log('send message:', message);
  }

  render() {
    return (
      <div>
        <div className="lobby-grid">
          <h2>{this.state.contractAddress}</h2>
          <Proposals proposals={['0.5 ETH => XMR', '1 ETH => EOS']} />
          <Discuss
            sendFunction={this.sendMessage.bind(this)}
            messages={['m1', 'm2', 'm3']}
          />
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
