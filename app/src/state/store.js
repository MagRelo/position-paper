// import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';

import account from 'state/reducers/account.reducer';
// import web3 from 'state/reducers/web3.reducer';
// import contracts from 'state/reducers/contracts.reducer';
// import bounce from 'state/reducers/bounce.reducer';
// import lobby from 'state/reducers/lobby.reducer';

const reducer = combineReducers({
  account
});

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
