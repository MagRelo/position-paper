import React from 'react';
import { Link } from '@reach/router';

import { GiHeartPlus } from 'react-icons/gi';
import { FaHandHoldingHeart, FaBars } from 'react-icons/fa';

function LandingPage() {
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container">
          <div className="mb-4"></div>
          <h1>Stronger Together</h1>
          <p>Help your community</p>
        </div>

        <div className="container">
          <div className="grid grid-2">
            <div className="panel text-center">
              <h2>
                Get Help <GiHeartPlus />
              </h2>
              <p>
                This form can be used to request help for{' '}
                <a href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications.html">
                  persons at risk for serious illness from COVID-19
                </a>
                .
              </p>

              <a href="/gethelp" className="btn btn-theme btn-sm">
                Get Help <GiHeartPlus />
              </a>
            </div>
            <div className="panel text-center">
              <h2>
                Give Help <FaHandHoldingHeart />
              </h2>
              <p>
                If you're not at high risk, please consider helping someone in
                your local community who is.
              </p>
              <a href="/givehelp" className="btn btn-theme btn-sm">
                Give Help <FaHandHoldingHeart />
              </a>
            </div>
          </div>
          <div className="mb-4"></div>
          <div className="panel">
            <h2>Community Organizations</h2>
            <p>
              In order to protect the privacy of our users we only work with
              approved community groups to coordinate volunteers. If you are a
              representative of an eligible group (such as a school, church,
              library, etc.) and are able to coordinate care in your area please
              use the form below to get involved.
            </p>

            <a href="/organizers" className="btn btn-theme btn-sm">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
