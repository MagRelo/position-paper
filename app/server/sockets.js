var io = require('socket.io');

const {
  createProposal,
  updateProposalVote,
  updateGroupChat,
  getLobbyData
} = require('./pg-controller');

module.exports = function startIo(server) {
  io = io.listen(server);

  io.on('connection', async socket => {
    console.log(
      'socket connected:',
      socket.id,
      socket.handshake.query.groupKey
    );

    // setup
    io.emit(
      'lobby-update',
      await getLobbyData(socket.handshake.query.groupKey)
    );

    // events
    socket.on('submit-proposal', async data => {
      await createProposal(data);
    });

    socket.on('submit-vote', async data => {
      await updateProposalVote(data);
    });

    socket.on('submit-chat', async data => {
      await updateGroupChat(data);
    });
  });

  return io;
};

// debug
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
