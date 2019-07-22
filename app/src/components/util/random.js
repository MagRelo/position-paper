import React, { useState, useEffect } from 'react';
import { Tab } from '@reach/tabs';

export function formatCurrency(input) {
  if (typeof input === 'number') {
    return input.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  if (typeof input === 'string') {
    const asNumber = parseInt(input, 10);
    return asNumber.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  // console.log('bad input to formatCurrency:', input);
  return '';
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
    [value]
  );

  return debouncedValue;
}

export function CoolTab(props) {
  // `isSelected` comes from `TabList` cloning the `CoolTab`.
  const { isSelected, children } = props;

  // make sure to forward *all* props received from TabList
  return (
    <Tab
      {...props}
      style={{
        background: 'none',
        border: 'none',
        color: isSelected ? '#1c4e78' : 'gray',
        borderBottom: isSelected ? 'solid 1px #8096ab' : 'none',
        marginRight: '1em'
      }}
    >
      {children}
    </Tab>
  );
}

export function lineItem(label, value) {
  return (
    <p
      className="line-item"
      style={{ paddingRight: '0.5em', paddingLeft: '0.5em' }}
    >
      <span>{label}</span>
      <span className="line-item-filler" />
      <span>{value}</span>
    </p>
  );
}
