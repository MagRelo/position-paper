const UserModel = require('../models').UserModel;

/* 1️⃣ Setup Magic Admin SDK */
const { Magic } = require('@magic-sdk/admin');
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

/* 2️⃣ Implement Auth Strategy */
const passport = require('passport');
const MagicStrategy = require('passport-magic').Strategy;

const strategy = new MagicStrategy(async function (user, done) {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
  const existingUser = await UserModel.findOne({ issuer: user.issuer });
  if (!existingUser) {
    /* Create new user if doesn't exist */
    return signup(user, userMetadata, done);
  } else {
    /* Login user if otherwise */
    return login(user, done);
  }
});

passport.use(strategy);

/* 3️⃣ Implement Auth Behaviors */

/* Implement User Signup */
const signup = async (user, userMetadata, done) => {
  console.log('signup - updated:', user);

  let newUser = new UserModel({
    issuer: user.issuer,
    email: userMetadata.email,
    lastLoginAt: user.claim.iat,
    publicAddress: user.publicAddress,
  });

  await newUser.save();
  return done(null, newUser);
};

/* Implement User Login */
const login = async (user, done) => {
  /* Replay attack protection (https://go.magic.link/replay-attack) */
  if (user.claim.iat <= user.lastLoginAt) {
    return done(null, false, {
      message: `Replay attack detected for user ${user.issuer}}.`,
    });
  }

  await UserModel.updateOne(
    { issuer: user.issuer },
    { $set: { lastLoginAt: user.claim.iat } }
  );

  // console.log('login - updated:', user);

  return done(null, user);
};

exports.logout = async function (issuer) {
  return magic.users.logoutByIssuer(issuer);
};

/* Defines what data are stored in the user session */
passport.serializeUser((user, done) => {
  done(null, user.issuer);
});

/* Populates user data in the req.user object */
passport.deserializeUser(async (id, done) => {
  console.log('deserialize:', id);
  try {
    const user = await UserModel.findOne({ issuer: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
