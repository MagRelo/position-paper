import React from 'react';
// import Hire from 'images/undraw_hire.svg';
// import Success from 'images/undraw_success_factors.svg';
import FinishLine from 'images/undraw_finish_line.svg';
// import Party from 'images/undraw_celebration.svg';
// import Network from 'images/undraw_career_development.svg';

import OnlineAd from 'images/undraw_online_ad.svg';
import TeamChat from 'images/undraw_team_chat.svg';
import Destinations from 'images/undraw_destinations.svg';
import Organizer from 'images/undraw_online_organizer.svg';

import Runner from 'images/undraw_runner.svg';
import Friends from 'images/undraw_friends_online.svg';

function LandingPage() {
  return (
    <React.Fragment>
      {/* HERO */}
      <section id="home" className="hero-container">
        <div id="particles-js"></div>
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
                  Recruiting just got a lot easier. (also cheaper, faster)
                </h1>
                <p className="lead mb-4">
                  Talent Relay aligns everyone in your network in order to{' '}
                  <b>super-charge</b> your talent search. You're probably{' '}
                  <b>already connected</b> to your next great hire – you just
                  don't know it yet.
                </p>{' '}
                <a className="btn btn-theme" href="/#how">
                  <span>Learn More</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        {/* QUOTE */}
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
                          className="img-center"
                          src="images/testimonial/01.jpg"
                          alt=""
                        />
                      </div>
                      <div className="testimonial-content">
                        <div className="testimonial-quote">
                          <i className="fas fa-quote-left"></i>
                        </div>
                        <p>
                          We realized that there was a lot of money to be made.
                          It seems so obvious in retrospect...
                        </p>
                        <div className="testimonial-caption">
                          <h5>Matt Lovan</h5>
                          <label>Founder of Talent Relay</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center' }}>
          <h2 id="how">How does it Work?</h2>
          <p>We redirect recruiting fees to the people that matter:</p>
        </div>

        {/* GET A JOB */}
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="landing-image-container">
                  <img src={OnlineAd} alt="" className="landing-image" />
                </div>
              </div>

              <div className="col-lg-6 col-md-12 md-mt-5">
                <div className="section-title">
                  <h2 className="title">
                    Get a Job → <span>Get Paid</span>
                  </h2>
                  <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div>
                  <p className="mb-0">
                    The candidate is the most important person! Apply for any
                    job through Talent Relay and collect a nice bonus when
                    you're hired.
                  </p>
                </div>

                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Every job on
                      Talent Relay includes a cash bonus.
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
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="section-title">
                  <h2 className="title">
                    Refer a Candidate → <span>Get Paid</span>
                  </h2>
                  <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div>
                  <p className="mb-0">
                    [By using our innovative technology, we find the best
                    candidates talent that other search services can’t. Then we
                    deliver them to that to you at a fraction of the price.]
                  </p>
                </div>
                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Every job on
                      Talent Relay includes a referral bonus.
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Revenue source for
                      groups, blogs, newsletters
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 md-mt-5">
                <div className="landing-image-container">
                  <img src={Friends} alt="" className="landing-image" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FIND RECRUITERS */}
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="landing-image-container">
                  <img src={Destinations} alt="" className="landing-image" />
                </div>
              </div>

              <div className="col-lg-6 col-md-12 md-mt-5">
                <div className="section-title">
                  <h2 className="title">
                    Refer a Referrer → <span>Get Paid</span>
                  </h2>
                  {/* <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div> */}
                  <p className="mb-0">
                    We keep track of the <b>chain of referrals </b>
                    so you can let someone else do the work and split the bonus!
                    Share your link with friends, on social networks, on job
                    boards - anywhere! We make sure everyone gets a fair cut.
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
            </div>
          </div>
        </section>

        {/* Onboard Employers */}
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="section-title">
                  <h2 className="title">
                    Onboard Employers → <span>Get Paid</span>
                  </h2>
                  {/* <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div> */}
                  <p className="mb-0">
                    By using our innovative technology, we find the best
                    candidates talent that other search services can’t. Then we
                    deliver them to that to you at a fraction of the price.
                  </p>
                </div>

                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Pay nothing until
                      after the employee has completed a 90-day trial period
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Cost only a
                      fraction of other services: just 5% of the annual salary
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

        <h2 id="how" style={{ textAlign: 'center' }}>
          Employers
        </h2>

        {/* NOTHING UPFRONT */}
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 md-mt-5">
                <div className="section-title">
                  <h2 className="title">
                    Pay <span>Nothing</span> up Front
                  </h2>

                  <p className="mb-0">
                    [Experience, interest, and culture fit? Tell us about what
                    you are looking for and we’ll identify and send the best
                    candidates your way.]
                  </p>
                </div>

                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Pay nothing until
                      after the employee has completed a 90-day trial period
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Cost only a
                      fraction of other services: just 5% of the annual salary
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="landing-image-container">
                  <img
                    src={Runner}
                    alt=""
                    className="landing-image"
                    style={{ transform: 'RotateY(180deg)', width: '360px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activate Your Network */}
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="landing-image-container">
                  <img src={TeamChat} alt="" className="landing-image" />
                </div>
              </div>

              <div className="col-lg-6 col-md-12 md-mt-5">
                <div className="section-title">
                  <h2 className="title">
                    <span>Activate</span> your Existing Networks
                  </h2>
                  {/* <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div> */}
                  <p className="mb-0">
                    By using our innovative technology, we find the best
                    candidates talent that other search services can’t. Then we
                    deliver them to that to you at a fraction of the price.
                  </p>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <ul className="list-unstyled list-icon">
                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> It is a long
                        established
                      </li>
                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> Distinctively
                        innovation
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i> You need there
                        anything
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6 sm-mt-2">
                    <ul className="list-unstyled list-icon">
                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> The standard of
                        Sassaht
                      </li>
                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> Sassaht
                        Powerfull Template
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i> Recently desktop
                        publishing
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Employers... */}
        <section id="getstarted">
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-8 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h2 className="title">
                    Try <span>Talent Relay</span> today
                  </h2>

                  <p>
                    Get started for 1 Month free trial No Purchace required.
                  </p>
                </div>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-lg-8 col-md-10 ml-auto mr-auto">
                <div className="subscribe-form">
                  <form
                    id="mc-form"
                    className="group d-md-flex align-items-center"
                  >
                    <input
                      type="email"
                      name="EMAIL"
                      className="email"
                      id="mc-email"
                      placeholder="Enter Email Address"
                      required=""
                    />
                    <input
                      className="btn btn-theme"
                      type="submit"
                      name="subscribe"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
