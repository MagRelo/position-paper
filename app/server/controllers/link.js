// const payments = require('../integrations/payments');
const getStream = require('../integrations/getstream');
const elasticSearch = require('../integrations/elasticsearch');

const ResponseModel = require('../models').ResponseModel;
const LinkModel = require('../models').LinkModel;

function roundToNearest(input, step) {
  return Math.round(input / step) * step;
}

function calcSplit(salaryMin, salaryMax) {
  // network bonus
  const salaryAverage = roundToNearest((salaryMin + salaryMax) / 2, 100);
  const totalBonus = roundToNearest(salaryAverage * 0.1, 100);
  const networkBonus = roundToNearest(totalBonus * 0.4, 100);
  const targetBonus = roundToNearest(totalBonus * 0.4, 100);

  return {
    salaryAverage,
    totalBonus,
    networkBonus,
    targetBonus
  };
}

exports.createQuery = async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }
  const jobData = req.body;
  // validate feilds

  // calc bonuses
  const { salaryAverage, totalBonus, networkBonus, targetBonus } = calcSplit(
    jobData.salaryRange.min,
    jobData.salaryRange.max
  );

  try {
    // create link
    const newLink = new LinkModel({
      user: req.user._id,
      parentLink: null,
      isQueryOwner: true,
      generation: 0,
      salaryRange: jobData.salaryRange,
      salaryAverage: salaryAverage,
      total_bonus: totalBonus,
      target_bonus: targetBonus,
      network_bonus: networkBonus,
      payoffs: calcLinkPayouts(networkBonus, 0),
      potentialPayoffs: calcLinkPayouts(networkBonus, 1),
      title: jobData.jobTitle,
      type: 'job',
      data: jobData
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

exports.updateQuery = async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }

  // get link or 404
  const link = await LinkModel.findOne({ linkId: req.params.linkId });
  if (!link) {
    return res.status(404).send();
  }

  // check owner, originDoc
  if (!req.user === link.user) {
    return res.status(401).send({ error: 'not owner' });
  }

  try {
    // neet to update originDoc & ALL children
    await LinkModel.updateMany(
      { $or: [{ _id: link._id }, { _id: { $in: link.children } }] },
      {
        $set: {
          title: req.body.jobTitle,
          data: req.body,
          status: req.body.status
        }
      }
    );

    // console.log(result);
    res.status(200).send(link);
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
      linkId: req.params.linkId,
      status: 'Active'
    })
      .populate('user')
      .populate({ path: 'originLink', populate: { path: 'user' } })
      .populate({ path: 'children', populate: { path: 'user' } });
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
        potentialPayoffs: link.potentialPayoffs,
        status: link.status
      }
    };

    if (!req.user) {
      responseObj.user = {
        _id: 0,
        isQueryOwner: false,
        isLinkOwner: false,
        hasApplied: false,
        isPromoting: false,
        isFollowingUser: false,
        isFollowingLink: false
      };

      return res.status(200).send(responseObj);
    }

    //
    // User is logged in
    //

    // user is following indicators
    const isFollowingLink =
      req.user.follows && req.user.follows.indexOf(link._id.toString()) > -1;
    const isFollowingUser =
      req.user.follows &&
      req.user.follows.indexOf(link.user._id.toString()) > -1;

    // user is owner indicators
    const isLinkOwner = req.user._id.equals(link.user._id);
    let isQueryOwner = false;
    if (link.originLink) {
      // this is a secondary link
      isQueryOwner = req.user._id.equals(link.originLink.user._id);
    } else {
      // this is a primary link
      isQueryOwner = req.user._id.equals(link.user._id);
    }

    // user is promoting
    const originLinkId = link.originLink ? link.originLink._id : link._id;
    const userPromoting = await LinkModel.findOne({
      user: req.user._id,
      parents: originLinkId
    });

    // user has applied
    const userResponse = await ResponseModel.findOne({
      user: req.user._id,
      $or: [{ link: originLinkId }, { originLink: originLinkId }]
    });

    const applyStatus = userResponse ? userResponse.status : '';
    const applySteps = [
      {
        status: 'Applied',
        label: 'Application Received',
        date: userResponse ? userResponse.applyDate : null
      },
      {
        status: 'Submitted',
        label: 'Sent To Employer',
        date: userResponse ? userResponse.submitDate : null
      },
      {
        status: 'Closed',
        label: 'Application Closed',
        date: userResponse ? userResponse.closeDate : null
      }
    ];

    // user
    responseObj.user = {
      _id: req.user._id,
      name: req.user.displayName,
      avatar: req.user.avatar,
      isQueryOwner: isQueryOwner,
      isLinkOwner: isLinkOwner,
      isPromoting: !!userPromoting,
      hasApplied: !!userResponse,
      applyStatus: applyStatus,
      applySteps: applySteps,
      isFollowingUser: isFollowingUser,
      isFollowingLink: isFollowingLink
    };

    // traffic
    responseObj.traffic = await elasticSearch.getLinkTraffic(link.linkId);
    // activity
    responseObj.stream = await getStream.getFeed(
      'Link',
      link._id,
      req.user._id
    );

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

    // user is promoting
    const userPromoting = await LinkModel.findOne({
      user: req.user._id,
      parents: parentLink._id
    });
    if (userPromoting) {
      return res.status(400).send({ error: 'user is promoting' });
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

// create link
exports.getApplicationsByLink = async function(req, res) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  // get link _id
  const link = await LinkModel.findOne({ linkId: req.params.linkId });

  // get all responses for this link
  const responses = await ResponseModel.find({ originLink: link._id }).populate(
    'user'
  );

  try {
    res.status(200).send({
      link: link,
      applications: responses
    });
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
};

exports.getApplicationById = async function(req, res) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  // get link _id
  const application = await ResponseModel.findOne({
    _id: req.params.responseId
  }).populate('user link');

  try {
    res.status(200).send(application);
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
