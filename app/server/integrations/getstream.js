const stream = require('getstream');

const UserModel = require('../models').UserModel;
const PositionModel = require('../models').PositionModel;

const apiKey = process.env.STREAM_API_KEY || 'hdm568bfbafw';
const apiKeySecret =
  process.env.STREAM_API_SECRET ||
  'egqcazdzd8ws8zue6srrvdbeypzfghxgm6hv99pbfgyzp5nauesb86qru69gjuxk';

// Instantiate a new client (server side)
const streamClient = stream.connect(apiKey, apiKeySecret);

exports.addUser = async function(user) {
  const newUser = await streamClient.feed('User', user._id.toString());
  await newUser.addActivity({
    actor: user._id,
    verb: 'addUser',
    object: user._id,
    time: user.createdAt,
  });
};

exports.addPosition = async function(user, position) {
  // Subscribe user to the position's feed
  const userFeed = await streamClient.feed('User', user._id);
  await userFeed.follow('Position', position._id, { limit: 0 });

  // Add to the position's feed
  const positionFeed = await streamClient.feed('Position', position._id);
  await positionFeed.addActivity({
    actor: user._id,
    verb: 'addPosition',
    object: position._id,
    time: position.createdAt,
  });
};

exports.follow = async function(userId, feedType, targetId) {
  // console.log(userId, feedType, targetId);

  // get user feed & follow target
  const userFeed = await streamClient.feed('User', userId);
  // await userFeed.follow(feedType, targetId, { limit: 0 });
  await userFeed.follow(feedType, targetId);

  // Add activity with target
  const timeStamp = new Date();
  return userFeed.addActivity({
    actor: userId,
    verb: `addFollow:${feedType}`,
    object: targetId,
    time: timeStamp,
    target: `${feedType}:${targetId}`,
  });
};

exports.unFollow = async function(userId, feedType, targetId) {
  // console.log(userId, feedType, targetId);
  const userFeed = await streamClient.feed('User', userId);
  return await userFeed.unfollow(feedType, targetId);
};

exports.getFeed = async function(feedType, id, userId) {
  const streamUser = await streamClient.feed(feedType, id);
  const userFeed = await streamUser.get({ limit: 15 });
  return await hydrateStreamFeed(userFeed.results, userId);
};

async function hydrateStreamFeed(inputArray = [], userId) {
  // create array of queries
  const queries = inputArray.map((item) => {
    // switch on type
    switch (item.verb) {
      case 'addUser':
        return UserModel.findOne({ _id: item.object })
          .lean()
          .then((data) => {
            item.data = data;
            return item;
          });

      case 'addPosition':
        return PositionModel.findOne({ _id: item.object })
          .populate('user')
          .lean()
          .then((data) => {
            item.data = data;
            return item;
          });

      case 'addFollow:User':
        return UserModel.findOne({ _id: item.object })
          .lean()
          .then((data) => {
            item.data = data;
            return item;
          });

      case 'addFollow:Position':
        return PositionModel.findOne({ _id: item.object })
          .populate('user')
          .lean()
          .then((data) => {
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
