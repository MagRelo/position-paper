import React from 'react';

const apiVersion = 'v2';
const clientName = 'Incentive Engine';
const env = 'sandbox';

const publicKey = '2b3f9221802f14178deef36cd7f168';

const products = ['auth', 'transactions'];
const institution = null;

function PlaidLinkWrapper() {
  window.linkHandler = window.Plaid.create({
    apiVersion: apiVersion,
    clientName: clientName,
    env: env,
    key: publicKey,
    product: products,
    onExit: onExit,
    onSuccess: onSuccess
  });

  async function onSuccess(token) {
    console.log('success', token);

    let user;

    try {
      user = await sendPublicToken(token);
    } catch (error) {
      console.log(error);
    }

    console.log('user', user);
  }

  function onExit() {
    console.log('exit');
  }

  function handleOnClick(event) {
    if (window.linkHandler) {
      window.linkHandler.open(institution);
    }
  }

  return (
    <button className="pure-button pure-button-primary" onClick={handleOnClick}>
      Signup
    </button>
  );
}

export default PlaidLinkWrapper;

// const [loadingData, setLoadingData] = useState(true);
// const [links, setLinks] = useState([]);
// const [searchTerm, setSearchTerm] = useState('');

// useEffect(
//   () => {
//     getData(searchTerm);
//   },
//   [searchTerm]
// );

async function sendPublicToken(token) {
  // prepare searchterm as safe url
  const response = await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token
    })
  });

  if (response.status === 200) {
    const user = await response.json();
    return user;
  } else {
    console.log('signup error');
    throw Error(response.status);
  }
}
