import React, { Component } from 'react';
import { connect } from 'react-redux';

// /* Discuss */
// .discuss {
//   /* padding: 0.67em 1em 1em 0.5em; */
//   border-bottom-right-radius: 2px;

//   display: grid;
//   grid-template-rows: auto 1fr auto;
// }

// .discuss .list {
//   background: #ffffff;
//   border-top-right-radius: 2px;
//   border-top-left-radius: 2px;

//   height: 100%;
//   overflow: auto;
//   max-height: 29vh;
// }

// .discuss .list .message {
//   padding: 0.33em;
// }

// .discuss .list .message-user {
//   background: #d0d2d4;
//   padding: 0.33em 0.67em;
//   text-align: right;
// }

// .discuss form {
//   padding: 0.5em;

//   background: white;
//   border-top: solid #dddddd 1px;
//   border-bottom-right-radius: 2px;
//   border-bottom-left-radius: 2px;

//   display: grid;
//   grid-template-columns: 1fr auto;
//   grid-gap: 0.5em;
// }

class Discuss extends Component {
  state = { accounts: null, message: '' };

  async sendMessage(event) {
    event.preventDefault();

    await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupKey: this.props.groupKey,
        userKey: this.props.userKey,
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
                  <tr key={message.groupchatid}>
                    <td className="message-user">{message.username}</td>
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
  return {
    groupKey: state.lobby.group.groupkey
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discuss);
