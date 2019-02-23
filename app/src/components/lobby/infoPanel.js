import React, { Component } from 'react';

class InfoPanel extends Component {
  state = { accounts: null, links: [] };

  componentDidMount() {
    if (this.props.item.messariLink) {
      this.getData();
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.item.messariLink !== this.props.item.messariLink) {
      this.getData();
    }
  }

  async getData() {
    const response = await fetch(this.props.item.messariLink).then(response =>
      response.json()
    );

    if (response.status === 200) {
      this.setState({
        loaded: true,
        name: response.data.name,
        symbol: response.data.symbol,
        tagline: response.data.tagline,
        links: response.data.relevant_resources
      });
    } else {
      this.setState({
        loaded: false,
        error: response.status.error_message
      });
    }
  }

  render() {
    return (
      <div className="info-panel">
        {this.state.loaded ? (
          <div>
            <p>
              {this.state.name} ({this.state.symbol})
            </p>
            <p>{this.state.tagline}</p>
          </div>
        ) : (
          <div>{this.state.error ? <p>{this.state.error}</p> : null}</div>
        )}
      </div>
    );
  }
}

export default InfoPanel;
