var io = require('socket.io');

// const getWeb3 = require('./utils/getWeb3');

// const bpArtifact = require('../src/contracts/BouncerProxy.json');

module.exports = function startIo(server) {
  io = io.listen(server);

  io.on('connection', async socket => {
    console.log('socket connected:', socket.id);

    // setup
    io.emit('server-account', await getServerAccount());

    // events
    socket.on('submit-proposal', async data => {
      console.log('server socket submitProposal');
    });

    socket.on('submit-vote', async data => {
      console.log('server socket submitVote');
    });

    socket.on('submit-chat', async data => {
      console.log('server socket submitChat');
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
