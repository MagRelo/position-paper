// import { bufferToHex } from 'ethereumjs-util';
import moment from 'moment';

import {
  get as getCache,
  set as setCache,
  del as clearCache
} from './money-clip';
import Cookies from 'js-cookie';

import store from 'state/store';

export function loadCookie() {
  return function(dispatch) {
    const servesaCookie = Cookies.get('servesa');

    return dispatch({
      type: 'SESSION_LOAD',
      payload: {
        authCookie: !!servesaCookie
      }
    });
  };
}
export function clearCookie() {
  return function(dispatch) {
    // const userAddress = store.getState().account.selectedAcount;
    // clearCache('session-' + userAddress).then(() => {
    //   return dispatch({ type: 'SESSION_CLEAR' });
    // });

    Cookies.remove('servesa');
    return dispatch({ type: 'SESSION_CLEAR' });
  };
}

export function loadSession(userAddress) {
  return function(dispatch) {
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
export function saveSession(user, duration) {
  return function(dispatch) {
    console.log('user:', user);

    // calculate expiration
    const expiration = moment().add(duration, 'minutes');

    const sessionData = {
      email: user.email,
      name: user.name,
      duration: duration,
      expires: expiration.toISOString(),
      staleAfter: Date.now() + duration * 60 * 1000
    };

    setCache('session-' + user.email, JSON.stringify(sessionData)).then(val => {
      return dispatch({
        type: 'SESSION_LOAD',
        payload: sessionData
      });
    });
  };
}
