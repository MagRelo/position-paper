import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from 'components/util/random';

function CostBarChart({
  employeeCost,
  networkCost,
  platformCost,
  recruiterCost,
  recruiterColor,
  platformColor,
  networkColor,
  employeeColor
}) {
  const data = [
    {
      name: 'Talent Relay',
      recruiterCost: 0,
      networkCost: networkCost,
      employeeCost: employeeCost,
      platformCost: platformCost
    },
    {
      name: 'Recruiter Fee',
      recruiterCost: recruiterCost,
      networkCost: 0,
      employeeCost: 0
    }
  ];

  return (
    <BarChart
      width={275}
      height={225}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 0,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis
        tickFormatter={value => {
          return formatCurrency(value, true);
        }}
      />

      <Bar dataKey="recruiterCost" stackId="a" fill={recruiterColor} />
      <Bar dataKey="platformCost" stackId="a" fill={platformColor} />
      <Bar dataKey="networkCost" stackId="a" fill={networkColor} />
      <Bar dataKey="employeeCost" stackId="a" fill={employeeColor} />
    </BarChart>
  );
}

export default CostBarChart;
