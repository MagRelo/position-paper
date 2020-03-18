const UserModel = require('../models').UserModel;

// get user
exports.populateUser = async function(req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.user.id })
      .select(
        `firstname lastname avatar displayName description location email linkedInProfile 
        jobBoardUrl jobBoardId stripeAccountLabel stripeCustomerLabel stripeCustomerBrand`
      )
      .lean();

    if (!user) {
      return res.status(401).send({ error: 'no user' });
    }

    // get queries and links
    const userObject = {
      user: {
        hasAccount: !!user.stripeAccountLabel,
        hasPaymentSource: !!user.stripeCustomerLabel,
        ...user
      }
    };

    res.status(200).send(userObject);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
};
