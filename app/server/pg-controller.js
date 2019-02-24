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
  console.log('getGroup:', contractAddress);

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

exports.createGroup = async function(
  groupKey,
  groupName,
  minDeposit,
  created,
  updated
) {
  console.log(
    'createGroup:',
    groupKey,
    groupName,
    minDeposit,
    created,
    updated
  );

  const query = `
    INSERT INTO "groupsSchema"."group"(
    "groupKey", "groupName", "minDeposit", created, updated)
    VALUES ($1, $2, $3, $4, $5);
  `;
  const queryParams = [groupKey, groupName, minDeposit, created, updated];

  try {
    const res = await pool.query({
      text: query,
      values: queryParams
    });

    return res;
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
  // all update
};

// Log Trades
exports.updateProposalTrade = async function(userData) {
  // trade
};
