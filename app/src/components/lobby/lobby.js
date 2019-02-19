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

    // init socket connection
    // => groupInfo, chat, members, proposals, portfolio
  }

  render() {
    return (
      <div>
        <div className="lobby-grid">
          <h2>{this.state.contractAddress}</h2>
          <Proposals />
          <Discuss />
          <Portfolio portfolio={this.props.portfolio} />
          <Members members={this.props.members} />

          <div className="lobby-footer">
            <p>Footer</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    portfolio: ['one', 'two'],
    members: ['one', 'two'],
    chat: [],
    proposals: []
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
