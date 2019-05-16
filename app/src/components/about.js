import React, { Component } from 'react';
import { connect } from 'react-redux';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <div className="row row-3">
          <div>
            <div>
              <h2>FAQ</h2>
            </div>
            <div />
            <div />
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
)(LandingPage);
