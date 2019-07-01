const stream = require('getstream');

const apiKey = 'hdm568bfbafw';
const apiKeySecret =
  'egqcazdzd8ws8zue6srrvdbeypzfghxgm6hv99pbfgyzp5nauesb86qru69gjuxk';

// Instantiate a new client (server side)
const streamClient = stream.connect(
  apiKey,
  apiKeySecret
);

exports.addUser = async function(user) {
  const newUser = await streamClient.feed('User', user._id.toString());
  await newUser.addActivity({
    actor: user._id,
    verb: 'addUser',
    object: user._id,
    time: user.createdAt
  });
};

exports.getUser = async function(user) {
  const streamUser = await streamClient.feed('User', user._id.toString());
  return await streamUser.get({ limit: 15 });
};

exports.followUser = async function(user, userToFollowId) {
  // get stream 'User' feed for user
  const streamFeed = await streamClient.feed('User', user._id);

  // add follow
  return await streamFeed.follow('User', userToFollowId);
};

exports.addQuery = async function(user, query) {
  // get 'Query' feed for query and add "addQuery" activity
  const queryFeed = await streamClient.feed('Query', query._id);
  await queryFeed.addActivity({
    actor: user._id,
    verb: 'addQuery',
    object: query._id,
    time: query.createdAt
  });

  // get 'User' feed for user and add "addQuery" activity
  const userFeed = await streamClient.feed('User', user._id);
  await userFeed.addActivity({
    actor: user._id,
    verb: 'addQuery',
    object: query._id,
    time: query.createdAt
  });

  // subscribe user to Query feed
  return userFeed.follow('Query', query._id);
};

exports.addLink = async function(user, query, link) {
  // get 'Query' feed for query and add "addLink" activity
  const queryFeed = await streamClient.feed('Query', query._id);
  await queryFeed.addActivity({
    actor: user._id,
    verb: 'addLink',
    object: link._id,
    time: link.createdAt
  });

  // get 'User' feed for user and add "addLink" activity
  const userFeed = await streamClient.feed('User', user._id);
  return await userFeed.addActivity({
    actor: user._id,
    verb: 'addLink',
    object: link._id,
    time: link.createdAt
  });
};

exports.addResponse = async function(user, query, response) {
  // get 'Query' feed for query and add "addLink" activity
  const queryFeed = await streamClient.feed('Query', query._id);
  await queryFeed.addActivity({
    actor: user._id,
    verb: 'addResponse',
    object: response._id,
    time: response.createdAt
  });

  // get 'User' feed for user and add "addLink" activity
  const userFeed = await streamClient.feed('User', user._id);
  return await userFeed.addActivity({
    actor: user._id,
    verb: 'addResponse',
    object: response._id,
    time: response.createdAt
  });
};
