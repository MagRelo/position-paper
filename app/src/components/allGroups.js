import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  state = { groups: [] };

  async componentDidMount() {
    const groups = await fetch('group/', {
      method: 'GET'
    }).then(response => response.json());

    this.setState({
      groups: groups
    });
  }

  render() {
    return (
      <div>
        <h2>Groups</h2>

        <table className="pure-table">
          <thead>
            <tr>
              <th>group</th>
            </tr>
          </thead>
          <tbody>
            {this.state.groups.map(group => {
              return (
                <tr key={group.groupId}>
                  <td>
                    <Link to={'/group/' + group.contractAddress}>
                      {group.groupName}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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