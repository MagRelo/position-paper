const mongoose = require('mongoose');
var FlakeIdGen = require('flake-idgen'),
  intformat = require('biguint-format'),
  generator = new FlakeIdGen();

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    balance: Number
  },
  { timestamps: true }
);
exports.UserModel = mongoose.model('User', UserSchema);

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    linkedin: String,
    github: String,
    twitter: String,
    medium: String,
    email: String,
    salary: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);
exports.ProfileModel = mongoose.model('Profile', ProfileSchema);

const LinkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    linkId: Number,
    parentLinkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' }
  },
  { timestamps: true }
);

LinkSchema.pre('save', function(next) {
  try {
    if (this.isNew) {
      var id = generator.next();
      this.linkId = intformat(id, 'hex', { prefix: '0x' });
      console.log(typeof this.linkId, id, this.linkId);
    }
  } catch (error) {
    console.log(error);
  }
  next();
});

exports.LinkModel = mongoose.model('Link', LinkSchema);
