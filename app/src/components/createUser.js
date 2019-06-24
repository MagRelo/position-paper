import React, { Component } from 'react';

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
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    try {
      this.setState({
        formSuccess: true,
        formAlert: true,
        formSubmitting: false,
        formMessage: 'Success!'
      });

      // createSession
      this.props.getForm(object);
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

  alertClass() {
    if (this.state.formError) return 'alert error';
    if (this.state.formSuccess) return 'alert success';
  }

  render() {
    return (
      <div>
        <form
          name="createForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Signup</legend>

          <fieldset>
            <label htmlFor="name">Name </label>
            <input className="pure-input-1" type="text" id="name" name="name" />
            <label htmlFor="signup-email">Email </label>
            <input
              className="pure-input-1"
              type="email"
              id="signup-email"
              name="email"
            />
            <label htmlFor="signup-password">Password </label>
            <input
              className="pure-input-1"
              type="password"
              id="signup-password"
              name="password"
            />
          </fieldset>

          <hr />

          <button className="pure-button pure-button-primary">Signup</button>

          {this.state.formSubmitting ? (
            <span style={{ fontSize: 'smaller', marginLeft: '1em' }}>
              Submitting...
            </span>
          ) : null}

          {this.state.formAlert ? (
            <div className={this.alertClass()}>
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
