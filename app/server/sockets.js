var io = require('socket.io');

const {
  createProposal,
  updateProposalVote,
  updateGroupChat,
  getLobbyData
} = require('./pg-controller');

exports.startIo = function(server) {
  io = io.listen(server);

  io.on('connection', async socket => {
    console.log(
      'socket connected:',
      socket.id,
      socket.handshake.query.groupKey
    );

    const groupKey = socket.handshake.query.groupKey;

    // join room
    socket.join(groupKey);

    // setup
    io.to(groupKey).emit('lobby-update', await getLobbyData(groupKey));

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

exports.broadcastGroupUpdate = async function(groupKey) {
  return io.to(groupKey).emit('lobby-update', await getLobbyData(groupKey));
};

// debug
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
