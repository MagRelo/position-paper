import React, { useState } from 'react';

import { VictoryTheme, VictoryChart, VictoryLine, VictoryArea } from 'victory';

const testData = [
  { x: 0, y: 1000 },
  { x: 1, y: 1200 },
  { x: 2, y: 1100 },
  { x: 3, y: 1250 },
  { x: 4, y: 1250 },
  { x: 5, y: 1280 },
  { x: 6, y: 1500 },
  { x: 7, y: 1400 },
  { x: 8, y: 2220 },
  { x: 9, y: 2150 },
  { x: 10, y: 2000 },
];

function buildLineData(average, length) {
  // console.log(average, stdDev, length);
  // const max = average + stdDev;
  // const min = average - stdDev;

  const data = Array.from({ length: length }, (item, index) => {
    return {
      x: index,
      y: average,
    };
  });

  // console.log(data);
  return data;
}

function buildAreaData(average, stdDev, length) {
  // console.log(average, stdDev, length);

  const max = average + stdDev;
  const min = average - stdDev;

  const data = Array.from({ length: length }, (item, index) => {
    return {
      x: index,
      y0: min,
      y: max,
    };
  });

  // console.log(data);
  return data;
}

function LineChart({ userData, stats }) {
  const [data] = useState(testData || []);
  const globalLine = buildLineData(stats.global_avg, data.length);
  const globalArea = buildAreaData(
    stats.global_avg,
    stats.global_StdDev,
    data.length
  );

  return (
    stats && (
      <VictoryChart
        theme={VictoryTheme.material}
        height={150}
        domainPadding={{ x: 0, y: 10 }}
        padding={{ top: 0, bottom: 0 }}
      >
        <VictoryArea
          data={globalArea}
          style={{
            data: {
              fill: '#dddddd',
              fillOpacity: 0.4,
            },
          }}
        />
        <VictoryLine
          data={globalLine}
          interpolation="natural"
          style={{
            data: {
              stroke: '#dddddd',
              strokeWidth: 2,
            },
          }}
        />
        <VictoryLine
          data={data}
          interpolation="natural"
          style={{
            data: {
              stroke: '#00b0ff',
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
    )
  );
}

export default LineChart;
