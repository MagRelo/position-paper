const payments = require('../integrations/payments');
const getStream = require('../integrations/getstream');
const twitter = require('../integrations/twitter');
const sendgrid = require('../integrations/sendgrid');

const UserModel = require('../models').UserModel;
const LinkModel = require('../models').LinkModel;
const ResponseModel = require('../models').ResponseModel;
const PaymentModel = require('../models').PaymentModel;
const ShareModel = require('../models').ShareModel;

// get user
exports.populateUser = async function(req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.user.id }).select(
      'firstname lastname avatar jobBoardId stripeAccountLabel stripeCustomerLabel stripeCustomerBrand'
    );

    // get queries and links
    const userObject = {
      user: {
        _id: user._id,
        name: user.firstname + ' ' + user.lastname,
        email: user.email,
        avatar: user.avatar,
        jobBoardId: user.jobBoardId,

        hasAccount: !!user.stripeAccountLabel,
        stripeAccountLabel: user.stripeAccountLabel,

        hasPaymentSource: !!user.stripeCustomerLabel,
        stripeCustomerLabel: user.stripeCustomerLabel,
        stripeCustomerBrand: user.stripeCustomerBrand
      },
      follows: user.follows,
      links: [],
      responses: [],
      payments: []
    };

    userObject.links = await LinkModel.find({ user: req.user._id }).lean();

    userObject.payments = await PaymentModel.find({ user: req.user._id })
      .populate('link')
      .lean();
    userObject.responses = await ResponseModel.find({
      user: req.user._id
    })
      .populate('link')
      .lean();

    // get user
    userObject.stream = await getStream.getFeed(
      'User',
      req.user._id,
      req.user._id
    );

    res.status(200).send(userObject);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
};

exports.updateFollow = async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send();
  }

  // get id & intent from query string
  const intentToFollow = req.query.intent;
  const feedType = req.query.type;
  const targetId = req.query.target;

  // console.log('input: ', targetId, intentToFollow, feedType);

  // call getstream methods

  let getStreamResponse = '';
  try {
    if (intentToFollow) {
      // follow
      getStreamResponse = await getStream.follow(
        req.user._id,
        feedType,
        targetId
      );

      // add to user follow array
      await UserModel.update(
        { _id: req.user._id },
        { $push: { follows: targetId } }
      );
    } else {
      // unfollow
      getStreamResponse = await getStream.unFollow(
        req.user._id,
        feedType,
        targetId
      );

      // remove from user follow array
      await UserModel.update(
        { _id: req.user._id },
        { $pull: { follows: targetId } }
      );
    }

    res.status(200).send({ status: true });
  } catch (error) {
    console.log(getStreamResponse);
    res.status(500).send(error);
  }
};

exports.getUserFriends = async function(req, res) {
  try {
    // get twitter creds
    const user = await UserModel.findOne({ _id: req.user._id }).select(
      'twitterProvider'
    );
    const twitterCreds = user.twitterProvider;

    const friends = await twitter.getFriends(
      twitterCreds.token,
      twitterCreds.tokenSecret
    );
    return res.status(200).send(friends);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.sendTweet = async function(req, res) {
  const message = req.body.message;

  try {
    const link = await LinkModel.findOne({ linkId: req.body.linkId });

    // get twitter creds
    const user = await UserModel.findOne({ _id: req.user._id }).select(
      'twitterProvider'
    );
    const twitterCreds = user.twitterProvider;
    const tweet = await twitter.postTweet(
      twitterCreds.token,
      twitterCreds.tokenSecret,
      message
    );

    // save share
    const share = new ShareModel({
      link: link._id,
      user: req.user._id,
      type: 'tweet',
      data: tweet
    });
    await share.save();

    return res.status(200).send(share);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.sendEmail = async function(req, res) {
  try {
    const link = await LinkModel.findOne({ linkId: req.body.linkId });

    const response = await sendgrid.sendNewLink(req.user, req.body, link);

    // save share
    const share = new ShareModel({
      link: link._id,
      user: req.user._id,
      type: 'email',
      data: response
    });
    await share.save();

    return res.status(200).send(share);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// add bank account to stripe
exports.addAccount = async function(req, res) {
  const userData = req.body;

  try {
    // register with plaid
    const stripeAccount = await payments.createStripeAccount(userData, req.ip);

    // update user
    await UserModel.updateOne(
      { _id: req.user._id },
      {
        stripeAccount: stripeAccount,
        stripeAccountLabel: userData.bankAccountLabel
      }
    );

    // send user
    return res.status(200).send({ connected: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// add payment source/customer to stripe
exports.deleteAccountSource = async function(req, res) {
  try {
    const { stripeAccount } = await UserModel.findOne({
      _id: req.user.id
    }).select('stripeAccount');

    // remove payment source
    const { deleted } = await payments.deleteStripeAccountSource(
      stripeAccount.id,
      stripeAccount.external_accounts.data[0].id
    );
    if (!deleted) {
      throw new Error('Delete Source Error');
    }

    // update user
    await UserModel.updateOne(
      { _id: req.user._id },
      {
        stripeAccount: null,
        stripeAccountLabel: ''
      }
    );

    // send user
    return res.status(200).send({ connected: false, label: '', brand: '' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// add payment source/customer to stripe
exports.addCustomer = async function(req, res) {
  const userData = req.user;
  userData.token = req.body;

  // console.log(userData);

  try {
    // register with plaid
    const stripeCustomer = await payments.createStripeCustomer(userData);
    const label =
      stripeCustomer.sources.data[0].brand +
      ' – ' +
      stripeCustomer.sources.data[0].last4;
    const brand = stripeCustomer.sources.data[0].brand;
    // update user
    await UserModel.updateOne(
      { _id: req.user._id },
      {
        stripeCustomer: stripeCustomer,
        stripeCustomerLabel: label,
        stripeCustomerBrand: brand,
        stripeCustomerToken: stripeCustomer.sources.data[0].id
      }
    );

    // send user
    return res
      .status(200)
      .send({ connected: true, label: label, brand: brand });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// add payment source/customer to stripe
exports.deleteCustomerPaymentSource = async function(req, res) {
  try {
    const { stripeCustomer, stripeCustomerToken } = await UserModel.findOne({
      _id: req.user.id
    }).select('stripeCustomer stripeCustomerToken');

    // remove payment source
    const { deleted } = await payments.deleteCustomerPaymentSource(
      stripeCustomer.id,
      stripeCustomerToken
    );
    if (!deleted) {
      throw new Error('Delete Card Error');
    }

    // update user
    await UserModel.updateOne(
      { _id: req.user._id },
      {
        stripeCustomer: null,
        stripeCustomerLabel: '',
        stripeCustomerBrand: '',
        stripeCustomerToken: ''
      }
    );

    // send user
    return res.status(200).send({ connected: false, label: '', brand: '' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
