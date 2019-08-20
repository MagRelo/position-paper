import React, { Component } from 'react';

class UserSignup extends Component {
  state = {
    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: '',

    token: '',
    metaData: {},
    bankLabel: ''
  };

  async handleSubmit(event) {
    event.preventDefault();
    // set loading state
    this.setState({
      formSubmitting: true
    });

    // get and format form data
    const formData = new FormData(event.target);
    var formObj = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });

    // merge in account tokens
    formObj.token = this.state.token;
    formObj.metaData = this.state.metaData;

    // add tos data
    formObj.tos = {
      date: Math.floor(Date.now() / 1000),
      user_agent: window.navigator.userAgent
    };

    try {
      // create user on server
      await createUser(formObj);

      // redirect to user... or server side?

      // createSession
      this.setState({
        formSuccess: true,
        formAlert: true,
        formSubmitting: false,
        formMessage: 'Success!'
      });

      this.props.createSession();
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

  resetForm() {
    this.setState({
      formAlert: false,
      formError: false,
      formSuccess: false,
      formSubmitting: false,
      formMessage: ''
    });
  }

  render() {
    return (
      <div>
        <form
          name="createForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Create New User</legend>
          <fieldset>
            <div className="row row-2">
              <div>
                <label htmlFor="email">Email </label>
                <input
                  className="pure-input-1"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div>
                <label htmlFor="password">Password </label>
                <input
                  className="pure-input-1"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
            </div>
          </fieldset>

          <hr />

          <button className="pure-button pure-button-primary">Signup</button>

          {this.state.formSubmitting ? (
            <span style={{ fontSize: 'smaller', marginLeft: '1em' }}>
              Submitting...
            </span>
          ) : null}

          {this.state.formAlert ? (
            <div>
              <p>{this.state.formMessage}</p>

              <button
                className="pure-button"
                onClick={this.resetForm.bind(this)}
              >
                Ok
              </button>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

export default UserSignup;

async function createUser(formData) {
  return await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(async response => {
    const responseObj = await response.json();
    if (response.status === 200) {
      return responseObj;
    }

    throw new Error(responseObj.message);
  });
}
