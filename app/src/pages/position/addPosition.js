import React, { useContext, useState } from 'react';
import { navigate } from '@reach/router';
import { AuthContext } from 'App';

import { createEditorState, Editor } from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import 'medium-draft/lib/index.css';
import { convertToRaw } from 'draft-js';

import { UserProfile } from 'pages/account/userProfile';

function AddProp(props) {
  const { callApi, user } = useContext(AuthContext);

  // direction
  const [direction, setDirection] = useState('long');

  // length
  const [length, setLength] = useState('1d');

  // leverage
  const [leverage, setLeverage] = useState('1x');

  const [editorState, setEditorState] = useState(createEditorState());
  const refsEditor = React.createRef();

  async function submit(event) {
    event.preventDefault();

    // get form data
    const formObject = {
      rawState: convertToRaw(editorState.getCurrentContent()),
      renderedHtml: mediumDraftExporter(editorState.getCurrentContent()),
    };
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // send to server
    // console.log(formObject);
    await callApi('POST', 'api/props', formObject)
      .then(async (response) => {
        // success
        navigate('/position/' + response._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="container">
      <div className="form-wrapper">
        <form name="positionForm" onSubmit={submit}>
          <legend>Trade</legend>
          <div className="form-group grid grid-4">
            <div>
              <label htmlFor="trade">Direction</label>

              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="direction"
                    value="long"
                    checked={direction === 'long'}
                    onChange={(event) => {
                      setDirection(event.target.value);
                    }}
                  />
                  Long
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="direction"
                    value="short"
                    checked={direction === 'short'}
                    onChange={(event) => {
                      setDirection(event.target.value);
                    }}
                  />
                  Short
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="trade">Length</label>

              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="length"
                    value="1d"
                    checked={length === '1d'}
                    onChange={(event) => {
                      setLength(event.target.value);
                    }}
                  />
                  1d
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="length"
                    value="7d"
                    checked={length === '7d'}
                    onChange={(event) => {
                      setLength(event.target.value);
                    }}
                  />
                  7d
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="length"
                    value="14d"
                    checked={length === '14d'}
                    onChange={(event) => {
                      setLength(event.target.value);
                    }}
                  />
                  14d
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="length"
                    value="28d"
                    checked={length === '28d'}
                    onChange={(event) => {
                      setLength(event.target.value);
                    }}
                  />
                  28d
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="trade">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                required
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="amount">Leverage</label>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="leverage"
                    value="1x"
                    checked={leverage === '1x'}
                    onChange={(event) => {
                      setLeverage(event.target.value);
                    }}
                  />
                  1X
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="leverage"
                    value="2x"
                    checked={leverage === '2x'}
                    onChange={(event) => {
                      setLeverage(event.target.value);
                    }}
                  />
                  2X
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="leverage"
                    value="3x"
                    checked={leverage === '3x'}
                    onChange={(event) => {
                      setLeverage(event.target.value);
                    }}
                  />
                  3X
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    name="leverage"
                    value="5x"
                    checked={leverage === '5x'}
                    onChange={(event) => {
                      setLeverage(event.target.value);
                    }}
                  />
                  5X
                </label>
              </div>
            </div>
          </div>

          <hr />

          <legend>Content</legend>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location" className="sr-only">
              Post Content
            </label>
            <Editor
              ref={refsEditor}
              editorState={editorState}
              onChange={setEditorState}
              sideButtons={[]}
              placeholder="Add content here! (highlight text to format)"
            />
          </div>

          <hr />
          <UserProfile displayUser={user} hideDescription={true} />

          <hr />
          <button className="btn btn-theme">Post</button>
        </form>
      </div>
    </section>
  );
}

// function OraclePanel() {
//   return (
//     <div className="form-group">
//       <label htmlFor="trade">Oracle</label>
//       <select name="trade" className="custom-select mb-3">
//         <option value="long_eth_1x">Guy 1</option>
//         <option value="long_eth_2x">Other Guy</option>
//       </select>

//       <label htmlFor="amount">Amount</label>
//       <input type="number" name="amount" id="amount" className="form-control" />
//     </div>
//   );
// }

export default AddProp;
