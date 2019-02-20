const initialState = {
  portfolio: [
    { value: { name: 'ETH', formFeild: 'currentAsset' }, label: 'ETH' }
  ],
  members: [],
  discuss: [],
  proposals: [
    {
      id: 1,
      quantity: 0.3,
      from: {
        name: 'ETH',
        messariLink: 'https://data.messari.io/api/v1/assets/btc/profile'
      },
      to: {
        name: 'BTC',
        messariLink: 'https://data.messari.io/api/v1/assets/eth/profile'
      }
    },
    {
      id: 2,
      quantity: 0.4,
      from: {
        name: 'BTC',
        messariLink: 'https://data.messari.io/api/v1/assets/btc/profile'
      },
      to: {
        name: 'ETH',
        messariLink: 'https://data.messari.io/api/v1/assets/eth/profile'
      }
    }
  ],
  availableAssets: [
    { value: { name: 'ETH', formFeild: 'newAsset' }, label: 'ETH' },
    { value: { name: 'EOS', formFeild: 'newAsset' }, label: 'EOS' }
  ],
  quantities: [
    { value: { number: 0.1, formFeild: 'quantity' }, label: '10%' },
    { value: { number: 0.2, formFeild: 'quantity' }, label: '20%' },
    { value: { number: 0.3, formFeild: 'quantity' }, label: '30%' },
    { value: { number: 0.4, formFeild: 'quantity' }, label: '40%' },
    { value: { number: 0.5, formFeild: 'quantity' }, label: '50%' },
    { value: { number: 0.6, formFeild: 'quantity' }, label: '60%' },
    { value: { number: 0.7, formFeild: 'quantity' }, label: '70%' },
    { value: { number: 0.8, formFeild: 'quantity' }, label: '80%' },
    { value: { number: 0.9, formFeild: 'quantity' }, label: '90%' }
  ]
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
