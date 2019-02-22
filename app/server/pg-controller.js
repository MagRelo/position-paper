const { Pool, Client } = require('pg');

const connectionString = process.env.PG_CONNECTION_STRING;
const pool = new Pool({
  connectionString: connectionString
});

exports.getAllGameData = async function(name, minDeposit, memberArray) {
  console.log('pg', name, minDeposit, memberArray);

  try {
    const res = await pool.query('SELECT * FROM  NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
};

exports.updateGroup = async function(name, minDeposit, memberArray) {
  console.log('pg', name, minDeposit, memberArray);

  try {
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
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
