const initialState = {
  portfolio: [],
  members: [],
  discuss: [],
  proposals: [],
  availableAssets: []
};

const AccountReducer = (state = initialState, action) => {
  if (action.type === 'LOBBY_CONNECTED') {
    return Object.assign({}, state, {
      accounts: action.payload.accounts,
      accountsReady: !!action.payload.accounts.length,
      balance: action.payload.balance
    });
  }

  if (action.type === 'LOBBY_UPDATE') {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === 'LOBBY_ERROR') {
    return Object.assign({}, state, action.payload);
  }

  return state;
};

export default AccountReducer;
