import React from 'react';
import { Link } from '@reach/router';

import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { IoMdPersonAdd } from 'react-icons/io';
import { UserProfile } from 'components/random';

import LinkedInLogin from 'components/linkedinLogin';

// Hero
import FinishLine from 'images/undraw_finish_line.svg';

// How it works
import Friends from 'images/undraw_friends_online.svg';
import Destinations from 'images/undraw_destinations.svg';
import OnlineAd from 'images/undraw_online_ad_purple.svg';
import Organizer from 'images/undraw_online_organizer.svg';

// Employers
import Runner from 'images/undraw_runner.svg';
import TeamChat from 'images/undraw_team_chat.svg';

// Talent Relay is a platform where everyone can cooperate (and
// compete) to find & place the world's best candidates. Activate
// your network and refer a candidate to collect the recruiting
// bonus.

function LandingPage() {
  return (
    <React.Fragment>
      {/* HERO */}
      <div id="home" className="hero-container">
        <div className="container">
          <div className="grid grid-2 align-items-center">
            <div className="swap-order">
              <div className="landing-image-container">
                <img
                  width="400"
                  height="267"
                  src={FinishLine}
                  alt="race finish line"
                  className="landing-image"
                />
              </div>
            </div>

            <div>
              <h5 className="title-theme-bg">Welcome To Talent Relay!</h5>

              <h1 className="mb-2">
                Earn revenue for your community by helping them find great jobs
              </h1>

              <p className="lead mb-4">
                Talent Relay <b>pays the candidate *and* the community</b> when
                someone is hired. Plus it's <b>free</b> and <b>easy to use</b> :
                )
              </p>

              <a href="/#employers" className="btn btn-sm button-unstyled">
                For Employers <FaAngleDown />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Featured */}
        <section id="featured" className="section-dark">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>

          <div className="container section-title">
            <h2>
              <span>Featured Communities</span>
            </h2>
            <p>
              <span>Do Well By Doing Good</span>
            </p>
          </div>

          <div className="container">
            <div className="grid grid-3">
              <Link to="/board/performant-art">
                <div className="panel">
                  <UserProfile
                    user={{
                      displayName: 'Performant Art',
                      location: 'Earth',
                      avatar:
                        'https://pbs.twimg.com/profile_images/1170127480188895232/J5DonLtQ_bigger.jpg',
                      description: `Exploring the intersection of technology, commerce, community and more. Sign up for our weekly newletter at performantart.substack.com`
                    }}
                  />
                </div>
              </Link>

              <Link to="/board/matt-lovan">
                <div className="panel">
                  <UserProfile
                    user={{
                      displayName: 'Matt Lovan',
                      location: 'New York / Boise',
                      avatar:
                        'https://media-exp1.licdn.com/dms/image/C5603AQHJIhVzvDBreg/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=CSL-hY9MLRRQ4RMua94dtMXg2Fo4QzmPC9huRofhMjU',
                      description: `Hi, thanks for viewing my job board! I have 10 years of experience in web development, mostly in small start-ups. I know all of these companies personally and would be happy to introduce you - hit me up of you have any questions!`
                    }}
                  />
                </div>
              </Link>

              <Link to="/board/boise-public-library">
                <div className="panel">
                  <UserProfile
                    user={{
                      displayName: 'Boise Public Library',
                      location: 'Boise, ID',
                      avatar:
                        'https://pbs.twimg.com/profile_images/1082382072243675136/Plpr8efj_400x400.jpg',
                      description: `Enhance knowledge, realize creative potential, share ideas and stories.`
                    }}
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Community */}
        <section id="system">
          <div className="container section-title">
            <h2>Go Farther Together</h2>
            <p> Everyone Wins in Talent Relay </p>
          </div>

          {/* GET A JOB */}
          <div>
            <div className="container">
              <div className="grid grid-2 landing-grid align-items-center">
                <div>
                  <div className="landing-image-container">
                    <img
                      width="400"
                      height="267"
                      src={OnlineAd}
                      alt="online ad"
                      className="landing-image"
                    />
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
                    <img
                      width="400"
                      height="267"
                      src={Friends}
                      alt="group of friends"
                      className="landing-image"
                    />
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
                    <img
                      width="400"
                      height="267"
                      src={Destinations}
                      alt="map of destinations"
                      className="landing-image"
                    />
                  </div>
                </div>

                <div>
                  <div className="div-title">
                    <h3>
                      Work Together → <span>Get Paid</span>
                    </h3>
                  </div>
                  <p>
                    We also keep track of the <b>chain of referrals </b>
                    so you can earn money by finding candidates <b>OR</b>{' '}
                    sharing with other communities. Share your links with
                    friends, on social networks, at community events - anywhere!
                    We make sure everyone gets a fair cut when the candidate is
                    hired.
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
                    <img
                      width="400"
                      height="267"
                      src={Organizer}
                      alt="group organizer"
                      className="landing-image"
                    />
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
                        <i className="fas fa-check-circle"></i> Invite other
                        users to the platform and share in every bonus
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i> Every job board
                        includes unique invite links
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4"></div>

          <div className="container section-cta">
            <p>Activate Your Network</p>

            <LinkedInLogin className="btn btn-theme">
              Create Your Account <IoMdPersonAdd />
            </LinkedInLogin>
          </div>
        </section>

        {/* How It Works */}
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
              <div className="panel text-center">
                <h4>
                  <span className="badge">1</span>
                  Build Your Job Board
                </h4>
                <p>
                  Everyone on Talent Relay has a <b>personal job board</b> and
                  every job has a <b> cash referral bonus</b>. Add jobs to your
                  board with just one click!
                </p>
              </div>
              <div className="panel text-center">
                <h4>
                  <span className="badge">2</span>
                  Share And Promote
                </h4>
                <p>
                  Share your job board anywhere – social media, in person, in
                  newsletters, at community events, etc.
                </p>
              </div>
              <div className="panel text-center">
                <h4>
                  <span className="badge">3</span>
                  Collect Your Bonus
                </h4>
                <p>
                  If the candidate responds through your job board we'll deposit
                  the bonus directly into your bank account.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4"></div>

          <div className="container section-cta">
            <Link to="/search" className="btn btn-theme">
              Browse Jobs <FaSearch />
            </Link>
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
                    width="400"
                    height="267"
                    src={Runner}
                    alt="runner"
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
                  <h3>Access to the world's best communities</h3>
                </div>

                <div className="mb-4">
                  <ul className="list-unstyled list-icon">
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Make a personal
                      connection
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Pay just a
                      fraction of the cost of other services
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle"></i> Redirect
                      recruiting fees directly to the candidate & their
                      community
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-2 landing-grid align-items-center">
              <div>
                <div className="landing-image-container">
                  <img
                    width="400"
                    height="267"
                    src={TeamChat}
                    alt="team"
                    className="landing-image"
                  />
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

            <div className="mb-4"></div>

            <div className="container section-cta">
              <LinkedInLogin className="btn btn-theme">
                Create Employer Account <IoMdPersonAdd />
              </LinkedInLogin>
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

// {/* QUOTE
//         <div id="customers">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12 col-md-12">
//                 <div
//                   className="owl-carousel"
//                   data-dots="false"
//                   data-nav="true"
//                   data-items="1"
//                   data-autoplay="true"
//                 >
//                   <div className="item">
//                     <div className="testimonial style-2">
//                       <div className="testimonial-img">
//                         <img style={{width: '400px', height: '267px'}}
//                           style={{ width: '260px' }}
//                           className="img-center"
//                           src={testimonialFace}
//                           alt="woman face"
//                         />
//                       </div>
//                       <div className="testimonial-content">
//                         <div className="testimonial-quote">
//                           <i className="fas fa-quote-left"></i>
//                         </div>
//                         <p>
//                           We use Talent Relay to include our employees in our
//                           recruiting proceess, and it's been amazing. We never
//                           would have found those candidates any other way.
//                         </p>
//                         <div className="testimonial-caption">
//                           <h5>Candice Blous</h5>
//                           <label>Founder of Party Time</label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         */}
