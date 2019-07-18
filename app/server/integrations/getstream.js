const stream = require('getstream');

const UserModel = require('../models').UserModel;
const QueryModel = require('../models').QueryModel;
const LinkModel = require('../models').LinkModel;
const ResponseModel = require('../models').ResponseModel;

const apiKey = process.env.STREAM_API_KEY || 'hdm568bfbafw';
const apiKeySecret =
  process.env.STREAM_API_SECRET ||
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

exports.addQuery = async function(user, link) {
  // get 'Query' feed for link and add "addQuery" activity
  const linkFeed = await streamClient.feed('Link', link._id);
  await linkFeed.addActivity({
    actor: user._id,
    verb: 'addQuery',
    object: link._id,
    time: link.createdAt
  });

  // get 'User' feed for user and add "addQuery" activity
  const userFeed = await streamClient.feed('User', user._id);
  await userFeed.addActivity({
    actor: user._id,
    verb: 'addQuery',
    object: link._id,
    time: link.createdAt
  });

  // subscribe user to Query feed
  return userFeed.follow('Link', link._id);
};

exports.addLink = async function(user, link) {
  // get 'Query' feed for link and add "addLink" activity
  const linkFeed = await streamClient.feed('Link', link._id);
  await linkFeed.addActivity({
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

exports.addResponse = async function(user, link, response) {
  // get 'Query' feed for link and add "addLink" activity
  const linkFeed = await streamClient.feed('Link', link._id);
  await linkFeed.addActivity({
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

exports.follow = async function(userId, feedType, targetId) {
  console.log(userId, feedType, targetId);

  // Follow target
  const userFeed = await streamClient.feed('User', userId);
  await userFeed.follow(feedType, targetId, { limit: 0 });

  // Add activity with target
  const timeStamp = new Date();
  return await userFeed.addActivity({
    actor: userId,
    verb: `addFollow:${feedType}`,
    object: targetId,
    time: timeStamp,
    target: `${feedType}:${targetId}`
  });
};

exports.unFollow = async function(userId, feedType, targetId) {
  console.log(userId, feedType, targetId);
  const userFeed = await streamClient.feed(feedType, userId);
  return await userFeed.unfollow('Query', targetId);
};

exports.getFeed = async function(feedType, id) {
  const streamUser = await streamClient.feed(feedType, id);
  const userFeed = await streamUser.get({ limit: 15 });
  return await hydrateStreamFeed(userFeed.results);
};

async function hydrateStreamFeed(inputArray = []) {
  // create array of queries
  const queries = inputArray.map(item => {
    // switch on type
    switch (item.verb) {
      case 'addUser':
        return UserModel.findOne({ _id: item.object })
          .lean()
          .then(data => {
            item.data = data;
            return item;
          });

      case 'addQuery':
        return QueryModel.findOne({ _id: item.object })
          .populate('user')
          .lean()
          .then(data => {
            item.data = data;
            return item;
          });

      case 'addLink':
        return LinkModel.findOne({ _id: item.object })
          .populate('query')
          .lean()
          .then(data => {
            item.data = data;
            return item;
          });

      case 'addResponse':
        return ResponseModel.findOne({ _id: item.object })
          .populate('respondingUser')
          .lean()
          .then(data => {
            item.data = data;
            return item;
          });

      case 'addFollow:User':
        return UserModel.findOne({ _id: item.object })
          .lean()
          .then(data => {
            item.data = data;
            return item;
          });

      case 'addFollow:Query':
        return QueryModel.findOne({ _id: item.object })
          .lean()
          .then(data => {
            item.data = data;
            return item;
          });

      default:
        break;
    }

    return {};
  });

  // get data
  const dataItems = await Promise.all(queries);
  // console.log(dataItems);

  //

  return dataItems;
}
