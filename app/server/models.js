const mongoose = require('mongoose');
const nanoid = require('nanoid');

//
// User
//
const UserSchema = new mongoose.Schema(
  {
    plaid_token: Object,
    plaid_item: Object,
    email: String,
    password: String,
    name: String,
    balance: Number
  },
  { timestamps: true }
);

UserSchema.methods.validPassword = function(password) {
  return true;
};

exports.UserModel = mongoose.model('User', UserSchema);

//
// Query
//
const QuerySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    bonus: Number,
    type: String,
    data: Object,
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }],
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]
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
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    payoffs: Array,
    linkId: {
      type: String,
      default: () => nanoid()
    },
    views: {
      type: Number,
      default: 0
    },
    generation: {
      type: Number,
      default: 0
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
    query: { type: mongoose.Schema.Types.ObjectId, ref: 'Query' },
    link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    respondingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);
exports.ResponseModel = mongoose.model('Response', ResponseSchema);

//
// Payment
//
const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: {
      type: Number,
      default: 0
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    query: { type: mongoose.Schema.Types.ObjectId, ref: 'Query' },
    link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' }
  },
  { timestamps: true }
);
exports.PaymentModel = mongoose.model('Payment', PaymentSchema);
