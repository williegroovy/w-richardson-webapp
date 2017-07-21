import { put, call } from 'redux-saga/effects';

import {USER_AUTH, USER_AUTH_SUCCESS, USER_AUTH_ERROR, TOGGLE_CARD, SET_USERNAME, SET_USER_PERMISSION} from "../constants/types";

import { storeToken } from '../store/User/actions';
import { userLogin } from '../constants/api';

export function* userSaga({ payload }) {
  console.log('userSaga', payload);
  const response = yield call(userLogin, payload);
  console.log('token', response.token);
  //yield call(storeToken, userData.token);
  console.log('call -> payload', payload);
  yield [
    put({ type: USER_AUTH , payload: response.token }),
    put({ type: TOGGLE_CARD, payload: null }),
    put({ type: SET_USERNAME, payload: response.user.username }),
    put({ type: SET_USER_PERMISSION, payload: response.user.permission })
  ];
}