const initialState = {
  portfolioFactory: null,
  portfolio: null,
  simpleStorage: null,
  contractsReady: false,
  contractList: []
};

const AccountReducer = (state = initialState, action) => {
  if (action.type === 'CONTRACTS_INITIALIZED') {
    return Object.assign({}, state, action.payload);
  }

  return state;
};

export default AccountReducer;
