import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './message';

const messages = [
  { id: '1', title: 'asdf', message: 'asdoiuasdfo' },
  { id: '2', title: '1234', message: 'asdoiuasdfo' },
  { id: '3', title: 'poiu', message: 'asdoiuasdfo' },
  { id: '4', title: 'xcvb', message: 'asdoiuasdfo' }
];

class Inbox extends Component {
  state = { accounts: null, messages: messages };

  render() {
    return (
      <div>
        <h3>Messages</h3>

        {this.state.messages.map(message => {
          return (
            <Message
              title={message.title}
              message={message.message}
              id={message.id}
              key={message.id}
            />
          );
        })}
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
)(Inbox);
