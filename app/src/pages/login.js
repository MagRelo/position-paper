import React from 'react';

// import LinkedInLogin from 'components/linkedinLogin';

import GoogleLogin from 'components/googleLogin';

// import { getParams } from 'components/random';

// import background from 'images/01.png';

function Login(props) {
  // const params = getParams(props.location);
  // const redirect = params.link ? '/link/' + params.link : '';

  // console.log(redirect);

  return (
    <React.Fragment>
      <section className="" data-bg-color="#d2f9fe">
        <div className="container">
          <div>
            <h1 className="title">Approved Users</h1>
            <p>
              Only users from pre-approved community groups can sign in at this
              time.
            </p>
            <GoogleLogin className="btn btn-theme">
              Sign In with Google
            </GoogleLogin>
          </div>

          <hr />

          <h2>Not Yet A User?</h2>
          <p>
            In order to protect the privacy of our users we only allow access by
            pre-approved community groups. If you are a representative of an
            eligible group (such as a school, church, library, etc.) and are
            able to coordinate care in your area please use the form below to
            get access.
          </p>

          <a href="/organizers" className="btn btn-theme btn-sm">
            Apply Now
          </a>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Login;
