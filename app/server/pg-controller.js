const { Pool, Client } = require('pg');

let pool;

exports.initPG = async function() {
  const connectionString = process.env.PG_CONNECTION_STRING;
  console.log('PG Connection:', process.env.PG_CONNECTION_STRING);

  pool = new Pool({
    connectionString: connectionString
  });
};

exports.getAllGroupData = async function(name, minDeposit, memberArray) {
  console.log('pg', name, minDeposit, memberArray);

  try {
    const res = await pool.query('SELECT * FROM  NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
};

exports.getAllGroups = async function() {
  const query = `
    SELECT "groupName", "minDeposit", "groupId", "contractAddress"
    FROM "groupsSchema"."group";
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
    SELECT "groupName", "minDeposit", "groupId", "contractAddress"
    FROM "groupsSchema"."group"
    WHERE "group"."contractAddress" =$1;
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
  name,
  minDeposit,
  memberArray,
  contractAddress
) {
  console.log('createGroup', name, minDeposit, memberArray, contractAddress);

  const query = `
    INSERT INTO "groupsSchema"."group"(
    "groupName", "minDeposit", "groupId", "contractAddress")
    VALUES ($1, $2, $3, $4);
  `;

  const queryObj = {
    text: query,
    values: [name, minDeposit, 0, contractAddress]
  };

  try {
    const res = await pool.query(queryObj);

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
  // create(update?) user
};

exports.createProposal = async function(userData) {
  console.log('pg', userData);

  try {
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
};

exports.updateProposalVote = async function(voteData) {
  console.log('pg', voteData);

  try {
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
  // all update
};

// Log Trades
exports.updateProposalTrade = async function(userData) {
  // trade
};
