import React, { useContext } from 'react';
import { AuthContext } from 'App';
// import { Link } from '@reach/router';

import testimonialFace from 'images/face.png';

// hero
import Hire from 'images/undraw_hire.svg';

// How it works
// import OnlineAd from 'images/undraw_get_job.svg';
// import Destinations from 'images/undraw_destinations.svg';
// import Organizer from 'images/undraw_online_organizer.svg';
// import Friends from 'images/undraw_friends_online.svg';

// Employers
import TeamChat from 'images/undraw_team_chat.svg';
import Runner from 'images/undraw_runner.svg';
import StatusUpdate from 'images/undraw_status_update.svg';

function LandingPage() {
  const { activeSession } = useContext(AuthContext);

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
                  <img src={Hire} alt="" className="landing-image" />
                </div>
              </div>
              <div
                className="col-lg-6 col-md-12 md-mt-5 wow fadeInRight"
                data-wow-duration="2.5s"
              >
                <h5 className="title-theme-bg">Welcome To Talent Relay</h5>
                <h1 className="mb-4">
                  Hire the best Engineering Team, <b>For Less</b>
                </h1>

                <p className="lead mb-4">
                  TalentRelay is the easiest way to hire the best Software
                  Developers, DevOps Engineers, and Engineering Leaders that
                  others cant
                </p>

                <a className="btn btn-theme" href="/employers#getstarted">
                  <span>Get Started</span>
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

        <section>
          <div className="container">
            <div className="grid grid-3">
              <div>
                <h3>Good People know Good People</h3>
                <p>Leverage engineering networks to find the best candidates</p>
              </div>
              <div>
                <h3> Hassle-free search</h3>
                <p>
                  Spend less time on recruiting and more time working on what
                  really matters for your business
                </p>
              </div>
              <div>
                <h3>Executive Search at a fraction of the cost</h3>
                <p>We use technology to bring down costs for our partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* NOTHING UPFRONT */}
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 md-mt-5">
                <div className="section-title">
                  <h2 className="title">[title]</h2>

                  <p className="mb-0">
                    We incentivize engineering networks to find the best
                    candidates, including active and passive candidates. [INSERT
                    FACT ON PASSIVE CANDIDATES>ACTIVE]
                  </p>
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

        {/* PRE-SCREENING */}
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
                  <h2 className="title">[title]</h2>
                  {/* <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div> */}
                  <p className="mb-0">
                    We use our innovative technology to find the best candidates
                    talent that other search services can’t. Then we deliver
                    them to that to you at a fraction of the price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVERYONE IS RECRUITER */}
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 md-mt-5">
                <div className="section-title">
                  <h2 className="title">[title]</h2>

                  <p className="mb-0">
                    Experience, interest, and culture fit? Tell us about what
                    you are looking for and we’ll identify and send the best
                    candidates your way.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="landing-image-container">
                  <img
                    src={StatusUpdate}
                    alt=""
                    className="landing-image"
                    style={{ transform: 'RotateY(180deg)', width: '360px' }}
                  />
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
                </div>

                {activeSession ? (
                  <a className="btn btn-theme" href="/dashboard">
                    <span>Dashboard</span>
                  </a>
                ) : (
                  <a className="btn btn-theme" href="/login">
                    <span>Login</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
