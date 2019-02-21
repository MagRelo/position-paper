import React, { Component } from 'react';

class InfoPanel extends Component {
  state = { accounts: null, links: [] };

  componentDidMount() {
    if (this.props.item.messariLink) {
      console.log('hit');
      this.getData();
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.item.messariLink !== this.props.item.messariLink) {
      console.log('two');
      this.getData();
    }
  }

  async getData() {
    const response = await fetch(this.props.item.messariLink).then(response =>
      response.json()
    );

    console.log(response);

    this.setState({
      loaded: response.status === 200,
      name: response.data.name,
      symbol: response.data.symbol,
      tagline: response.data.tagline,
      links: response.data.relevant_resources
    });
  }

  render() {
    return (
      <div className="info-panel">
        <p>
          {this.state.name} ({this.state.symbol})
        </p>
        <p>{this.state.tagline}</p>
      </div>
    );
  }
}

export default InfoPanel;
