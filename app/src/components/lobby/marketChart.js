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

const data = [
  { interval: '0', eth: 100, btc: 200 },
  { interval: '1', eth: 110, btc: 190 },
  { interval: '2', eth: 130, btc: 180 },
  { interval: '3', eth: 120, btc: 140 },
  { interval: '4', eth: 130, btc: 150 },
  { interval: '5', eth: 150, btc: 165 },
  { interval: '6', eth: 170, btc: 200 }
];

class CurveChart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ width: ' 100%' }}>
        <ResponsiveContainer height={200}>
          <ComposedChart style={{ margin: 'auto' }} data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis yAxisId="left" />
            <XAxis dataKey="interval" />

            <Tooltip />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="eth"
              stroke="#103A52"
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="btc"
              stroke="#2f9edd"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default CurveChart;
