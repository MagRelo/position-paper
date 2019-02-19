import React, { Component } from 'react';
import { connect } from 'react-redux';

class Discuss extends Component {
  state = { accounts: null };

  render() {
    return (
      <div className="discuss">
        <h3>Discuss</h3>

        <div className="list">messages</div>

        <div className="pure-form">
          <form action="">
            <input type="text" className="pure-input" />
            <button className="pure-button pure-button-primary">Send</button>
          </form>
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
)(Discuss);
