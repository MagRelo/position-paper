import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  ResponsiveContainer
} from 'recharts';

class HistoryChart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ width: ' 100%' }}>
        <ResponsiveContainer height={200}>
          <ComposedChart
            style={{ margin: 'auto' }}
            data={this.props.portfolioData}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis yAxisId="left" />
            <XAxis dataKey="interval" />

            <Tooltip />

            {this.props.portfolio.map((line, index) => {
              return (
                <Line
                  key={line.code}
                  yAxisId="left"
                  type="monotone"
                  dataKey={line.code}
                  stroke={this.props.colors[index]}
                />
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
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
)(HistoryChart);
