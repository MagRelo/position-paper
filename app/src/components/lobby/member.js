import React, { Component } from 'react';

class MembersList extends Component {
  state = { accounts: null };

  render() {
    return (
      <div className="members">
        <h3>Members</h3>
        <ul>
          {this.props.members.map(position => {
            return (
              <li style={{ listStyle: 'none' }} key={position}>
                {position}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MembersList;
