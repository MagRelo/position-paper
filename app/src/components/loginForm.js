import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveSession } from './util/authActions';

class UserSignup extends Component {
  state = {
    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: ''
  };

  async handleSubmit(event) {
    event.preventDefault();
    // set loading state
    this.setState({
      formSubmitting: true
    });

    // get and format form data
    const formData = new FormData(event.target);
    var formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
      });

      if (response.status === 401) {
        throw Error(response.status);
      }

      const user = await response.json();
      this.props.createSession(user, 90000);

      this.setState({
        formSuccess: true,
        formAlert: true,
        formSubmitting: false,
        formMessage: 'Success! ...redirecting'
      });
    } catch (error) {
      this.setState({
        formError: true,
        formAlert: true,
        formSubmitting: false,
        formMessage: error.message
      });

      return console.log(error);
    }
  }

  render() {
    return (
      <div>
        <form
          name="createForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Login</legend>

          <fieldset>
            <label htmlFor="name">Email </label>
            <input
              className="pure-input-1"
              type="email"
              id="email"
              name="email"
            />
            <label htmlFor="name">Password </label>
            <input
              className="pure-input-1"
              type="password"
              id="password"
              name="password"
            />
          </fieldset>

          <hr />

          <button className="pure-button pure-button-primary" type="submit">
            Login
          </button>

          {this.state.formSubmitting ? (
            <span style={{ fontSize: 'smaller', marginLeft: '1em' }}>
              Submitting...
            </span>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountsReady: !!state.account.expires
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSession: duration => {
      dispatch(saveSession(duration));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSignup);
