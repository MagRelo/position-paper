const mongoose = require('mongoose');
const nanoid = require('nanoid');

//
// User
//
const UserSchema = new mongoose.Schema(
  {
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
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
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
