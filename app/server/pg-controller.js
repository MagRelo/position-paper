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
  SELECT * FROM "groupsSchema".group
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
    FROM "groupsSchema".group
    WHERE group.groupkey =$1;
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
    INSERT INTO "groupsSchema".group(
    groupkey, "groupName", "minDeposit", created, updated)
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
          INSERT INTO "groupsSchema".users(
            userkey, "userName", created, updated)
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
          INSERT INTO "groupsSchema".groupuser(
            userkey, groupkey)
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
  INSERT INTO "groupsSchema".groupproposal(
    "fromAsset", "toAsset", quantity, created, updated, userkey, groupkey)
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
    "proposalId", "inFavor", created, updated, userkey, groupkey)
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

exports.getLobbyData = async function(groupKey, userKey) {
  const group = {
    text: `
      SELECT *
      FROM "groupsSchema".group g
      WHERE g.groupkey = $1
    `,
    values: [groupKey]
  };

  const proposals = {
    text: `
      SELECT gp.groupproposalid, gp.fromasset, gp.toasset, gp.quantity, gp.updated, gp.isopen, gp.ispassed, gp.isexecuted,
      (SELECT COUNT(*)
            FROM "groupsSchema".users u, "groupsSchema".groupuser gu, "groupsSchema".group g
            WHERE u.userkey = gu.userKey
            AND gu.groupKey = g.groupkey
            AND g.groupkey = $1) as "totalMembers",
      (SELECT COUNT(*)
            FROM "groupsSchema".proposalvote pv
            WHERE pv.groupproposalid = gp.groupproposalid) as "totalVotes",
      (SELECT pv.infavor
            FROM "groupsSchema".proposalvote pv
            WHERE pv.groupproposalid = gp.groupproposalid
      AND pv.userkey = $2) as "userVote"
      FROM "groupsSchema".groupproposal gp
      WHERE gp.groupkey = $1
    `,
    values: [groupKey, userKey]
  };

  const chat = {
    text: `
      SELECT users.username, groupchat.*
      FROM "groupsSchema".groupchat, "groupsSchema".users
      WHERE groupchat.groupkey = $1
      AND groupchat.userkey = users.userkey;
    `,
    values: [groupKey]
  };

  const holdings = {
    text: `
      SELECT *
      FROM "groupsSchema".groupholding
      WHERE groupholding.groupkey = $1;
    `,
    values: [groupKey]
  };

  const members = {
    text: `
      SELECT users.*
      FROM "groupsSchema".groupuser, "groupsSchema".users
      WHERE groupuser.userkey = users.userkey
      AND groupuser.groupkey = $1;
    `,
    values: [groupKey]
  };

  try {
    const data = await Promise.all([
      await pool.query(group),
      await pool.query(proposals),
      await pool.query(chat),
      await pool.query(members),
      await pool.query(holdings)
    ]);

    return {
      group: data[0].rows[0],
      proposals: data[1].rows,
      chat: data[2].rows,
      members: data[3].rows,
      portfolio: data[4].rows
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
  INSERT INTO "groupsSchema".groupchat(
    message, userkey, groupkey, created, updated)
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
