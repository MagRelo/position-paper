var io = require('socket.io');

const {
  createProposal,
  updateProposalVote,
  updateGroupChat
} = require('./pg-controller');

module.exports = function startIo(server) {
  io = io.listen(server);

  io.on('connection', async socket => {
    console.log('socket connected:', socket.id);

    // setup
    io.emit('group-setup', await getServerAccount());

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

async function getServerAccount() {
  // test web3
  // const { serverAccount, serverAccountBalance } = await getWeb3.getWeb3();

  // return { serverAccount: serverAccount.address, serverAccountBalance };
  return { time: 'party' };
}

// debug
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
