import React, { useState, useEffect } from 'react';

import { useDebounce, Bouncing } from 'components/random';
// import InputRange from 'react-input-range';
// const [targetRange, setTargetRange] = useState({ min: 0, max: 1000 });
// const [networkRange, setNetworkRange] = useState({ min: 0, max: 1000 });

function SearchJobForm({ submit }) {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);
  const [formDirty, setFormDirty] = useState('');

  // new search value and results
  useEffect(() => {
    // execute on parent with "submit" props
    submit(debouncedSearchText);

    setFormDirty(false);
  }, [debouncedSearchText]);

  // sync formDirty with input
  function handleSearchChanged(e) {
    if (e.target.value) {
      setFormDirty(true);
    }
    setSearchText(e.target.value);
  }

  return (
    <div className="search-form-wrapper">
      <form action="searchJob">
        {/* Filter */}
        <div className="input-group">
          <div className="input-group-prepend">
            <div
              className="input-group-text"
              style={{
                fontSize: 'smaller',
                border: 'none'
              }}
            >
              Search
            </div>
          </div>

          <label htmlFor="text" className="sr-only">
            Filter
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="type to filter"
            name="text"
            value={searchText}
            onChange={handleSearchChanged}
          />

          {formDirty ? (
            <span style={{ position: 'absolute', right: 0 }}>
              <Bouncing />
            </span>
          ) : null}
        </div>

        {/* Sliders */}
        {/* 
        <div>
          <div className="form-group">
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
          <div className="form-group">
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
          */}

        {/* Location Combobox */}
        {/* <div>
          <label htmlFor="text">Location</label>
          <input
            type="text"
            className="pure-input-1"
            placeholder="type to filter"
            name="text"
            onChange={updateQueryObject}
          />
        </div> */}

        {/* Skills Combobox */}
        {/* <div>
          <label htmlFor="text">Skills</label>
          <input
            type="text"
            className="pure-input-1"
            placeholder="type to filter"
            name="text"
            onChange={updateQueryObject}
          />
        </div> */}
      </form>
    </div>
  );
}

export default SearchJobForm;
