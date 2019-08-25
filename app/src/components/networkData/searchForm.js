import React, { useState } from 'react';

import InputRange from 'react-input-range';

function SearchJob(props) {
  // Our State
  const [queryObject, setQueryObject] = useState({});

  const [targetRange, setTargetRange] = useState({ min: 0, max: 100 });
  const [networkRange, setNetworkRange] = useState({ min: 0, max: 100 });

  function createElasticQuery(event) {
    event.preventDefault();

    console.log(queryObject);

    // execute search
    // props.submit(queryObject);
  }

  function updateQueryObject(event) {
    setQueryObject({ ...queryObject, [event.target.name]: event.target.value });
  }

  return (
    <form
      action="searchJob"
      className="pure-form"
      onSubmit={createElasticQuery}
    >
      <div className="row row-2">
        <div>
          <label htmlFor="text">Filter</label>
          <input
            type="text"
            className="pure-input-1"
            placeholder="type to filter"
            name="text"
            onChange={updateQueryObject}
          />
        </div>

        <div className="row row-2">
          <div>
            <label htmlFor="text">Network Bonus</label>
            <div style={{ padding: '0 1em 0 0.5em' }}>
              <InputRange
                maxValue={1000}
                minValue={0}
                formatLabel={value => `$${value}`}
                value={networkRange}
                onChange={value => setNetworkRange(value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="text">Target Bonus</label>
            <div style={{ padding: '0 1em 0 0.5em' }}>
              <InputRange
                style={{ padding: '0 1em' }}
                maxValue={1000}
                minValue={0}
                formatLabel={value => `$${value}`}
                value={targetRange}
                onChange={value => setTargetRange(value)}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="pure-button pure-button-primary">Search</button>
    </form>
  );
}

export default SearchJob;
