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
    jobBoardId: {
      type: String,
      default: () => nanoid()
    },
    displayName: String,
    email: String,

    description: String,
    location: String,
    linkedInProfile: String,
    jobBoardUrl: String,

    googleProvider: {
      type: {
        id: String
      },
      select: false
    },

    stripeCustomer: { type: Object, select: false },
    stripeCustomerToken: { type: String, select: false },
    stripeCustomerBrand: { type: String, select: false },
    stripeCustomerLabel: { type: String, select: false },
    accountBalance: { type: Number, select: false },
    stripeAccount: { type: Object, select: false },
    stripeAccountLabel: { type: String, select: false },
    payments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      select: false
    },
    follows: { type: Array, default: [], select: false }
  },
  { timestamps: true }
);

exports.UserModel = mongoose.model('User', UserSchema);

//
// Volunteer
//

const PersonSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    avatar: String,
    displayName: String,
    email: String,
    placeId: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    needsHelp: { type: Boolean, default: false },
    offeringHelp: { type: Boolean, default: false },
    isMatched: { type: Boolean, default: false },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
    follows: { type: Array, default: [], select: false }
  },
  { timestamps: true }
);

PersonSchema.index({ location: '2dsphere' });
exports.PersonModel = mongoose.model('Person', PersonSchema);

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
    total_bonus: Number,
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
      enum: ['Active', 'Pending', 'Closed'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

// LinkSchema.index({ title: 'text' });

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
      enum: ['Applied', 'Submitted', 'Closed'],
      default: 'Applied'
    },
    applyDate: Date,
    submitDate: Date,
    closeDate: Date
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

const Signup = new mongoose.Schema(
  {
    source: String,
    email: String
  },
  { timestamps: true }
);
exports.SignupModel = mongoose.model('Signup', Signup);
