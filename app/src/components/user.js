import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LinksList from './userLinksTable';
import QueryList from './userQueryTable';

class Profile extends Component {
  state = { name: '', email: '', links: [], queries: [] };

  async componentDidMount() {
    const response = await fetch('/api/user', {
      method: 'GET'
    });

    if (response.status === 200) {
      const user = await response.json();
      this.setState({
        name: user.name,
        email: user.email,
        links: user.links,
        queries: user.queries
      });
    } else {
      console.log('not found', response.status);
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <p>{this.state.email}</p>

        <hr />
        <div className="row row-2">
          <div>
            <h3>Links</h3>
            <LinksList links={this.state.links} />
          </div>

          <div>
            <Link
              to="/addquery"
              className="pure-button pure-button-primary"
              style={{ float: 'right', marginTop: '0.8em' }}
            >
              Add Query
            </Link>
            <h3>Queries</h3>

            <QueryList queries={this.state.queries} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount,
    activeSession: !!state.account.expires
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
