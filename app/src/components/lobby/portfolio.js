import React, { Component } from 'react';
// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector } from 'recharts';

import { connect } from 'react-redux';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 }
// ];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Portfolio extends Component {
  state = { accounts: null };

  formatPercentage(allocation) {
    return (allocation * 100).toFixed(2) + '%';
  }

  render() {
    return (
      <section className="portfolio">
        <h3>Portfolio</h3>

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
    portfolioData: state.lobby.portfolioData
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
