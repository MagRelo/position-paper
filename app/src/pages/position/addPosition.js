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

  // trade content
  const [direction, setDirection] = useState('long');
  const [length, setLength] = useState('1d');
  const [leverage, setLeverage] = useState('1x');

  // post content
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
    <div className="container">
      <div className="form-wrapper">
        <h1>Add a Position</h1>
        <form name="positionForm" onSubmit={submit}>
          <div className="panel position">
            <div className="mb-3"></div>
            <div className="trade-grid">
              {/* Direction */}
              <div id="direction">
                <label htmlFor="trade">Direction</label>
                <div id="direction-controls">
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
              </div>

              {/* Amount */}
              <div id="amount">
                <label htmlFor="trade">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  required
                  className="form-control"
                />
              </div>

              {/* Leverage */}
              <div id="leverage">
                <label htmlFor="amount">Leverage</label>
                <div id="leverage-controls">
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

              {/* Length */}
              <div id="length">
                <label htmlFor="trade">Length</label>

                <div id="length-controls">
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
              </div>
            </div>

            <hr />

            <div className="form-group">
              <label htmlFor="editor" className="sr-only">
                Post Content
              </label>
              <Editor
                name="editor"
                ref={refsEditor}
                editorState={editorState}
                onChange={setEditorState}
                sideButtons={[]}
                placeholder="Add content here! (highlight text to format)"
              />
            </div>
            <hr />
            <UserProfile displayUser={user} hideDescription={true} />
          </div>
          <div className="mb-3"></div>
          <button className="btn btn-theme">Post</button>
        </form>
      </div>
    </div>
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
