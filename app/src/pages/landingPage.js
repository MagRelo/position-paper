import React from 'react';
// import { Link } from '@reach/router';

// import testimonialFace from 'images/face.png';

// hero
import FinishLine from 'images/undraw_finish_line.svg';

// How it works
import OnlineAd from 'images/undraw_get_job.svg';
import TeamChat from 'images/undraw_team_chat.svg';
import Destinations from 'images/undraw_destinations.svg';
// import Organizer from 'images/undraw_online_organizer.svg';

// Employers
import Runner from 'images/undraw_runner.svg';
import Friends from 'images/undraw_friends_online.svg';
// import StatusUpdate from 'images/undraw_status_update.svg';

import EmailForm from 'pages/emailForm';
// const EmailForm = '';

function LandingPage() {
  return (
    <React.Fragment>
      {/* HERO */}
      <section id="home" className="hero-container">
        {/* <div id="particles-js"></div> */}
        <div className="center-container">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="landing-image-container">
                  <img src={FinishLine} alt="" className="landing-image" />
                </div>
              </div>
              <div
                className="col-lg-6 col-md-12 md-mt-5 wow fadeInRight"
                data-wow-duration="2.5s"
              >
                <h5 className="title-theme-bg">Welcome To Talent Relay</h5>
                <h1 className="mb-4">
                  Hiring just got a lot easier (also cheaper, faster)
                </h1>

                <p className="lead mb-4">
                  Talent Relay <b>super-charges your talent search</b> by [how].
                  []... provide employers with a steady stream of{' '}
                  <b>high-quality, pre-screened candidates</b>.
                </p>

                <EmailForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        {/* QUOTE
        <section id="customers">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div
                  className="owl-carousel"
                  data-dots="false"
                  data-nav="true"
                  data-items="1"
                  data-autoplay="true"
                >
                  <div className="item">
                    <div className="testimonial style-2">
                      <div className="testimonial-img">
                        <img
                          style={{ width: '260px' }}
                          className="img-center"
                          src={testimonialFace}
                          alt="woman face"
                        />
                      </div>
                      <div className="testimonial-content">
                        <div className="testimonial-quote">
                          <i className="fas fa-quote-left"></i>
                        </div>
                        <p>
                          We use Talent Relay to include our employees in our
                          recruiting proceess, and it's been amazing. We never
                          would have found those candidates any other way.
                        </p>
                        <div className="testimonial-caption">
                          <h5>Candice Blous</h5>
                          <label>Founder of Party Time</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
         */}

        <h2 id="employers" style={{ textAlign: 'center' }}>
          Employers
        </h2>

        {/* NOTHING UPFRONT */}
        <section>
          <div className="container">
            <div className="grid grid-2 align-items-center">
              <div className="swap-order">
                <div className="landing-image-container">
                  <img
                    src={Runner}
                    alt=""
                    className="landing-image"
                    style={{ transform: 'RotateY(180deg)', maxWidth: '360px' }}
                  />
                </div>
              </div>

              <div>
                <div className="section-title">
                  <h2 className="title">
                    Pay <span>Nothing</span> up Front
                  </h2>
                </div>

                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Pay nothing until
                      you hire a candidate
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> We charge a
                      transparent flat-rate for new hires, just a fraction of
                      other services
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRE-SCREENING */}
        <section>
          <div className="container">
            <div className="grid grid-2 align-items-center">
              <div>
                <div className="landing-image-container">
                  <img src={TeamChat} alt="" className="landing-image" />
                </div>
              </div>

              <div>
                <div className="section-title">
                  <h2 className="title">
                    We <span>Pre-Screen</span> All Applications
                  </h2>
                  {/* <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div> */}
                  <p className="mb-0">
                    We use our innovative technology to find the candidates
                    talent that other search services can’t. We send you only
                    the best, most-qualified candidates.
                  </p>
                </div>
                <div className="row mb-4"></div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center' }}>
          <h2 id="how">How It Works</h2>
          <p>We redirect recruiting fees to the people that matter:</p>
        </div>

        {/* GET A JOB */}
        <section>
          <div className="container">
            <div className="grid grid-2 align-items-center">
              <div className="swap-order">
                <div className="landing-image-container">
                  <img src={OnlineAd} alt="" className="landing-image" />
                </div>
              </div>

              <div>
                <div className="section-title">
                  <h2 className="title">
                    Get Hired → <span>Get Paid</span>
                  </h2>
                </div>

                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Every job on
                      Talent Relay includes a <b>cash hiring bonus</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REFER A CANDIDATE */}
        <section>
          <div className="container">
            <div className="grid grid-2 align-items-center">
              <div>
                <div className="landing-image-container">
                  <img src={Friends} alt="" className="landing-image" />
                </div>
              </div>

              <div>
                <div className="section-title">
                  <h2 className="title">
                    Refer A Candidate → <span>Get Paid</span>
                  </h2>
                </div>
                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Every job on
                      Talent Relay includes a <b>cash referral bonus</b>
                    </li>

                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> We keep track of
                      the deal and deposit cash in your account when your
                      candiate is hired.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FIND RECRUITERS */}
        <section>
          <div className="container">
            <div className="grid grid-2 align-items-center">
              <div className="swap-order">
                <div className="landing-image-container">
                  <img src={Destinations} alt="" className="landing-image" />
                </div>
              </div>

              <div>
                <div className="section-title">
                  <h2 className="title">
                    Promote A Job → <span>Get Paid</span>
                  </h2>
                  {/* <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div> */}
                </div>
                <p>
                  We also keep track of the <b>chain of referrals </b>
                  so you can earn money by finding candidates OR referrers.
                  Share your links with friends, on social networks, on job
                  boards - anywhere! We make sure everyone gets a fair cut when
                  the candidate is hired.
                </p>

                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i>Great source of
                      revenue for meetups, blogs, newsletters...
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Onboard Employers 
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="section-title">
                  <h2 className="title">
                    Onboard Employers → <span>Get Paid</span>
                  </h2>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Fugiat nesciunt culpa architecto iure, eligendi blanditiis
                    dolorum accusamus a, ratione voluptatibus hic corrupti
                    deleniti odit enim explicabo voluptatum ipsam at
                    necessitatibus.
                  </p>
                </div>

                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> [Pay nothing until
                      after the employee has completed a 90-day trial period]
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> [Cost only a
                      fraction of other services: just 5% of the annual salary]
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 md-mt-5">
                <div className="landing-image-container">
                  <img src={Organizer} alt="" className="landing-image" />
                </div>
              </div>
            </div>
          </div>
        </section>
      */}

        {/* CTA - Employers... */}
        <section id="getstarted">
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-8 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h2 className="title">
                    Try <span>Talent Relay</span> today
                  </h2>
                </div>
                {/* 
                {activeSession ? (
                  <a className="btn btn-theme" href="/dashboard">
                    <span>Dashboard</span>
                  </a>
                ) : (
                  <a className="btn btn-theme" href="/login">
                    <span>Login</span>
                  </a>
                )} */}

                <EmailForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
