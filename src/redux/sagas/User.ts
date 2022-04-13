import {call, put, takeLatest} from 'redux-saga/effects';
import {User} from '../api/user';
import {login, setRequestStatus} from '../User/index';
type signInAction = ReturnType<typeof login>;

function* signInWorker(action: signInAction) {
  const {email, password} = action.payload;
  const {success, failure} = login;
  // принимает email и password извне

  try {
    // запросить токен, получить его, а затем попытаться запросить данные
    const {data: authData} = yield call(User.login, {email, password});
    const {token, name, id, message} = authData;
    yield put(setRequestStatus({requestStatus: 'BEGIN_FETCHING'}));
    // в случае успеха отдать данные редьюсеру
    if (message) {
      yield put(failure({message}));
      yield put(setRequestStatus({requestStatus: 'END_FETCHING'}));
    } else {
      yield put(setRequestStatus({requestStatus: 'END_FETCHING'}));
      yield put(success({token, email, name, id}));
    }
  } catch (error) {
    yield put(setRequestStatus({requestStatus: 'END_FETCHING'}));
    console.error(error);
  }
}
export function* userWatcher() {
  yield takeLatest(login.TRIGGER, signInWorker);
}
