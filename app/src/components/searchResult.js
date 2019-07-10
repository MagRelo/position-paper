import React from 'react';
import { Link } from 'react-router-dom';
import { useTrail, animated } from 'react-spring';

import { formatCurrency, formatDate } from 'components/util/random';
import FollowButton from 'components/followButton';
import LinkButton from 'components/linkButton';

function SearchResult(link, userId) {
  return (
    <div>
      <div
        className="panel"
        style={{
          background: 'white',
          boxShadow: '0px 1px 4px 0px rgba(87, 103, 115, 0.58)',
          paddingBottom: 0
        }}
      >
        {/* Title */}
        <p style={{ fontSize: '20px', marginTop: '0' }}>
          <span style={{ float: 'right', fontSize: 'smaller' }}>
            {formatCurrency(link.query.bonus)}
          </span>
          <Link to={'/link/' + link.linkId}> {link.query.title}</Link>
          <FollowButton
            type="Query"
            targetId={link.query._id}
            disable={!userId || link.user._id === userId}
          />
        </p>

        {/* Description */}
        <p>{link.query.data.description}</p>

        <div className="row row-x-2">
          <p>Posted: {formatDate(link.createdAt)}</p>
          <p>
            Posted By: {link.user.email}
            <FollowButton
              type="User"
              targetId={link.user._id}
              disable={!userId || link.user._id === userId}
            />
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: 'right',
          marginTop: '.76em'
        }}
      >
        <LinkButton
          disable={!userId || link.user._id === userId}
          queryId={link.query._id}
          parentLink={link.linkId}
          label={`Promote: ${formatCurrency(
            link.potentialPayoffs[link.generation + 1]
          )}`}
        />

        <button
          className="pure-button pure-button-primary"
          style={{ background: '#0fa51d' }}
        >
          Respond: {formatCurrency(link.payoffs[0])}
        </button>
      </div>
    </div>
  );
}

function Results(props) {
  const config = { mass: 5, tension: 2000, friction: 200 };
  const trail = useTrail(props.results.length, {
    config,
    opacity: 1,
    x: 0,
    height: 80,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <div className="row row-2">
      {trail.map(({ x, height, ...rest }, index) => {
        return (
          <animated.div
            key={index}
            style={{
              ...rest
            }}
          >
            {SearchResult(props.results[index], props.userId)}
          </animated.div>
        );
      })}
    </div>
  );
}

export default Results;
