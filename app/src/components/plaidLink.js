import React from 'react';

const apiVersion = 'v2';
const clientName = 'Incentive Engine';
const env = 'sandbox';
const publicKey = '2b3f9221802f14178deef36cd7f168';

const products = ['auth', 'identity', 'transactions'];
const institution = null;

function PlaidLinkWrapper() {
  // const [loadingData, setLoadingData] = useState(true);
  // const [links, setLinks] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');

  // async function getData(searchTerm) {
  //   // prepare searchterm as safe url
  //   const response = await fetch('/api/search?' + searchTerm, {
  //     method: 'GET'
  //   });

  //   if (response.status === 200) {
  //     setLinks(await response.json());
  //     setLoadingData(false);
  //   } else {
  //     console.log('not found', response.status);
  //   }
  // }

  // useEffect(
  //   () => {
  //     getData(searchTerm);
  //   },
  //   [searchTerm]
  // );

  window.linkHandler = window.Plaid.create({
    apiVersion: apiVersion,
    clientName: clientName,
    env: env,
    key: publicKey,
    product: products,
    onExit: onExit,
    onEvent: onEvent,
    onSuccess: onSuccess
  });

  function onSuccess(info) {
    console.log('success', info);
  }

  function onEvent(event) {
    console.log('event:', event);
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
      Link Bank Account
    </button>
  );
}

export default PlaidLinkWrapper;
