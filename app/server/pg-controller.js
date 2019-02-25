const { Pool } = require('pg');
// const { Pool, Client } = require('pg');

let pool;

exports.initPG = async function() {
  const connectionString = process.env.PG_CONNECTION_STRING;
  console.log('PG Connection:', process.env.PG_CONNECTION_STRING);

  pool = new Pool({
    connectionString: connectionString
  });
};

exports.getAllGroups = async function() {
  const query = `
  SELECT * FROM "groupsSchema"."group"
  `;

  const queryObj = {
    text: query
  };

  try {
    const res = await pool.query(queryObj);
    return res.rows;
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};

exports.getGroup = async function(contractAddress) {
  // console.log('getGroup:', contractAddress);

  const query = `
    SELECT *
    FROM "groupsSchema"."group"
    WHERE "group"."groupKey" =$1;
  `;

  const queryObj = {
    text: query,
    values: [contractAddress]
  };

  try {
    const res = await pool.query(queryObj);
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};

exports.createGroup = async function(groupKey, groupName, minDeposit, members) {
  console.log('createGroup:', groupKey, groupName, minDeposit, members);

  const date = new Date();
  const created = date; // created,
  const updated = date; // updated,

  const query = `
    INSERT INTO "groupsSchema"."group"(
    "groupKey", "groupName", "minDeposit", created, updated)
    VALUES ($1, $2, $3, $4, $5);
  `;
  const queryParams = [groupKey, groupName, minDeposit, created, updated];

  try {
    // create group
    const groupResults = await pool.query({
      text: query,
      values: queryParams
    });

    // create users
    const userInserts = [];
    members.forEach(member => {
      userInserts.push(
        pool.query({
          text: `
          INSERT INTO "groupsSchema"."user"(
            "userKey", "userName", created, updated)
            VALUES ($1, $2, $3, $4);
          `,
          values: [member.address, member.name, created, updated]
        })
      );
    });

    // execute users
    const userResults = Promise.all(userInserts);

    // create links
    const userLinkInserts = [];
    members.forEach(member => {
      userLinkInserts.push(
        pool.query({
          text: `
          INSERT INTO "groupsSchema"."groupUser"(
            "userKey", "groupKey")
            VALUES ($1, $2);
          `,
          values: [member.address, groupKey]
        })
      );
    });

    // execute links
    const userLinkResults = Promise.all(userInserts);

    return { groupResults, userResults, userLinkResults };
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};

exports.updateGroupChat = async function(chatData) {
  console.log('pg', chatData);

  try {
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
};

exports.updateUser = async function(userAddress, name) {
  // create(update$) user
};

exports.createProposal = async function(
  fromAsset,
  toAsset,
  quantity,
  created,
  updated,
  userKey,
  groupKey
) {
  // setup query
  const query = `
  INSERT INTO "groupsSchema"."groupProposal"(
    "fromAsset", "toAsset", quantity, created, updated, "userKey", "groupKey")
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;
  const queryParams = [
    fromAsset,
    toAsset,
    quantity,
    created,
    updated,
    userKey,
    groupKey
  ];

  console.log([
    fromAsset,
    toAsset,
    quantity,
    created,
    updated,
    userKey,
    groupKey
  ]);

  try {
    return await pool.query({
      text: query,
      values: queryParams
    });
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};

exports.updateProposalVote = async function(
  userKey,
  groupKey,
  proposalId,
  inFavor
) {
  console.log('pg vote', proposalId, inFavor);

  const date = new Date();
  const created = date; // created,
  const updated = date; // updated,

  // setup query
  const query = `
  INSERT INTO "groupsSchema"."proposalVote"(
    "proposalId", "inFavor", created, updated, "userKey", "groupKey")
    VALUES ($1, $2, $3, $4, $5, $6);
  `;
  const queryParams = [
    proposalId,
    inFavor,
    created,
    updated,
    userKey,
    groupKey
  ];

  try {
    return await pool.query({
      text: query,
      values: queryParams
    });
  } catch (err) {
    console.log(err.stack);
  }
};

// Log Trades
exports.updateProposalTrade = async function(userData) {
  // trade
};

exports.getLobbyData = async function(groupKey) {
  const group = {
    text: `
      SELECT *
      FROM "groupsSchema"."group"
      WHERE "group"."groupKey" = $1
    `,
    values: [groupKey]
  };

  const proposals = {
    text: `
      SELECT *
      FROM "groupsSchema"."groupProposal"
      WHERE "groupProposal"."groupKey" = $1
    `,
    values: [groupKey]
  };

  const chat = {
    text: `
      SELECT "user"."userName", "groupChat"."message", "groupChat"."groupChatId"
      FROM "groupsSchema"."groupChat", "groupsSchema"."user"
      WHERE "groupChat"."groupKey" = $1
      AND "groupChat"."userKey" = "user"."userKey";
    `,
    values: [groupKey]
  };

  // const portfolio = {
  //   text: `
  //     SELECT *
  //     FROM "groupsSchema"."groupPortfolio"
  //     WHERE "groupChat"."groupKey" = $1
  //   `,
  //   values: [groupKey]
  // };

  const members = {
    text: `
      SELECT *
      FROM "groupsSchema"."user";
    `
  };

  try {
    const data = await Promise.all([
      await pool.query(group),
      await pool.query(proposals),
      await pool.query(chat),
      await pool.query(members)
    ]);

    return {
      group: data[0].rows[0],
      proposals: data[1].rows,
      chat: data[2].rows,
      members: data[3].rows
    };
  } catch (err) {
    console.log(err.stack);
  }
};

exports.createMessage = async function(userKey, groupKey, message) {
  const date = new Date();
  const created = date; // created,
  const updated = date; // updated,

  const query = `
  INSERT INTO "groupsSchema"."groupChat"(
    message, "userKey", "groupKey", created, updated)
    VALUES ($1, $2, $3, $4, $5);
  `;
  const queryParams = [message, userKey, groupKey, created, updated];

  try {
    return await pool.query({
      text: query,
      values: queryParams
    });
  } catch (err) {
    console.log(err.stack);
  }
};
