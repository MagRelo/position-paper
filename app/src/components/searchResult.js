import React from 'react';
import { Link } from 'react-router-dom';
import { useTrail, animated } from 'react-spring';

import { formatCurrency, formatDate } from 'components/util/random';
import FollowButton from 'components/followButton';
import LinkButton from 'components/linkButton';
import ResponseButton from 'components/responseButton';

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
            type="Link"
            targetId={link._id}
            isFollowing={link.isFollowingLink}
            disabled={!userId || link.isLinkOwner || link.isQueryOwner}
          />
        </p>

        {/* Description 
        <p>{link.query.data.description}</p>
        */}

        <div className="row row-x-2">
          <p>Posted: {formatDate(link.createdAt)}</p>
          <p>
            Posted By: {link.postedBy}
            <FollowButton
              type="User"
              targetId={link.userId}
              isFollowing={link.isFollowingUser}
              disabled={!userId || userId === link.userId}
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
          disable={!userId || link.isLinkOwner || link.isQueryOwner}
          queryId={link.query._id}
          parentLink={link.linkId}
          label={`Promote: ${formatCurrency(link.promoteBonus)}`}
        />

        <ResponseButton
          queryId={link.query._id}
          linkId={link.linkId}
          payoff={link.respondBonus}
          disabled={!userId || link.isLinkOwner || link.isQueryOwner}
        />
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
