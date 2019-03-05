import React, { Component } from 'react';
// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector } from 'recharts';

import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class PortfolioList extends Component {
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
                data={data}
                cx={120}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
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
                  <tr key={position.groupholdingid}>
                    <td>{position.assetcode}</td>
                    <td>{this.formatPercentage(1)}</td>
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

export default PortfolioList;
