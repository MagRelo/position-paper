const mongoose = require('mongoose');

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
    linkRef: Number,
    parentLink: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' }
  },
  { timestamps: true }
);
exports.LinkModel = mongoose.model('Link', LinkSchema);
