import React from 'react';
import { Link } from '@reach/router';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { IoMdPersonAdd } from 'react-icons/io';

import { ProfilePic } from 'components/random';

// hero
import FinishLine from 'images/undraw_finish_line.svg';

// How it works
import Friends from 'images/undraw_friends_online.svg';
import Destinations from 'images/undraw_destinations.svg';
import OnlineAd from 'images/undraw_online_ad_purple.svg';
import Organizer from 'images/undraw_online_organizer.svg';
// import TeamHang from 'images/undraw_team_chat.svg';
import TeamChat from 'images/undraw_team_chat.svg';

// Employers
import Runner from 'images/undraw_runner.svg';

// import EmailForm from 'pages/emailForm';
// const EmailForm = '';

function LandingPage() {
  return (
    <React.Fragment>
      {/* HERO */}
      <div id="home" className="hero-container">
        <div className="center-container">
          <div className="container">
            <div className="grid grid-2 align-items-center">
              <div className="swap-order">
                <div className="landing-image-container">
                  <img src={FinishLine} alt="" className="landing-image" />
                </div>
              </div>

              <div>
                <h5 className="title-theme-bg">Welcome To Talent Relay!</h5>

                <h1 className="mb-2">Build your personal Job Board</h1>

                <p className="lead mb-4">
                  Talent Relay <b>super-charges your talent search</b> by using
                  the wisdom of the crowd to deliver{' '}
                  <b>high-quality, pre-screened candidates</b>.
                </p>

                <a href="/#employers" className="btn btn-sm button-unstyled">
                  For Employers <FaAngleDown />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* QUOTE
        <div id="customers">
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
        </div>
        */}

        <section id="how" className="section-dark">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>

          <div className="container section-title">
            <h2>
              <span>How It Works</span>
            </h2>
            <p>
              <span>So Easy a Caveman Could Do It</span>
            </p>
          </div>

          <div className="container">
            <div className="grid grid-3">
              <div className="panel">
                <h4>Build Your Job Board</h4>
                <p>
                  Add jobs to your board with one click – every job on Talent
                  Relay includes a referral bonus
                </p>
              </div>
              <div className="panel">
                <h4>Share And Promote</h4>
                <p>
                  Share your job board anywhere – social media, in person, on
                  billboards...
                </p>
              </div>
              <div className="panel">
                <h4>Collect Your Bonus</h4>
                <p>
                  If the candidate responds through your job board we'll deposit
                  the bonus directly into your bank account.
                </p>
              </div>
            </div>
          </div>

          <div className="container section-cta">
            <Link to="/search" className="btn btn-theme">
              View Jobs <FaSearch />
            </Link>
          </div>
        </section>

        <section id="system">
          <div className="container section-title">
            <h2>A System Where Everyone Wins</h2>
            <p>Make Valuable Connections → Get Paid</p>
          </div>

          {/* GET A JOB */}
          <div>
            <div className="container">
              <div className="grid grid-2 landing-grid align-items-center">
                <div>
                  <div className="landing-image-container">
                    <img src={OnlineAd} alt="" className="landing-image" />
                  </div>
                </div>

                <div>
                  <div className="div-title">
                    <h3>
                      Get Hired → <span>Get Paid</span>
                    </h3>
                  </div>

                  <div className="mb-4">
                    <ul className="list-unstyled list-icon">
                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> Every job on
                        Talent Relay includes a <b>hiring bonus</b>
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i> Apply to jobs
                        with one-click – we'll make sure your application gets
                        in the right hands
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REFER A CANDIDATE */}
          <div>
            <div className="container">
              <div className="grid grid-2 landing-grid align-items-center">
                <div className="swap-order">
                  <div className="landing-image-container">
                    <img src={Friends} alt="" className="landing-image" />
                  </div>
                </div>

                <div>
                  <div className="div-title">
                    <h3>
                      Refer A Candidate → <span>Get Paid</span>
                    </h3>
                  </div>
                  <div className="mb-4">
                    <ul className="list-unstyled list-icon">
                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> Every job on
                        Talent Relay includes a <b>referral bonus</b>
                      </li>

                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> Great source of
                        revenue for meetups, blogs, newsletters...
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FIND RECRUITERS */}
          <div>
            <div className="container">
              <div className="grid grid-2 landing-grid align-items-center">
                <div>
                  <div className="landing-image-container">
                    <img src={Destinations} alt="" className="landing-image" />
                  </div>
                </div>

                <div>
                  <div className="div-title">
                    <h3>
                      Work Together → <span>Get Paid</span>
                    </h3>
                    {/* <div className="title-bdr">
                    <div className="left-bdr"></div>
                    <div className="right-bdr"></div>
                  </div> */}
                  </div>
                  <p>
                    We also keep track of the <b>chain of referrals </b>
                    so you can earn money by finding candidates OR referrers.
                    Share your links with friends, on social networks, on job
                    boards - anywhere! We make sure everyone gets a fair cut
                    when the candidate is hired.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ONBOARDING  */}
          <div>
            <div className="container">
              <div className="grid grid-2 landing-grid align-items-center">
                <div className="swap-order">
                  <div className="landing-image-container">
                    <img src={Organizer} alt="" className="landing-image" />
                  </div>
                </div>

                <div>
                  <div className="div-title">
                    <h3>
                      Onboard Employers & Candidates → <span>Get Paid</span>
                    </h3>
                  </div>

                  <div className="mb-4">
                    <ul className="list-unstyled list-icon">
                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> [Pay nothing
                        until after the employee has completed a 90-day trial
                        period]
                      </li>
                      <li className="mb-3">
                        <i className="fas fa-check-circle"></i> [Cost only a
                        fraction of other services: just 5% of the annual
                        salary]
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container section-cta">
            <p>Make Valuable Connections → Get Paid</p>
            <Link to="/search" className="btn btn-theme">
              Create Account <IoMdPersonAdd />
            </Link>
          </div>
        </section>

        <section id="featured" className="section-dark">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>

          <div className="container section-title">
            <h2>
              <span>Featured Job Boards</span>
            </h2>
            <p>
              <span>The Best of the Best</span>
            </p>
          </div>

          <div className="container">
            <div className="grid grid-3">
              <Link to="/jobs/Q1ANr0Ch3Uz5aMzVSu2dX">
                <div className="panel">
                  <div className="user-profile">
                    <ProfilePic
                      avatarUrl={
                        'https://pbs.twimg.com/profile_images/903343236252483584/qQw0KRkK_400x400.jpg'
                      }
                    />
                    <div className="user-info">
                      <div className="user-name">Girls Who Code</div>
                    </div>
                    <p>
                      Promoting @GirlsWhoCode in Howard County, MD. Helping
                      create a pipeline for girls in tech & eliminate
                      socioeconomic barriers for all.
                    </p>
                  </div>
                </div>
              </Link>
              <Link to="/jobs/Q1ANr0Ch3Uz5aMzVSu2dX">
                <div className="panel">
                  <div className="user-profile">
                    <ProfilePic
                      avatarUrl={
                        'https://pbs.twimg.com/profile_images/1109145060929490945/H1RmsjEu_400x400.png'
                      }
                    />
                    <div className="user-info">
                      <div className="user-name">
                        Electronic Freedom Foundation
                      </div>
                    </div>
                    <p>
                      We're the Electronic Frontier Foundation. We defend your
                      civil liberties in a digital world.
                    </p>
                  </div>
                </div>
              </Link>
              <Link to="/jobs/matt-lovan">
                <div className="panel">
                  <div className="user-profile">
                    <ProfilePic
                      avatarUrl={
                        'https://media-exp1.licdn.com/dms/image/C5603AQHJIhVzvDBreg/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=CSL-hY9MLRRQ4RMua94dtMXg2Fo4QzmPC9huRofhMjU'
                      }
                    />
                    <div className="user-info">
                      <div className="user-name">Matt Lovan</div>
                    </div>
                    <p>
                      We're the Electronic Frontier Foundation. We defend your
                      civil liberties in a digital world. We're the Electronic
                      Frontier Foundation. We defend your civil liberties in a
                      digital world.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Employers  */}
        <section id="employers">
          <div className="container">
            <div style={{ textAlign: 'center' }}>
              <h2>For Employers</h2>
              <p>Get Connected to the Best Candidates</p>
            </div>

            <div className="grid grid-2 landing-grid align-items-center">
              <div className="swap-order">
                <div className="landing-image-container">
                  <img
                    src={Runner}
                    alt=""
                    className="landing-image"
                    style={{
                      transform: 'RotateY(180deg)',
                      maxWidth: '300px'
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="div-title">
                  <h3>
                    Pay <span>Nothing</span> up Front
                  </h3>
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

            <div className="grid grid-2 landing-grid align-items-center">
              <div>
                <div className="landing-image-container">
                  <img src={TeamChat} alt="" className="landing-image" />
                </div>
              </div>

              <div>
                <div className="div-title">
                  <h3>Only the Best Candidates</h3>
                </div>
                <p className="mb-0">
                  We use our innovative technology to find the candidates talent
                  that other search services can’t. We send you only the best,
                  most-qualified candidates.
                </p>
              </div>
            </div>

            <div>
              <div className="container section-cta">
                <Link to="/employer-account" className="btn btn-theme">
                  Create Employer Account <IoMdPersonAdd />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;

// {/* <div className="landing-grid" id="getstarted">
// <EmailForm
//   source="connector"
//   caption={`We're launching soon – sign up now to save your spot in line!`}
//   buttonCaption={'Learn More'}
// />
// </div>  */}
