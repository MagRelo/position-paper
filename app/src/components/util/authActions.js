import { bufferToHex } from 'ethereumjs-util';
import moment from 'moment';

import store from 'state/store';
import {
  get as getCache,
  set as setCache,
  del as clearCache
} from './money-clip';

export function loadSession() {
  return function(dispatch) {
    const userAddress = store.getState().account.selectedAcount;
    getCache('session-' + userAddress).then(val => {
      // if no 'val' then we don't have a session or it has
      //  expired => clear out the rest of the session data
      if (!val) {
        return dispatch({ type: 'SESSION_CLEAR' });
      }

      return dispatch({
        type: 'SESSION_LOAD',
        payload: JSON.parse(val)
      });
    });
  };
}
export function clearSession() {
  return function(dispatch) {
    const userAddress = store.getState().account.selectedAcount;
    clearCache('session-' + userAddress).then(() => {
      return dispatch({ type: 'SESSION_CLEAR' });
    });
  };
}
export function saveSession(duration) {
  return function(dispatch) {
    console.log('hit saveSession');

    const web3 = store.getState().web3.instance;
    const userAddress = store.getState().account.selectedAccount;
    console.log('user:', userAddress);

    // calculate expiration
    const expiration = moment().add(duration, 'minutes');

    // prepare the message for signing
    const content = `{"expires": "${expiration.toISOString()}"}`;
    const contentHex = bufferToHex(new Buffer(content, 'utf8'));

    // sign message
    web3.currentProvider.sendAsync(
      {
        method: 'personal_sign',
        params: [contentHex, userAddress],
        from: userAddress
      },
      (err, result) => {
        if (err) return console.error(err);
        if (result.error) {
          return console.log('User denied signature.');
        }

        const sessionData = {
          message: contentHex,
          signature: result.result,
          duration: duration,
          expires: expiration.toISOString()
        };

        // save session to IndexedDB
        const staleAfter = Date.now() + duration * 60 * 1000;
        setCache('session-' + userAddress, JSON.stringify(sessionData), {
          staleAfter: staleAfter
        }).then(val => {
          return dispatch({
            type: 'SESSION_LOAD',
            payload: sessionData
          });
        });
      }
    );
  };
}
