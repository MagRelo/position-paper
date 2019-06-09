import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { inherits } from 'util';

const links = [
  {
    id: '1',
    title: 'Front-End Developer',
    bonus: 2500,
    ev: 1200,
    distance: 2,
    links: 12,
    views: 27
  },
  {
    id: '2',
    title: 'Full-Stack Develper',
    bonus: 5500,
    ev: 2200,
    distance: 6,
    links: 17,
    views: 120
  },
  {
    id: '3',
    title: 'Director of Sales',
    bonus: 8000,
    ev: 2000,
    distance: 1,
    links: 44,
    views: 29
  }
];

function expectedValue(bonus, distance, links, views) {
  // console.log(bonus, distance, links, views);

  const distanceCoef = bonus / (distance + 1);
  const linksCoef = Math.max(1 + links / 1000, 1);
  const viewCoef = Math.max(1 + views / 1000, 1);
  // console.log(distanceCoef, linksCoef, viewCoef);

  return (
    Math.round(distanceCoef * linksCoef * viewCoef * 100) / 100
  ).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

class Inbox extends Component {
  state = { accounts: null, links: links };

  render() {
    return (
      <div>
        <h2>My Links</h2>

        {this.state.links.map(link => {
          return (
            <div className="inbox-message" key={link.id}>
              <div>
                <h3>{link.title}</h3>

                <div className="fact-box" style={{ textAlign: 'right' }}>
                  <p>
                    Bonus:{' '}
                    <span>
                      {link.bonus.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </span>
                  </p>
                  <p>
                    Distance: <span>{link.distance}</span>
                  </p>
                  <p>
                    Child Links: <span>{link.links}</span>
                  </p>
                  <p>
                    Page Views: <span>{link.views}</span>
                  </p>
                </div>
              </div>

              <p
                style={{
                  textAlign: 'right'
                }}
              >
                Expected Value:
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.17em',
                    color: '#12793d',
                    marginLeft: '0.5em'
                  }}
                >
                  {expectedValue(
                    link.bonus,
                    link.distance,
                    link.links,
                    link.views
                  )}
                </span>
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  fontSize: 'smaller'
                }}
              >
                <form className="pure-form">
                  <input
                    className="pure-input"
                    style={{ width: '100%' }}
                    type="text"
                    disabled
                    value={'https://link.servesa.io/' + link.id}
                  />
                </form>
                <div>
                  <button className="pure-button pure-button-primary">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
