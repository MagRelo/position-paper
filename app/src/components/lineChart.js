import React, { useState, useEffect } from 'react';

import { VictoryTheme, VictoryChart, VictoryLine } from 'victory';

const testData = [
  { x: 0, y: 0 },
  { x: 1, y: -3 },
  { x: 2, y: 1 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 4 },
  { x: 6, y: 3 },
  { x: 7, y: 1 },
  { x: 8, y: 2 },
  { x: 9, y: 5 },
  { x: 10, y: 3 },
];

const testGlobal = [
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 6, y: 2 },
  { x: 7, y: 2 },
  { x: 8, y: 2 },
  { x: 9, y: 2 },
  { x: 10, y: 2 },
];

function LineChart(props) {
  const [data, setData] = useState(testData || []);

  // useEffect(() => {
  //   setLoading(true);

  //   fetch(
  //     'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP'
  //   )
  //     .then((response) => response.json())
  //     .then((body) => {
  //       setLoading(false);
  //       setData(body);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error.toString());
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      height={150}
      domainPadding={{ x: 0, y: 10 }}
      padding={{ top: 0, bottom: 0 }}
    >
      <VictoryLine
        data={data}
        interpolation="natural"
        style={{
          data: {
            stroke: '#c43a31',
            strokeWidth: 2,
          },
        }}
      />
      <VictoryLine
        data={testGlobal}
        interpolation="natural"
        style={{
          data: {
            stroke: '#dddddd',
            strokeWidth: 2,
          },
        }}
      />
    </VictoryChart>
  );
}

export default LineChart;
