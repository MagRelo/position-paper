import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Inbox extends Component {
  render() {
    return (
      <div>
        {this.props.queries.map(query => {
          return (
            <div className="inbox-message" key={query._id}>
              <div>
                <span style={{ float: 'right' }}>{query.bonus}</span>

                <Link to={'/query/' + query.links[0].linkId}>
                  <h3>{query.title}</h3>
                </Link>

                <div className="row row-3">
                  <div>
                    <p>Views: {query.views}</p>
                  </div>
                  <div>
                    <p>Links: {query.links.length}</p>
                  </div>
                  <div>
                    <p>Link Depth: {query.depth}</p>
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
