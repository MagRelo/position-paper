import React, { Component } from 'react';
import { connect } from 'react-redux';

class Discuss extends Component {
  state = { accounts: null, message: '' };

  async sendMessage(event) {
    event.preventDefault();

    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupKey: this.props.groupKey,
        userKey: this.props.selectedAccount,
        message: this.state.message
      })
    }).then(response => response.json());

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
          <table>
            <tbody>
              {this.props.messages.map(message => {
                return (
                  <tr key={message.groupChatId}>
                    <td className="message-user">{message.userKey}</td>
                    <td className="message">{message.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discuss);
