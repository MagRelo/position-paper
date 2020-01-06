const payments = require('../integrations/payments');
const getStream = require('../integrations/getstream');

const UserModel = require('../models').UserModel;
const LinkModel = require('../models').LinkModel;
const ResponseModel = require('../models').ResponseModel;
const PaymentModel = require('../models').PaymentModel;

exports.createResponse = async function(req, res) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  // validate input
  if (!req.body.linkId) {
    return res.status(400).send({ error: 'must set link id' });
  }

  try {
    // get link
    const link = await LinkModel.findOne({ linkId: req.body.linkId })
      .populate({
        path: 'user'
      })
      .populate({
        path: 'parents',
        populate: { path: 'user' }
      });
    if (!link) {
      return res.status(404).send({ error: 'link not found' });
    }

    // add new response
    const newResponse = new ResponseModel({
      link: link._id,
      originLink: link.originLink || link._id,
      target_bonus: link.target_bonus,
      targetPayouts: [
        {
          _id: req.user._id,
          email: req.user.name,
          amount: link.target_bonus,
          linkId: link._id
        }
      ],
      network_bonus: link.network_bonus,
      networkPayouts: createPayoutArray(link, link.parents),
      user: req.user._id,
      message: req.body.message
    });
    await newResponse.save();

    if (link.originLink) {
      // add response to gen-0 link
      await LinkModel.updateOne(
        { _id: { $in: link.parents }, generation: 0 },
        { $push: { responses: newResponse._id } }
      );
    } else {
      // this is origin, update origin
      await LinkModel.updateOne(
        { _id: link._id },
        { $push: { responses: newResponse._id } }
      );
    }

    // add getStream activity "addResponse"
    await getStream.addResponse(req.user, link, newResponse);

    res.status(200).send(newResponse);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
};

exports.closeResponse = async function(req, res) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  // validate input
  if (!req.params.responseId) {
    return res.status(400).send({ error: 'must set responseId' });
  }

  try {
    // get response
    const response = await ResponseModel.findOne({
      _id: req.params.responseId
    })
      .populate({
        path: 'user'
      })
      .populate({
        path: 'link',
        populate: { path: 'user' }
      })
      .populate({
        path: 'parents',
        populate: { path: 'user' }
      })
      .lean();

    // must have response
    if (!response) {
      return res
        .status(404)
        .send({ error: 'response not found: ' + req.params.responseId });
    }

    // auth - must be query owner
    // if (!req.user._id.equals(response.query.user._id)) {
    //   return res.status(401).send();
    // }

    // make stripe payment from principal
    const paymentResponse = await payments.createStripeCharge(
      req.body.tokenData,
      req.body.amount_in_cents,
      response._id.toString()
    );

    // create payment record
    await createPayment(
      response.link._id,
      req.user._id,
      response._id,
      req.body.amount_in_cents * -1,
      paymentResponse,
      'closed'
    );

    // update response with payment detail
    await ResponseModel.updateOne(
      { _id: response._id },
      { payment: paymentResponse, status: 'closed' }
    );

    // update links to 'closed' status
    await LinkModel.updateMany(
      { _id: { $in: [...response.link.parents, response.link._id] } },
      { status: 'closed' }
    );

    // create target payouts to users
    await Promise.all(
      response.targetPayouts.map(userPayout => {
        return createPayment(
          userPayout.linkId,
          userPayout._id,
          response._id,
          userPayout.amount * 100
        );
      })
    );

    // create network payouts to users
    await Promise.all(
      response.networkPayouts.map(userPayout => {
        return createPayment(
          userPayout.linkId,
          userPayout._id,
          response._id,
          userPayout.amount * 100
        );
      })
    );

    res.status(200).send(paymentResponse);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
};

// used when adding a response
function createPayoutArray(link, parents) {
  const payoutArray = [];
  parents.forEach(parent => {
    if (parent.generation > 0) {
      payoutArray.push({
        _id: parent.user._id,
        email: parent.user.name,
        amount: link.payoffs[parent.generation],
        linkId: link._id
      });
    }
  });

  // add link owner last
  if (link.generation > 0) {
    payoutArray.push({
      _id: link.user._id,
      email: link.user.name,
      amount: link.payoffs[link.generation],
      linkId: link._id
    });
  }

  return payoutArray;
}

// used when closing a response
async function createPayment(
  linkId,
  userId,
  responseId,
  amount_in_cents,
  stripeResponse,
  status
) {
  // create payment record
  const newPayment = new PaymentModel({
    link: linkId,
    user: userId,
    response: responseId,
    amount: amount_in_cents,
    stripeResponse: stripeResponse,
    status: status
  });
  return newPayment.save().then(paymentDoc => {
    return UserModel.updateOne(
      { _id: userId },
      { $push: { payments: paymentDoc._id } }
    );
  });
}

exports.getResponse = async function(req, res) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  // validate input
  if (!req.params.responseId) {
    return res.status(400).send({ error: 'must set responseId' });
  }

  try {
    // get response
    const response = await ResponseModel.findOne({
      _id: req.params.responseId
    })
      .populate({
        path: 'link',
        populate: { path: 'user' }
      })
      .populate({
        path: 'originLink',
        populate: { path: 'user' }
      })
      .populate({
        path: 'user',
        select: 'name email avatar'
      })
      .lean();
    if (!response) {
      return res
        .status(404)
        .send({ error: 'response not found: ' + req.params.responseId });
    }

    // display indicators
    if (response.originLink) {
      // this is a secondary link
      response.user.isQueryOwner = req.user._id.equals(
        response.originLink.user._id
      );
    } else {
      // this is a primary link
      response.user.isQueryOwner = req.user._id.equals(response.link.user._id);
    }

    response.user.isParent = response.parents.some(parent => {
      return req.user._id.equals(parent);
    });
    response.user.isResponseOwner = req.user._id.equals(response.user._id);

    // const isLinkOwner = req.user._id.equals(response.link._id);
    // response.user.isLinkOwner = isLinkOwner;

    res.status(200).send(response);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
};
