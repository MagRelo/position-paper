const initialState = {
  group: {
    groupName: '',
    groupKey: ''
  },
  members: [],
  proposals: [],
  portfolio: [],
  chat: [],

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

  return state;
};

export default AccountReducer;
