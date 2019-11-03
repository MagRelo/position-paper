import React, { useState, useEffect } from 'react';

function AboutPage(props) {
  const [data, setData] = useState({ user: [], alpha: [] });

  useEffect(() => {
    getData(data).then(data => {
      setData(data);
    });
  }, []);

  return (
    <section>
      <h1>Admin</h1>
      <h2>Users</h2>
      {data.user.map(user => {
        return (
          <p>
            {user.name} ({user.updatedAt})
          </p>
        );
      })}

      <h2>Alpha</h2>
      {data.alpha.map(alpha => {
        return (
          <p>
            {alpha.contactName}, {alpha.company} ({alpha.updatedAt})
          </p>
        );
      })}
    </section>
  );
}

export default AboutPage;

async function getData() {
  return await fetch('/api/admin').then(response => response.json());
}
