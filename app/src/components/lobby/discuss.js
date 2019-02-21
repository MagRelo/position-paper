import React, { Component } from 'react';
import { connect } from 'react-redux';

import { submitChat } from './sockets';

class Discuss extends Component {
  state = { accounts: null, message: '' };

  sendMessage(event) {
    event.preventDefault();

    this.props.submitChat(this.state.message);

    return this.setState({ message: '' });
  }

  handleFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <section className="discuss">
        <h3>Discuss</h3>

        <div className="list">
          <ul>
            {this.props.messages.map(position => {
              return (
                <li className="list-item" key={position}>
                  {position}
                </li>
              );
            })}
          </ul>
        </div>

        <form action="" className="pure-form">
          <input
            type="text"
            className="pure-input"
            name="message"
            id="message"
            placeholder="type to chat..."
            value={this.state.message}
            onChange={this.handleFormChange.bind(this)}
          />

          <button
            className="pure-button pure-button-primary"
            onClick={this.sendMessage.bind(this)}
          >
            Send
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    submitChat: message => {
      return submitChat(message);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discuss);
