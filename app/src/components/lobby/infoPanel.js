import React, { Component } from 'react';

class InfoPanel extends Component {
  state = { accounts: null, message: '' };

  render() {
    return (
      <div className="info-panel">
        <p>{this.props.item.name}</p>
      </div>
    );
  }
}

export default InfoPanel;
