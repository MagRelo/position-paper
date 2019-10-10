import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import { useDebounce, formatCurrency } from 'components/util/random';

import BarChart from 'components/barChart';
// import LinkPayoutDisplayFixed from 'pages/link/linkDisplayBarFixed';

const opacity = 0.8;
const recruiterColor = `rgb(125,125,125, 0.6)`;

const employeeColor = `rgb(0,121,219, ${opacity})`;
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
  useEffect(
    () => {
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
    },
    [debouncedRange]
  );

  const [totalCost, setTotalCost] = useState({});
  // Sync total with target and network
  useEffect(
    () => {
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
    },
    [targetBonus, networkBonus]
  );

  return (
    <section>
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
          <div className="panel" style={{ padding: '0.1em 2em 2em' }}>
            <h3 className="section-header">
              Talent Relay vs. Traditional Recruiters
            </h3>

            <div className="row row-5-3">
              <form name="addJobForm" className="pure-form">
                <fieldset>
                  <label htmlFor="text">Employee Salary</label>
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

                {/* <h3 className="section-header">Set Network Incentives</h3> */}
                <fieldset className="employee">
                  <label htmlFor="text">Employee Signing Bonus</label>
                  <div style={{ padding: '0 1em' }}>
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

                <fieldset>
                  <div className="network">
                    <label htmlFor="text">Network Reward</label>
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
                <div style={{ padding: '0 2em' }}>
                  {lineItem(
                    'Employee Signing Bonus',
                    formatCurrency(totalCost.targetBonus),
                    employeeColor
                  )}
                  {lineItem(
                    'Network Reward',
                    formatCurrency(totalCost.networkBonus),
                    networkColor
                  )}
                  {lineItem(
                    'Platform Fee',
                    formatCurrency(totalCost.platformFee),
                    platformColor
                  )}

                  {lineItem(
                    'Recruiter Fee (20%)',
                    formatCurrency(totalCost.recruiterFee),
                    recruiterColor
                  )}

                  <div
                    style={{
                      borderTop: 'solid 1px #eee',
                      marginTop: '1em'
                    }}
                  >
                    <p
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gridGap: '1em',
                        margin: '0.5em 0'
                      }}
                    >
                      <span>Savings with Talent Relay</span>
                      <span className="line-item-filler" />
                      <span>
                        {formatCurrency(
                          totalCost.recruiterFee - totalCost.total
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CostDisplayForm;

function roundToNearest(input, step) {
  return Math.round(input / step) * step;
}

function lineItem(label, value, color) {
  return (
    <p
      style={{
        display: 'grid',
        gridTemplateColumns: '30px auto 1fr auto',
        gridGap: '1em',
        margin: '0.5em 0'
      }}
    >
      <span style={{ background: color }} />
      <span>{label}</span>
      <span className="line-item-filler" />
      <span>{value}</span>
    </p>
  );
}
