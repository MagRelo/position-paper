import io from 'socket.io-client';
import store from 'state/store';

let socket = null;

export async function submitProposal() {
  console.log('sockets: submit propsal');
}

export async function submitVote() {
  console.log('sockets: submit vote');
}

export async function submitChat() {
  console.log('sockets: submit chat');
}

export async function initSockets(contractAddress) {
  socket = io('/');
  socket.on('connect', () => {
    console.log('socket connected:', socket.id);
  });

  // servesa events
  socket.on('server-account', updateServerData);
  socket.on('bounce-response', bounceResponse);

  // standard errors
  socket.on('reconnecting', reconnectError);
  socket.on('error', socketError);
  socket.on('disconnect', socketError);
  socket.on('connect_failed', socketError);
  socket.on('reconnect_failed', socketError);

  return true;
}

// socket handlers
async function updateServerData(data) {
  return store.dispatch({
    type: 'SERVER_ACCOUNT',
    payload: data
  });
}

async function bounceResponse(data) {
  return store.dispatch({
    type: 'BOUNCE_RESPONSE',
    payload: data
  });
}

// standard errors

function reconnectError(data) {
  if (data > 5) {
    socket.disconnect();
    console.log('disconnecting');
  } else {
    console.log('reconnection attempts: ', data);
  }
}
function socketError(error) {
  console.error('socket error!', error);
}
