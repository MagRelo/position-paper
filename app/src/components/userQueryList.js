import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const positions = [
  {
    id: '1',
    title: 'Front-End Developer',
    bonus: '$2,500',
    views: 87,
    links: 12,
    depth: 0.24
  },
  {
    id: '2',
    title: 'Full-Stack Develper',
    bonus: '$5,500',
    views: 132,
    links: 17,
    depth: 0.65
  },
  {
    id: '3',
    title: 'Director of Sales',
    bonus: '$8,000',
    views: 23,
    links: 44,
    depth: 0.14
  }
];

class Inbox extends Component {
  state = { accounts: null, positions: positions };

  render() {
    return (
      <div>
        <span style={{ float: 'right', marginTop: '1em' }}>
          <Link to="/newposition" className="pure-button pure-button-primary">
            {' '}
            Add Position
          </Link>
        </span>
        <h2>My Positions</h2>

        {this.state.positions.map(position => {
          return (
            <div className="inbox-message" key={position.id}>
              <div>
                <span style={{ float: 'right' }}>{position.bonus}</span>

                <Link to={'/link/' + position.id}>
                  <h3>{position.title}</h3>
                </Link>

                <div className="row row-3">
                  <div>
                    <p>
                      Total Views:{' '}
                      <span style={{ float: 'right' }}>{position.views}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Active Links:{' '}
                      <span style={{ float: 'right' }}>{position.links}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Link Depth:{' '}
                      <span style={{ float: 'right' }}>{position.depth}</span>
                    </p>
                  </div>
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
