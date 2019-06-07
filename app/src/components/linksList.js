import React, { Component } from 'react';
import { connect } from 'react-redux';

const links = [
  {
    id: '1',
    title: 'Front-End Developer',
    bonus: '$2,500',
    generation: 2,
    links: 12,
    depth: 0.24
  },
  {
    id: '2',
    title: 'Full-Stack Develper',
    bonus: '$5,500',
    generation: 6,
    links: 17,
    depth: 0.65
  },
  {
    id: '3',
    title: 'Director of Sales',
    bonus: '$8,000',
    generation: 1,
    links: 44,
    depth: 0.14
  }
];

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
                <h3>
                  <span style={{ float: 'right' }}>{link.bonus}</span>
                  {link.title}
                </h3>
                <span className="copy">Copy Link</span>
                <div className="row row-3">
                  <div>
                    <p>
                      Generation:{' '}
                      <span style={{ float: 'right' }}>{link.generation}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Child Links:{' '}
                      <span style={{ float: 'right' }}>{link.links}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Bonus:{' '}
                      <span style={{ float: 'right' }}>{link.bonus}</span>
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
