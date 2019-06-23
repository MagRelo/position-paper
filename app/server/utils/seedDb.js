const mongoose = require('mongoose');

const UserModel = require('../models').UserModel;
const QueryModel = require('../models').QueryModel;
const LinkModel = require('../models').LinkModel;

// USERS
const mattId = new mongoose.Types.ObjectId();
const jimId = new mongoose.Types.ObjectId();
const rickId = new mongoose.Types.ObjectId();
const aliceId = new mongoose.Types.ObjectId();
const bobId = new mongoose.Types.ObjectId();
UserModel.create(
  [
    {
      _id: mattId,
      email: 'matt@gmail.com',
      password: '1234',
      name: 'Matt Lovan',
      balance: 0
    },
    {
      _id: jimId,
      email: 'jim@gmail.com',
      password: '1234',
      name: 'Jim Jones',
      balance: 0
    },
    {
      _id: rickId,
      email: 'rick@gmail.com',
      password: '1234',
      name: 'Rick Dudley',
      balance: 0
    },
    {
      _id: aliceId,
      email: 'alice@gmail.com',
      password: '1234',
      name: 'Alice',
      balance: 0
    },
    {
      _id: bobId,
      email: 'bob@gmail.com',
      password: '1234',
      name: 'Bob',
      balance: 0
    }
  ],
  (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      console.info('%d users were successfully stored.', docs.length);
    }
  }
);

// QUERY
const frontEndId = new mongoose.Types.ObjectId();
const marketingId = new mongoose.Types.ObjectId();
QueryModel.create(
  [
    {
      _id: frontEndId,
      title: 'Front-end Developer',
      bonus: '10000',
      type: 'general',
      data: {
        title: 'Front-end Developer',
        bonus: '10000',
        description: 'React, Redux'
      },
      user: bobId
    },
    {
      _id: marketingId,
      title: 'Marketing Executive',
      bonus: '80000',
      type: 'general',
      data: {
        title: 'Marketing Executive',
        bonus: '80000',
        description: 'Lead an exicitng new project'
      },
      user: bobId
    }
  ],
  (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      console.info('%d queries were successfully stored.', docs.length);
    }
  }
);

// LINK
// const frontEndId = new mongoose.Types.ObjectId();
// const marketingId = new mongoose.Types.ObjectId();

QueryModel.create(
  [
    {
      _id: frontEndId,
      title: 'Front-end Developer',
      bonus: '10000',
      type: 'general',
      data: {
        title: 'Front-end Developer',
        bonus: '10000',
        description: 'React, Redux'
      },
      user: bobId
    },
    {
      _id: marketingId,
      title: 'Marketing Executive',
      bonus: '80000',
      type: 'general',
      data: {
        title: 'Marketing Executive',
        bonus: '80000',
        description: 'Lead an exicitng new project'
      },
      user: bobId
    }
  ],
  (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      console.info('%d queries were successfully stored.', docs.length);
    }
  }
);
