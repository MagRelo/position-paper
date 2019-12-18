const mongoose = require('mongoose');
const nanoid = require('nanoid');
// const bcrypt = require('bcrypt');

//
// User
//
const UserSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    avatar: String,
    location: String,
    linkedinProvider: {
      type: {
        id: String,
        access_token: String
      },
      select: false
    },
    stripeCustomer: { type: Object, select: false },
    stripeAccount: { type: Object, select: false },
    stripeAccountLabel: String,
    metaData: Object,
    follows: [String],
    balance: Number,
    payments: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
  },
  { timestamps: true }
);

UserSchema.statics.upsertLinkedinUser = function(access_token, profile) {
  var that = this;
  return this.findOne(
    {
      'linkedinProvider.id': profile.id
    },
    async function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          firstname: profile.firstName.localized.en_US,
          lastname: profile.lastName.localized.en_US,
          avatar:
            profile.profilePicture['displayImage~'].elements[1].identifiers[0]
              .identifier,
          linkedinProvider: {
            id: profile.id,
            access_token: access_token
          }
        });

        await newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
        });

        return newUser;
      } else {
        // update
        user.firstname = profile.firstName.localized.en_US;
        user.lastname = profile.lastName.localized.en_US;
        user.avatar =
          profile.profilePicture[
            'displayImage~'
          ].elements[1].identifiers[0].identifier;

        await user.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
        });

        return user;
      }
    }
  );
};

exports.UserModel = mongoose.model('User', UserSchema);

//
// Link
//
const LinkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parentLink: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    originLink: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    linkId: {
      type: String,
      default: () => nanoid()
    },
    generation: {
      type: Number,
      default: 0
    },

    isBuried: {
      type: Boolean,
      default: false
    },

    target_bonus: Number,
    network_bonus: Number,
    payoffs: [],
    potentialPayoffs: [],
    payment: Object,

    title: String,
    type: String,
    data: Object,

    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }],

    status: {
      type: String,
      enum: ['open', 'pending', 'closed'],
      default: 'open'
    }
  },
  { timestamps: true }
);

exports.LinkModel = mongoose.model('Link', LinkSchema);

//
// Response
//
const ResponseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    originLink: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    message: String,

    target_bonus: Number,
    targetPayouts: [],
    network_bonus: Number,
    networkPayouts: [],

    payment: Object,
    status: {
      type: String,
      enum: ['open', 'pending', 'closed'],
      default: 'open'
    }
  },
  { timestamps: true }
);
exports.ResponseModel = mongoose.model('Response', ResponseSchema);

//
// Payment
//
const PaymentSchema = new mongoose.Schema(
  {
    link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    response: { type: mongoose.Schema.Types.ObjectId, ref: 'Response' },
    amount: {
      type: Number,
      default: 0
    },
    stripeData: Object,
    stripeResponse: Object,
    status: {
      type: String,
      enum: ['created', 'pending', 'closed'],
      default: 'created'
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    isInError: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
exports.PaymentModel = mongoose.model('Payment', PaymentSchema);

//
// Share
//
const ShareSchema = new mongoose.Schema(
  {
    link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: 'String',
    data: Object
  },
  { timestamps: true }
);
exports.ShareModel = mongoose.model('Share', ShareSchema);

const AlphaSchema = new mongoose.Schema(
  {
    company: String,
    website: String,
    employeeCount: String,
    openPositions: String,
    contactName: String,
    contactEmail: String
  },
  { timestamps: true }
);
exports.AlphaModel = mongoose.model('Alpha', AlphaSchema);
