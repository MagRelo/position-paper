import React, { Component } from 'react';
import { connect } from 'react-redux';

class LinkForm extends Component {
  state = {
    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: '',

    linkCreated: false,

    debug: true,
    queryList: [],
    queryId: null,
    parentLink: null
  };

  componentDidMount() {
    this.getQueries();
  }

  async getQueries() {
    const queryList = await fetch('/api/query/list', { method: 'GET' }).then(
      response => response.json()
    );

    this.setState({ queryList: queryList });
  }

  async handleSubmit(event) {
    event.preventDefault();

    // set loading state
    this.setState({
      formSubmitting: true
    });

    try {
      const newLink = await fetch('/api/link/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          queryId: this.state.queryId,
          parentLink: this.state.parentLink
        })
      }).then(response => response.json());

      console.log(newLink);
      this.setState({
        formSuccess: true,
        formAlert: true,
        formSubmitting: false,
        formMessage: 'Success!',
        linkCreated: true
      });

      // refresh queries
      this.getQueries();
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
          name="newLinkForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Create Referral Link</legend>

          {this.state.debug ? (
            <div>
              <ul>
                {this.state.queryList.map(item => {
                  return (
                    <li key={item._id}>
                      <div>
                        <p
                          onClick={() => {
                            this.setState({ queryId: item._id });
                          }}
                        >
                          {item.data.name}
                        </p>

                        <ul>
                          {item.links.map(link => {
                            return (
                              <li
                                key={link._id}
                                onClick={() => {
                                  this.setState({
                                    queryId: item._id,
                                    parentLink: link._id
                                  });
                                }}
                              >
                                {link._id}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p>query: {this.state.queryId}</p>
              <p>parent link: {this.state.parentLink}</p>
            </div>
          ) : null}

          <button className="pure-button pure-button-primary">
            Create Link
          </button>

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

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount
  };
};

export default connect(
  mapStateToProps,
  null
)(LinkForm);
