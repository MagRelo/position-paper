import React from 'react';

import LinkedInLogin from 'components/linkedinLogin';
import { getParams } from 'components/random';

import background from 'images/01.png';

function Login(props) {
  const params = getParams(props.location);
  const redirect = params.link ? '/link/' + params.link : '';

  console.log(redirect);

  return (
    <React.Fragment>
      <section className="" data-bg-color="#d2f9fe">
        <div
          className="page-title-pattern topBottom"
          data-bg-img={background}
        ></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12">
              <h1 className="title">
                <span>Login</span> with LinkedIn
              </h1>
              <p>We'll never post anything without your permission.</p>
              <LinkedInLogin redirect={redirect} />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Login;
