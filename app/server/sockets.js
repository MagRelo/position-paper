var io = require('socket.io');

const { socketAuth } = require('./auth');
const { getLobbyData, setUserSocket } = require('./pg-controller');

exports.startIo = function(server) {
  io = io.listen(server);

  // Auth
  io.use(socketAuth);

  io.on('connection', async socket => {
    const groupKey = socket.handshake.query.groupKey;
    const userKey = socket.handshake.query.userKey;

    // join room
    socket.join(groupKey);

    // set into db
    await setUserSocket(userKey, socket.id);

    // setup
    io.to(groupKey).emit('lobby-update', await getLobbyData(groupKey, userKey));

    // // events
    // socket.on('submit-proposal', async data => {
    //   await createProposal(data);
    // });

    // socket.on('submit-vote', async data => {
    //   await updateProposalVote(data);
    // });

    // socket.on('submit-chat', async data => {
    //   await updateGroupChat(data);
    // });
  });

  return io;
};

exports.broadcastGroupUpdate = async function(groupKey, userKey) {
  return io
    .to(groupKey)
    .emit('lobby-update', await getLobbyData(groupKey, userKey));
};

// debug
// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
