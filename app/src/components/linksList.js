import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
  render() {
    return (
      <div>
        {this.props.links.map(link => {
          return (
            <div className="inbox-message" key={link._id}>
              <div>
                <span
                  style={{
                    float: 'right'
                  }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.17em',
                      color: '#12793d',
                      marginLeft: '0.5em'
                    }}
                  >
                    {expectedValue(
                      link.query.bonus,
                      link.generation,
                      link.children.length,
                      link.views
                    )}
                  </span>
                </span>
                <Link to={'/link/' + link.linkId}>
                  <h3>{link.query.title}</h3>
                </Link>

                <div className="row row-3">
                  <p>
                    Generation: <span>{link.generation}</span>
                  </p>
                  <p>
                    Child Links: <span>{link.children.length}</span>
                  </p>
                  <p>
                    Page Views: <span>{link.views}</span>
                  </p>
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
