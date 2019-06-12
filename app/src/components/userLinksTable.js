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
      <table className="pure-table">
        <thead>
          <tr>
            <th>Query</th>
            <th>Payoff</th>
            <th>Child Links</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {this.props.links.map(link => {
            return (
              <tr key={link._id}>
                <td>
                  <Link to={'/link/' + link.linkId}>{link.query.title}</Link>
                </td>
                <td>
                  {expectedValue(
                    link.query.bonus,
                    link.generation,
                    link.children.length,
                    link.views
                  )}
                </td>
                <td>{link.children.length}</td>
                <td>{link.views}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
