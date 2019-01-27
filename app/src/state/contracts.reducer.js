const initialState = {
  bouncerProxy: null,
  simpleStorage: null,
  contractsReady: false,
  contractList: []
};

const AccountReducer = (state = initialState, action) => {
  if (action.type === 'CONTRACTS_INITIALIZED') {
    return Object.assign({}, state, {
      bouncerProxy: action.payload.bouncerProxy,
      simpleStorage: action.payload.simpleStorage,
      contractsReady: action.payload.contractsReady,
      contractList: action.payload.contractList
    });
  }

  return state;
};

export default AccountReducer;