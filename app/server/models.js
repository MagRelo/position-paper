const mongoose = require('mongoose');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

//
// User
//
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: async function(value) {
          const available = !(await mongoose
            .model('User')
            .findOne({ email: value }));

          console.log('email ', value, ' available ', available);
          return available;
        },
        message: 'This email address is already in use'
      }
    },
    passwordHash: { type: String, required: true },
    stripeCustomer: Object,
    metaData: Object,
    stripeAccount: Object,
    follows: [String],
    first_name: String,
    last_name: String,
    balance: Number,
    payments: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
  },
  { timestamps: true }
);

UserSchema.virtual('password').set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
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
