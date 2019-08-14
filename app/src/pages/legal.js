import React from 'react';

function LegalPage(props) {
  return (
    <section>
      <h1>Legal</h1>

      <h2>Documents</h2>
      <ul>
        <li>terms of service</li>
        <li>privacy policies</li>
        <li>terms and conditions of website use</li>
        <li>end user documents</li>
        <li>intra-customer and intra-user documents</li>
      </ul>

      <h2>Compliance</h2>
      <ul>
        <li>US Sanctions</li>
        <li>Plaid TOS</li>
        <li>Stripe TOS</li>
      </ul>
    </section>
  );
}

export default LegalPage;
