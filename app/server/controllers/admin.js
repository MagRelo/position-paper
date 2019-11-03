const UserModel = require('../models').UserModel;
const AlphaModel = require('../models').AlphaModel;

// get user
exports.getAllData = async function(req, res) {
  // check auth
  if (!req.user._id === '5d7941ca7bdf0549d3077612') {
    return res.status(401).send({ error: 'wrong user' });
  }

  try {
    const data = await Promise.all([UserModel.find({}), AlphaModel.find({})]);

    return res.status(200).send({
      user: data[0],
      alpha: data[1]
    });
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
};
