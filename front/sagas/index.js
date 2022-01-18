import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = 'http://localhost:3060';

export default function* rootSaga() {
	yield all([fork(userSaga), fork(postSaga)]);
}

// /*
// fork - 비동기 실행
// call - 동기 실행

// dispatch 'LOG_IN_REQUEST' 실행 시
// take('LOG_IN_REQUEST', logIn) -> logIn 함수 실행
// logIn 함수 내에서 call로 서버 통신 후 result 받아오기
// */

// function logInAPI(data) {
// 	return axios.post('/api/login', data);
// }

// function* logIn(action) {
// 	try {
// 		// const result = yield call(logInAPI, action.data);
// 		yield delay;
// 		yield put({
// 			type: 'LOG_IN_SUCCESS',
// 			// data: result.data,
// 		});
// 	} catch (err) {
// 		yield put({
// 			type: 'LOG_IN_FAILURE',
// 			data: err.response.data,
// 		});
// 	}
// }

// function* logOut() {
// 	try {
// 		// const result = yield call(logInAPI, action.data);
// 		yield delay;
// 		yield put({
// 			type: 'LOG_OUT_SUCCESS',
// 			// data: result.data,
// 		});
// 	} catch (err) {
// 		yield put({
// 			type: 'LOG_OUT_FAILURE',
// 			data: err.response.data,
// 		});
// 	}
// }

// function* addPost(action) {
// 	try {
// 		// const result = yield call(logInAPI, action.data);
// 		yield delay;
// 		yield put({
// 			type: 'ADD_POST_SUCCESS',
// 			// data: result.data,
// 		});
// 	} catch (err) {
// 		yield put({
// 			type: 'ADD_POST_FAILURE',
// 			data: err.response.data,
// 		});
// 	}
// }

// /*
// 일회용 함수이므로
// while문이나 takeEvery, takeLatest 등으로 함수를 계속 유지시켜야 함
// while-take - 동기 실행
// takeEvery - 비동기 실행

// takeLatest - 여러 번 실행될 때 마지막 실행 요청의 응답만 처리 (버튼 여러 번 누르는 경우 방지). 요청은 여러 번 가지만 마지막 응답만 처리하므로 서버에 데이터는 중복되어 저장 될 수 있음
// throttle - 지정한 시간 내에는 한 번만 요청을 보냄
// */
// function* watchLogin() {
// 	/*
//   while (true) {
//     yield take('LOG_IN_REQUEST', logIn);
//   }
//   */
// 	yield takeEvery('LOG_IN_REQUEST', logIn);
// }

// function* watchLogOut() {
// 	yield takeEvery('LOG_OUT_REQUEST', logOut);
// }

// function* watchAddPost() {
// 	yield takeEvery('ADD_POST_REQUEST', addPost);
// }

// export default function* rootSaga() {
// 	yield all([fork(watchLogin), fork(watchLogOut), fork(watchAddPost)]);
// }
