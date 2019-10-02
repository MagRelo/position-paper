const Twitter = require('twitter');

exports.getFriends = async function(userToken, userTokenSecret) {
  const client = new Twitter({
    consumer_key: process.env['TWITTER_CONSUMER_KEY'],
    consumer_secret: process.env['TWITTER_CONSUMER_SECRET'],
    access_token_key: userToken,
    access_token_secret: userTokenSecret
  });

  return await client.get('friends/list', {});
};

exports.postTweet = async function(userToken, userTokenSecret, message) {
  const client = new Twitter({
    consumer_key: process.env['TWITTER_CONSUMER_KEY'],
    consumer_secret: process.env['TWITTER_CONSUMER_SECRET'],
    access_token_key: userToken,
    access_token_secret: userTokenSecret
  });

  return await client.post('statuses/update', {
    status: message || "I'm on Talent Relay :)"
  });
};
