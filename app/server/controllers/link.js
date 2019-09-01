// const payments = require('../integrations/payments');
const getStream = require('../integrations/getstream');
const elasticSearch = require('../integrations/elasticsearch');
// const twitter = require('../integrations/twitter');
// const sendgrid = require('../integrations/sendgrid');

// const UserModel = require('../models').UserModel;
// const ResponseModel = require('../models').ResponseModel;
// const PaymentModel = require('../models').PaymentModel;
// const ShareModel = require('../models').ShareModel;

const LinkModel = require('../models').LinkModel;

exports.createQuery = async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }
  const query = req.body;

  try {
    // create link
    const newLink = new LinkModel({
      user: req.user._id,
      parentLink: null,
      isQueryOwner: true,
      generation: 0,
      target_bonus: query.target_bonus,
      network_bonus: query.network_bonus,
      title: query.title,
      type: query.type,
      data: query.data,
      payoffs: calcLinkPayouts(query.network_bonus, 0),
      potentialPayoffs: calcLinkPayouts(query.network_bonus, 1)
    });
    await newLink.save();

    // create getStream feed for user
    await getStream.addQuery(req.user, newLink._id);

    res.status(200).send(newLink);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
};

// get link by linkId
exports.getLink = async function(req, res) {
  try {
    // get link
    const link = await LinkModel.findOne({
      linkId: req.params.linkId
    })
      .populate('user')
      .populate({ path: 'children', populate: { path: 'user' } })
      .populate({ path: 'responses', populate: { path: 'user' } });
    if (!link) return res.status(404).send({ error: 'not found' });

    // public info
    let responseObj = {
      link: {
        _id: link._id,
        postedBy: link.user.email,
        linkId: link.linkId,
        userId: link.user._id,
        createdAt: link.createdAt,
        title: link.title,
        type: link.type,
        data: link.data,
        target_bonus: link.target_bonus,
        network_bonus: link.network_bonus,
        generation: link.generation,
        parentLink: link.parentLink,
        children: link.children,
        payoffs: link.payoffs,
        potentialPayoffs: link.potentialPayoffs
      }
    };

    if (!req.user) {
      responseObj.user = {
        _id: 0,
        isQueryOwner: false,
        isFollowingUser: false,
        isLinkOwner: false,
        isFollowingLink: false
      };

      return res.status(200).send(responseObj);
    }

    // display indicators
    const isFollowingLink =
      req.user && req.user.follows.indexOf(link._id.toString()) > -1;
    const isFollowingUser =
      req.user && req.user.follows.indexOf(link.user._id.toString()) > -1;
    const isLinkOwner = req.user._id.equals(link.user._id);

    // user
    responseObj.user = {
      _id: req.user._id,
      isFollowingUser: isFollowingUser,
      isLinkOwner: isLinkOwner,
      isFollowingLink: isFollowingLink
    };

    // traffic
    responseObj.traffic = await elasticSearch.getLinkTraffic(link._id);
    // activity
    responseObj.stream = await getStream.getFeed(
      'Link',
      link._id,
      req.user._id
    );
    // responses
    responseObj.responses = link.responses;

    res.status(200).send(responseObj);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// create link
exports.createChildLink = async function(req, res) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  try {
    // get parent link
    const parentLink = await LinkModel.findOne({
      linkId: req.body.parentLink
    });
    if (!parentLink) {
      return res.status(404).send({ error: 'parent link not found' });
    }

    // set up generation
    const thisGen = parentLink.generation + 1;
    const nextGen = parentLink.generation + 2;

    // add new link
    const newLink = new LinkModel({
      user: req.user._id,
      parentLink: parentLink._id,
      parents: [...parentLink.parents, parentLink._id],
      originLink: parentLink.originLink
        ? parentLink.originLink
        : parentLink._id,
      generation: thisGen,
      target_bonus: parentLink.target_bonus,
      network_bonus: parentLink.network_bonus,
      title: parentLink.title,
      type: parentLink.type,
      data: parentLink.data,
      payoffs: calcLinkPayouts(parentLink.network_bonus, thisGen),
      potentialPayoffs: calcLinkPayouts(parentLink.network_bonus, nextGen)
    });
    await newLink.save();

    // add child to to all parent's 'children' array &
    // set IsBuried = true to exclude parents from search
    await LinkModel.updateMany(
      { _id: { $in: [...parentLink.parents, parentLink._id] } },
      { $push: { children: newLink._id }, $set: { isBuried: true } },
      { multi: true }
    );

    // add getStream activity "AddLink"
    await getStream.addLink(req.user, newLink);

    res.status(200).send(newLink);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
};

// used when adding a link
function calcLinkPayouts(bonus, generation) {
  // take 10% of bonus per generation
  const shareBite = 0.1;
  let remaining = bonus;
  let payoffs = [];

  // insert generation zero ($0)
  payoffs.push(0);

  // each generation *after* the first one. not 0 OR 1 => gen-1 will get "remaining" below
  for (let i = 1; i < generation; i++) {
    const share = Math.round(bonus * shareBite * 10000) / 10000;
    payoffs[i] = share;
    remaining = remaining - share;
  }

  // insert remaining. not 0
  if (generation > 0) {
    payoffs.push(remaining);
  }

  return payoffs;
}
