const initialState = {
  accountsReady: false,
  accounts: [],
  selectedAccount: '',
  balance: 0,
  forbidden: false,
  message: '',
  signature: '',
  duration: 0,
  expires: null
};

function normalizeAccount(input) {
  if (typeof input === 'string') {
    return input.toLocaleLowerCase();
  }
  return input;
}

const AccountReducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    return Object.assign({}, state, {
      accounts: action.payload.accounts,
      selectedAccount: normalizeAccount(action.payload.accounts[0]),
      accountsReady: !!action.payload.accounts.length,
      balance: action.payload.balance
    });
  }

  if (action.type === 'ACCOUNT_CHANGE') {
    return Object.assign({}, state, {
      selectedAccount: normalizeAccount(action.payload.currentAccount)
    });
  }

  if (action.type === 'ACCOUNT_LOGOUT') {
    return Object.assign({}, state, {
      accountsReady: false,
      selectedAccount: '',
      accounts: [],
      balance: 0
    });
  }

  // Sessions
  if (action.type === 'SESSION_LOAD') {
    return Object.assign({}, state, action.payload);
  }
  if (action.type === 'SESSION_CLEAR') {
    return Object.assign({}, state, {
      message: '',
      signature: '',
      duration: 0,
      expires: null
    });
  }
  if (action.type === 'SESSION_FORBIDDEN') {
    return Object.assign({}, state, {
      message: '',
      signature: '',
      duration: 0,
      expires: null,
      forbidden: true
    });
  }

  return state;
};

export default AccountReducer;
