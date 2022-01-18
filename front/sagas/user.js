import { fork, all, takeEvery, delay, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_IN_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	LOG_OUT_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAILURE,
	FOLLOW_REQUEST,
	UNFOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	FOLLOW_FAILURE,
	UNFOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
} from '../reducers/user';

function logInAPI(data) {
	return axios.post('/user/login', data);
}

function* logIn(action) {
	try {
		const result = yield call(logInAPI, action.data);
		yield put({
			type: LOG_IN_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOG_IN_FAILURE,
			error: err.response.data,
		});
	}
}

function logOutAPI(data) {
	return axios.post('/user/logout', data);
}

function* logOut(action) {
	try {
		const result = yield call(logOutAPI, action.data);
		yield put({
			type: LOG_OUT_SUCCESS,
			// data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOG_OUT_FAILURE,
			error: err.response.data,
		});
	}
}

function signUpAPI(data) {
	return axios.post('/user', data);
}

function* signUp(action) {
	try {
		const result = yield call(signUpAPI, action.data);
		console.log(result);
		yield put({
			type: SIGN_UP_SUCCESS,
			// data: result.data,
		});
	} catch (err) {
		yield put({
			type: SIGN_UP_FAILURE,
			error: err.response.data,
		});
	}
}

function followAPI(data) {
	return axios.post('/api/follow', data);
}

function* follow(action) {
	try {
		// const result = yield call(followAPI, action.data);
		yield delay(1000);
		yield put({
			type: FOLLOW_SUCCESS,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: FOLLOW_FAILURE,
			error: err.response.data,
		});
	}
}

function unfollowAPI(data) {
	return axios.post('/api/unfollow', data);
}

function* unfollow(action) {
	try {
		// const result = yield call(unfollowAPI, action.data);
		yield delay(1000);
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: UNFOLLOW_FAILURE,
			error: err.response.data,
		});
	}
}

function* watchLogin() {
	yield takeEvery(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
	yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
	yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
	yield takeEvery(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
	yield takeEvery(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
	yield all([
		fork(watchLogin),
		fork(watchLogOut),
		fork(watchSignUp),
		fork(watchFollow),
		fork(watchUnfollow),
	]);
}
