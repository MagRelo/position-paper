const initialState = {
  group: {
    groupName: '',
    groupKey: ''
  },
  members: [],
  proposals: [],
  chat: [],
  colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],

  portfolio: [
    { code: 'eth', pct: 0.5, value: 1000, name: 'ETH' },
    { code: 'btc', pct: 0.15, value: 300, name: 'btc' },
    { code: 'dgx', pct: 0.2, value: 200, name: 'dgx' },
    { code: 'foam', pct: 0.25, value: 500, name: 'foam' }
  ],
  portfolioData: [
    { interval: '0', eth: 100, btc: 200, dgx: 110, foam: 90 },
    { interval: '1', eth: 110, btc: 190, dgx: 130, foam: 95 },
    { interval: '2', eth: 130, btc: 180, dgx: 150, foam: 85 },
    { interval: '3', eth: 120, btc: 140, dgx: 140, foam: 75 },
    { interval: '4', eth: 130, btc: 150, dgx: 170, foam: 100 },
    { interval: '5', eth: 150, btc: 165, dgx: 185, foam: 150 },
    { interval: '6', eth: 170, btc: 200, dgx: 200, foam: 165 }
  ],

  portfolioContract: null,

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
  if (action.type === 'LOBBY_UPDATE') {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === 'LOBBY_ERROR') {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === 'LOAD_PORTFOLIO_CONTRACT') {
    return Object.assign({}, state, action.payload);
  }

  return state;
};

export default AccountReducer;
