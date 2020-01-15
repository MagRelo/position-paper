import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import InputRange from 'react-input-range';

import { createEditorState, Editor } from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import 'medium-draft/lib/index.css';
import { convertToRaw } from 'draft-js';

import { useDebounce, formatCurrency } from 'components/random';

function roundToNearest(input, step) {
  return Math.round(input / step) * step;
}

function JobForm(props) {
  // console.log(props);

  // form status
  const [isEditing] = useState(props.isEditing || false);
  const [linkId] = useState(props.linkId);

  const [jobTitle, setJobTitle] = useState('');
  const [employer, setEmployer] = useState('');
  const [location, setLocation] = useState('');

  // const [description, setDescription] = useState('');

  const [salaryRange, setSalaryRange] = useState({ min: 75000, max: 125000 });
  const debouncedRange = useDebounce(salaryRange, 333);
  const [totalBonus, setTotalBonus] = useState(0);

  const [editorState, setEditorState] = useState(createEditorState());
  const refsEditor = React.createRef();

  useEffect(() => {
    if (props.formData) {
      setJobTitle(props.formData.jobTitle);
      setEmployer(props.formData.employer);
      setLocation(props.formData.location);
      setSalaryRange(props.formData.salaryRange);

      // On save, if "rawState.entityMap" was empty object then MongoDb will drops the property key(?)
      // This hack makes sure the "entityMap" property exists on the rawState object
      const rawStateHack = props.formData.rawState;
      rawStateHack.entityMap = rawStateHack.entityMap
        ? rawStateHack.entityMap
        : {};
      setEditorState(createEditorState(props.formData.rawState));
    }
  }, [props.formData]);

  // Sync networkBonus with salary
  useEffect(() => {
    const salaryAverage = roundToNearest(
      (salaryRange.min + salaryRange.max) / 2,
      100
    );
    // network => 10% of salary
    setTotalBonus(roundToNearest(salaryAverage * 0.1, 100));
  }, [debouncedRange]);

  function submit(event) {
    event.preventDefault();

    // get and format form data
    var formObject = {
      editorState: editorState,
      rawState: convertToRaw(editorState.getCurrentContent()),
      renderedHtml: mediumDraftExporter(editorState.getCurrentContent()),
      salaryRange: salaryRange
    };

    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // send to server
    // console.log(formObject);
    try {
      submitJob(isEditing, formObject, linkId).then(link => {
        // redirect
        navigate('/link/' + link.linkId);
      });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="form-wrapper">
      <form name="addJobForm" onSubmit={submit}>
        <fieldset>
          <legend>{isEditing ? 'Edit Job' : 'Add Job'}</legend>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              required={true}
              className="form-control"
              value={jobTitle}
              onChange={e => {
                setJobTitle(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="employer">Employer</label>
            <input
              type="text"
              name="employer"
              required={true}
              className="form-control"
              value={employer}
              onChange={e => {
                setEmployer(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              required={true}
              className="form-control"
              value={location}
              onChange={e => {
                setLocation(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Description</label>
            <Editor
              ref={refsEditor}
              editorState={editorState}
              onChange={setEditorState}
              sideButtons={[]}
              placeholder="Add the job description here! (highlight text to format)"
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="text">Salary Range</label>
            <div style={{ padding: '0 1em 0 0.5em' }}>
              <InputRange
                name="salary"
                step={2500}
                maxValue={275000}
                minValue={25000}
                formatLabel={value => formatCurrency(value, true)}
                value={salaryRange}
                onChange={value => setSalaryRange(value)}
                disabled={isEditing}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="network_bonus">Network Bonus</label>
            <input
              type="text"
              name="network_bonus"
              disabled={true}
              className="form-control"
              value={formatCurrency(totalBonus)}
            />
          </div>
        </fieldset>

        {isEditing ? (
          <div className="form-group">
            <label htmlFor="status">Change Status</label>
            <select className="form-control" id="status" name="status">
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        ) : null}

        <hr />
        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-theme" type="submit">
            {isEditing ? 'Save' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;

async function submitJob(isEditing, queryData, linkId) {
  const endPoint = isEditing ? '/api/query/update/' + linkId : '/api/query/add';
  const method = isEditing ? 'PUT' : 'POST';

  return fetch(endPoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(queryData)
  }).then(response => response.json());
}
