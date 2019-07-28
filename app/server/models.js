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
// Query
//
const QuerySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    target_bonus: Number,
    network_bonus: Number,
    title: String,
    type: String,
    data: Object,
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    payment: Object,
    status: {
      type: String,
      enum: ['open', 'pending', 'closed'],
      default: 'open'
    }
  },
  { timestamps: true }
);
exports.QueryModel = mongoose.model('Query', QuerySchema);

//
// Link
//
const LinkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    query: { type: mongoose.Schema.Types.ObjectId, ref: 'Query' },
    parentLink: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }],
    payoffs: [],
    potentialPayoffs: [],
    linkId: {
      type: String,
      default: () => nanoid()
    },
    generation: {
      type: Number,
      default: 0
    },
    isQueryOwner: {
      type: Boolean,
      default: false
    },
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
    query: { type: mongoose.Schema.Types.ObjectId, ref: 'Query' },
    link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    message: String,

    target_bonus: Number,
    targetPayouts: [],
    network_bonus: Number,
    networkPayouts: []
  },
  { timestamps: true }
);
exports.ResponseModel = mongoose.model('Response', ResponseSchema);

//
// Payment
//
const PaymentSchema = new mongoose.Schema(
  {
    query: { type: mongoose.Schema.Types.ObjectId, ref: 'Query' },
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
