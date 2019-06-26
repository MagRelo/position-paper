// const mongoose = require('mongoose');
const faker = require('faker');

const UserModel = require('../models').UserModel;
const QueryModel = require('../models').QueryModel;
// const LinkModel = require('../models').LinkModel;

// Load seeded users, then
// 1. Create queries
// 2. Create links
// 3. Create responses

// get users and make them a query
async function createQueries() {
  console.log('hit');

  // remove queries
  await QueryModel.remove({});

  // get users
  const users = await UserModel.find({}).lean();

  // create query objects
  const queryObjects = users.map((user, index) => {
    const title =
      faker.company.catchPhraseAdjective() +
      ' ' +
      faker.company.catchPhraseNoun();
    const bonus = faker.finance.amount();

    return {
      user: user._id,
      title: title,
      bonus: bonus,
      type: 'general',
      data: {
        title: title,
        description: faker.lorem.paragraph(),
        bonus: bonus
      }
    };
  });

  // Insert
  await QueryModel.create(queryObjects, (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      console.info('%d queries were successfully stored.', docs.length);
    }
  });

  // end
}
createQueries();

// LINK
// const frontEndId = new mongoose.Types.ObjectId();
// const marketingId = new mongoose.Types.ObjectId();

// QueryModel.create(
//   [
//     {
//       _id: frontEndId,
//       title: 'Front-end Developer',
//       bonus: '10000',
//       type: 'general',
//       data: {
//         title: 'Front-end Developer',
//         bonus: '10000',
//         description: 'React, Redux'
//       },
//       user: bobId
//     },
//     {
//       _id: marketingId,
//       title: 'Marketing Executive',
//       bonus: '80000',
//       type: 'general',
//       data: {
//         title: 'Marketing Executive',
//         bonus: '80000',
//         description: 'Lead an exicitng new project'
//       },
//       user: bobId
//     }
//   ],
//   (err, docs) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.info('%d queries were successfully stored.', docs.length);
//     }
//   }
// );
