import React, { Component } from 'react';

class MembersList extends Component {
  state = { accounts: null };

  render() {
    return (
      <section className="members">
        <h3>Members</h3>
        <div className="list">
          <table className="pure-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Online</th>
              </tr>
            </thead>
            <tbody>
              {this.props.members.map(position => {
                return (
                  <tr key={position}>
                    <td>{position}</td>
                    <td>{position}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default MembersList;
