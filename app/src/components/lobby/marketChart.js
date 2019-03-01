import React, { Component } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  ResponsiveContainer
} from 'recharts';

class CurveChart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ width: ' 100%' }}>
        <ResponsiveContainer height={200}>
          <ComposedChart style={{ margin: 'auto' }} data={this.props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />

            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />

            <Tooltip />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="startingSupply"
              stroke="#103A52"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="targetSupply"
              stroke="#2f9edd"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="newPrice"
              stroke="#519548"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="targetPrice"
              stroke="#BEF202"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default CurveChart;
