import React from 'react';

function UserStream(props) {
  // const [token, setToken] = useState('');
  // const [bankLabel, setBankLabel] = useState('');
  // const [tokenData, setTokenData] = useState({});

  // function getToken(token, metaData) {
  //   const bankLabel =
  //     metaData.accounts[0].name + ' – ' + metaData.institution.name + ' ✔';
  //   setToken(token);
  //   setTokenData(tokenData);
  //   setBankLabel(bankLabel);

  //   console.log({ token, tokenData, bankLabel });
  // }

  return (
    <ul>
      {props.stream &&
        props.stream.map(item => {
          return <li key={item.id}>{item.verb}</li>;
        })}
    </ul>
  );
}

export default UserStream;
