import React from 'react';
// import { Link } from '@reach/router';

import Scooter from 'images/undraw_on_the_way_ldaq.svg';

import { GiHeartPlus } from 'react-icons/gi';
import { FaHandHoldingHeart } from 'react-icons/fa';

function LandingPage() {
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container">
          <div className="mb-4"></div>

          <div className="hero-grid">
            <div className="swap-order">
              <img className="hero-pic" src={Scooter} alt="doctors" />
            </div>

            <div className="title-container">
              <div>
                <span className="title-theme-bg">
                  Welcome to Local&#8201;Connect!
                </span>
              </div>
              <h1>Help is on the Way!</h1>
              <p>
                Many people are in need of help during the COVID-19 pandemic &
                many others are looking to help. We work with local
                organizations to connect volunteers with those in need.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mb-4"></div>
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
              In order to protect the safety & privacy of vulnerable persons we
              rely on approved community groups to coordinate local volunteers.
              If you are a representative of an eligible group (such as a
              government agency, school, church, library, etc.) and are able to
              coordinate volunteers in your area please click 'Register
              Organization' to get started.
            </p>

            <a href="/organizers" className="btn btn-theme btn-sm">
              Register Organization
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
