import React, { useState, useEffect } from 'react';
// import { AuthContext } from 'App';

// import { Loading } from 'components/random';

function AboutPage(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);

    fetch(
      'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP'
    )
      .then((response) => response.json())
      .then((body) => {
        setLoading(false);
        setData(body);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default AboutPage;
