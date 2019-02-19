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

  render() {
    return (
      <div>
        <div className="lobby-grid">
          <h2>{this.state.contractAddress}</h2>
          <Proposals proposals={['three', 'four']} />
          <Discuss />
          <Portfolio portfolio={['one', 'two']} />
          <Members members={['one', 'two']} />

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
