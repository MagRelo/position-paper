import React, { useState, useEffect } from 'react';

// import { getBalance } from 'magic';

// import Img from 'react-image';
import { getBalance } from 'api/magic';
import { dydxGetBalance } from 'api/dydx';

import { Link } from '@reach/router';
// import { FaBuilding } from 'react-icons/fa';
// import { MdMyLocation, MdLocationOn } from 'react-icons/md';
// import { AiOutlineUser } from 'react-icons/ai';

var SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

function abbreviateNumber(number) {
  // what tier? (determines SI symbol)
  var tier = (Math.log10(number) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return number;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;

  // format number and add suffix
  return scaled + suffix;
}

export function formatNumber(input) {
  if (typeof input == 'undefined') {
    return '';
  }

  // type checks
  let inputNum = 0;
  if (typeof input === 'string') {
    inputNum = parseInt(input, 10);
  } else {
    inputNum = input;
  }

  return Math.round(inputNum);
}

export function formatCurrency(input, isShorthand) {
  if (typeof input == 'undefined') {
    return '';
  }
  // type checks
  let inputNum = 0;
  if (typeof input === 'string') {
    inputNum = parseInt(input, 10);
  } else {
    inputNum = input;
  }

  // output style
  if (isShorthand) {
    return '$' + abbreviateNumber(inputNum);
  } else {
    return inputNum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}

export function formatDate(input) {
  if (input instanceof Date) {
    return input.toLocaleDateString('en-US');
  } else {
    const date = new Date(input);
    return date.toLocaleDateString('en-US');
  }
}

// Our hook
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value, delay]
  );

  return debouncedValue;
}

export function usePromise(promiseOrFunction, defaultValue) {
  const [state, setState] = React.useState({
    value: defaultValue,
    error: null,
    isPending: true,
  });

  React.useEffect(() => {
    const promise =
      typeof promiseOrFunction === 'function'
        ? promiseOrFunction()
        : promiseOrFunction;

    let isSubscribed = true;
    promise
      .then((value) =>
        isSubscribed ? setState({ value, error: null, isPending: false }) : null
      )
      .catch((error) =>
        isSubscribed
          ? setState({ value: defaultValue, error: error, isPending: false })
          : null
      );

    return () => (isSubscribed = false);
  }, [promiseOrFunction, defaultValue]);

  const { value, error, isPending } = state;
  return [value, error, isPending];
}

export function Loading() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '1em',
      }}
    >
      <div className="lds-dual-ring"></div>
    </div>
  );
}

export function Bouncing() {
  return (
    <div style={{ textAlign: 'center', display: 'inline-block' }}>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed'; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
export function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      console.log('Async: Copying to clipboard was successful!');
    },
    function(err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}

export function getParams(location) {
  if (!location.search) {
    return '';
  }

  return getJsonFromUrl(location.search);
}

function getJsonFromUrl(search) {
  var query = search.substr(1);
  var result = {};
  query.split('&').forEach(function(part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

export const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        className: isCurrent ? 'nav-link active' : 'nav-link',
      };
    }}
  />
);

export function EthereumAccount({ user }) {
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setLoading(true);
    getBalance(user.publicAddress).then(({ network, balance }) => {
      setNetwork(network.name);
      setBalance(balance);
      setLoading(false);
    });
  }, [user.publicAddress]);

  return (
    <div>
      <div>
        <Link
          className="btn btn-sm btn-unstyled"
          style={{ float: 'right' }}
          to="/deposit"
        >
          Deposit
        </Link>
        <b>Ethereum</b>
        <div className="mb-3"></div>
      </div>

      {/* Balance */}
      <div className="line-item">
        <div>Balance</div>
        <div className="line-item-filler"></div>
        <div>
          {loading ? (
            <span>
              <Bouncing />
            </span>
          ) : (
            <span>{balance}Ξ</span>
          )}
        </div>
      </div>

      {/* Balance */}
      <div className="line-item">
        <div>Network</div>
        <div className="line-item-filler"></div>
        <div>
          {loading ? (
            <span>
              <Bouncing />
            </span>
          ) : (
            <span>{network}</span>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="line-item">
        <div>Address</div>
        <div className="line-item-filler"></div>
        <div>
          {user.publicAddress.substring(0, 10)}

          <button
            className="btn btn-sm btn-unstyled"
            style={{ marginLeft: '0.5rem' }}
            onClick={() => {
              copyTextToClipboard(user.publicAddress);
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export function DYdX({ user }) {
  const [loading, setLoading] = useState(false);

  const [weth, setWeth] = useState(0);
  const [dai, setDai] = useState(0);
  const [usdc, setUsdc] = useState(0);

  useEffect(() => {
    setLoading(true);
    dydxGetBalance().then(([weth, dai, usdc]) => {
      setWeth(weth);
      setDai(dai);
      setUsdc(usdc);

      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div>
        <Link
          className="btn btn-sm btn-unstyled"
          style={{ float: 'right' }}
          to="/dydx"
        >
          Manage
        </Link>
        <b>dYdX</b>
        <p className="small">
          Deposits held on dydx{' '}
          <a
            href="https://docs.dydx.exchange/#/protocol?id=interest"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            earn or pay interest
          </a>
        </p>
        <div className="mb-3"></div>
      </div>

      <div className="line-item">
        <div>{weth.name}</div>
        <div className="line-item-filler"></div>
        <div>
          {loading ? (
            <span>
              <Bouncing />
            </span>
          ) : (
            <span>{weth.eth}Ξ</span>
          )}
        </div>
      </div>
      <div className="line-item">
        <div>{dai.name}</div>
        <div className="line-item-filler"></div>

        <div>
          {loading ? (
            <span>
              <Bouncing />
            </span>
          ) : (
            <span>${dai.eth}</span>
          )}
        </div>
      </div>
      <div className="line-item">
        <div>{usdc.name}</div>
        <div className="line-item-filler"></div>
        <div>
          {loading ? (
            <span>
              <Bouncing />
            </span>
          ) : (
            <span>${usdc.eth}</span>
          )}
        </div>
      </div>
    </div>
  );
}
