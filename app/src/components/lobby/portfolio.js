import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

class Portfolio extends Component {
  state = { accounts: null, contractBalance: 0 };

  formatPercentage(allocation) {
    return (allocation * 100).toFixed(2) + '%';
  }

  render() {
    return (
      <section className="portfolio">
        <h3>Portfolio ({this.props.ethBalance})</h3>

        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={this.props.portfolio}
                cx={130}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {this.props.portfolio.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={this.props.colors[index % this.props.colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="list">
          <table className="pure-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Allocation</th>
              </tr>
            </thead>
            <tbody>
              {this.props.portfolio.map(position => {
                return (
                  <tr key={position.code}>
                    <td>{position.name}</td>
                    <td>{this.formatPercentage(position.pct)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.lobby.colors,
    portfolio: state.lobby.portfolio,
    portfolioData: state.lobby.portfolioData,
    ethBalance: state.lobby.ethBalance
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
