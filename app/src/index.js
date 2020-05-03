import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Component CSS
import 'react-input-range/lib/css/index.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';
// import 'react-google-places-autocomplete/dist/assets/index.css';

// Template CSS
import './css/bootstrap.min.css';
import './css/fontawesome-all.css';

// Site CSS
import './css/typography.scss';
import './css/app.scss';
import './css/header.scss';
import './css/loaders.scss';
import './css/stars.scss';

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

// import { loadWeb3 } from 'state/loadWeb3';
// loadWeb3();

ReactDOM.render(<App />, document.getElementById('root'));
