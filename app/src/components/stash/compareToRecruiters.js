import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import { useDebounce, formatCurrency } from 'components/random';

import BarChart from 'components/barChart';
// import LinkPayoutDisplayFixed from 'pages/link/linkDisplayBarFixed';

const opacity = 0.8;
const recruiterColor = `rgb(125,125,125, 0.6)`;

const employeeColor = `rgb(68,175,105, ${opacity})`;
const networkColor = `rgb(254,198,1, ${opacity})`;

const platformColor = `rgb(99,173,242, ${opacity})`;

function CostDisplayForm(props) {
  const [salaryRange, setSalaryRange] = useState({ min: 75000, max: 125000 });
  const debouncedRange = useDebounce(salaryRange, 333);

  const [networkBonus, setNetworkBonus] = useState({
    min: 100,
    max: 5000,
    value: 3000
  });
  const [targetBonus, setTargetBonus] = useState({
    min: 100,
    max: 5000,
    value: 3000
  });

  // Sync target and network with salary
  useEffect(() => {
    // network => 3.5%
    // set mix, max, default for network
    const networkShare = roundToNearest(salaryRange.min * 0.035, 250);
    setNetworkBonus({
      min: Math.round(networkShare - networkShare * 0.3),
      max: Math.round(networkShare + networkShare * 1.7),
      value: networkShare
    });

    // target => 6.5%
    // set mix, max, default for target
    const targetShare = roundToNearest(salaryRange.min * 0.065, 250);
    setTargetBonus({
      min: Math.round(targetShare - targetShare * 0.3),
      max: Math.round(targetShare + targetShare * 1.7),
      value: targetShare
    });
  }, [debouncedRange]);

  const [totalCost, setTotalCost] = useState({});
  // Sync total with target and network
  useEffect(() => {
    const subTotal = targetBonus.value + networkBonus.value;
    const platformFee = Math.round(subTotal * 0.1);
    const averageSalary = Math.round((salaryRange.min + salaryRange.max) / 2);
    const recruiterFee = roundToNearest(averageSalary * 0.2, 100);

    setTotalCost({
      targetBonus: targetBonus.value,
      networkBonus: networkBonus.value,
      subTotal: subTotal,
      recruiterFee: recruiterFee,
      platformFee: platformFee,
      total: subTotal + platformFee
    });
  }, [targetBonus, networkBonus]);

  return (
    <React.Fragment>
      <h2 className="section-header">
        Talent Relay vs. Traditional Recruiters
      </h2>
      <div className="row row-1-3">
        <div>
          <p>
            Talent Relay allows you to redirect your recruting budget to reward
            your employees, your customers, your friends & family – anyone that
            can help find the perfect candidate.
          </p>

          <p>
            Use the form below to see how much you can save by using Talent
            Relay:
          </p>
        </div>

        <div>
          <div className="feature-panel">
            <h3 className="section-header">Reward Your Team and Save Money</h3>

            <div className="row row-5-3">
              <form name="addJobForm" className="pure-form">
                <label htmlFor="text">Salary Range</label>
                <fieldset>
                  <div style={{ padding: '0 1em 0 0.5em', margin: '1em' }}>
                    <InputRange
                      name="salary"
                      step={2500}
                      maxValue={275000}
                      minValue={25000}
                      formatLabel={value => formatCurrency(value, true)}
                      value={salaryRange}
                      onChange={value => setSalaryRange(value)}
                    />
                  </div>
                </fieldset>

                <div className="feature-border">
                  <span className="feature-label">
                    Add Talent Relay Incentives
                  </span>

                  <label htmlFor="text">Employee Signing Bonus</label>
                  <fieldset>
                    <div className="employee" style={{ padding: '0 1em' }}>
                      <InputRange
                        name="targetBonus"
                        step={250}
                        minValue={targetBonus.min}
                        maxValue={targetBonus.max}
                        formatLabel={value => formatCurrency(value)}
                        value={targetBonus.value}
                        onChange={value =>
                          setTargetBonus({ ...targetBonus, value: value })
                        }
                      />
                    </div>
                  </fieldset>
                  <label htmlFor="text">Network Reward</label>
                  <fieldset>
                    <div className="network">
                      <div style={{ padding: '0 1em' }}>
                        <InputRange
                          name="networkBonus"
                          step={250}
                          minValue={networkBonus.min}
                          maxValue={networkBonus.max}
                          formatLabel={value => formatCurrency(value)}
                          value={networkBonus.value}
                          onChange={value =>
                            setNetworkBonus({ ...networkBonus, value: value })
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </form>

              <div style={{ fontSize: 'small', color: 'gray' }}>
                <BarChart
                  employeeCost={totalCost.targetBonus}
                  employeeColor={employeeColor}
                  networkCost={totalCost.networkBonus}
                  networkColor={networkColor}
                  platformCost={totalCost.platformFee}
                  platformColor={platformColor}
                  recruiterCost={totalCost.recruiterFee}
                  recruiterColor={recruiterColor}
                />
                <div style={{ padding: '0 1em' }}>
                  {lineItem(
                    'Recruiter Fee (20%)',
                    formatCurrency(totalCost.recruiterFee),
                    recruiterColor,
                    'rgb(136,136,136)'
                  )}

                  {lineItem(
                    'Employee Signing Bonus',
                    formatCurrency(totalCost.targetBonus),
                    employeeColor,
                    'rgb(46, 142, 80)'
                  )}
                  {lineItem(
                    'Network Reward',
                    formatCurrency(totalCost.networkBonus),
                    networkColor,
                    'rgb(212, 166, 0)'
                  )}
                  {lineItem(
                    'Platform Fee',
                    formatCurrency(totalCost.platformFee),
                    platformColor,
                    'rgb(70, 137, 199)'
                  )}

                  <div className="feature-savings">
                    <span>
                      Savings:{' '}
                      {formatCurrency(totalCost.recruiterFee - totalCost.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CostDisplayForm;

function roundToNearest(input, step) {
  return Math.round(input / step) * step;
}

function lineItem(label, value, color, bgColor) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr auto',
        gridGap: '1em',
        margin: '0.5em 0'
      }}
    >
      <span>
        <span
          style={{
            display: 'inline-block',
            background: color,
            border: `solid 1px ${bgColor}`,
            width: '17px',
            height: '17px',
            borderRadius: '50%'
          }}
        />
      </span>
      <span>{label}</span>
      <span className="line-item-filler" />
      <span>{value}</span>
    </div>
  );
}
