const mongoose = require('mongoose');
var FlakeIdGen = require('flake-idgen'),
  intformat = require('biguint-format'),
  generator = new FlakeIdGen();

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
    type: String,
    data: Object
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
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Query' },
    parentLinkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    linkId: Number
  },
  { timestamps: true }
);
LinkSchema.pre('save', function(next) {
  try {
    if (this.isNew) {
      var id = generator.next();
      this.linkId = intformat(id, 'hex', { prefix: '0x' });
      // console.log(typeof this.linkId, id, this.linkId);
    }
  } catch (error) {
    console.log(error);
  }
  next();
});
exports.LinkModel = mongoose.model('Link', LinkSchema);
