import {call, put, takeLatest, all} from 'redux-saga/effects';
import {User} from './api/user';
import {Columns} from './api/columns';
import {login} from './User/slice';
import {getColumns} from './Columns/slice';
type signInAction = ReturnType<typeof login>;
type getColumnsAction = ReturnType<typeof getColumns>;

function* signInWorker(action: signInAction) {
  const {email, password} = action.payload;
  const {success, failure} = login;
  // принимает email и password извне

  try {
    // запросить токен, получить его, а затем попытаться запросить данные
    const {data: authData} = yield call(User.login, {email, password});
    const {token, name, id, message} = authData;
    // в случае успеха отдать данные редьюсеру
    if (message) {
      yield put(failure({message}));
    } else {
      yield put(success({token, email, name, id}));
    }
  } catch (error) {
    // ошибку можно тоже отдать редьюсеру через вызов failure
    // или получить в компоненте
    // или вообще написать функцию-обработчик, правящую миром ошибок
    console.error(error);
  }
}
function* getColumnsWorker(action: getColumnsAction) {
  const {token} = action.payload;

  const {success, failure} = getColumns;
  try {
    // запросить токен, получить его, а затем попытаться запросить данные
    const {data: columnsArray} = yield call(Columns.getAll, {token});
    // в случае успеха отдать данные редьюсеру
    if (columnsArray.message) {
      yield put(failure({message: columnsArray.message}));
    } else {
      yield put(success(columnsArray));
    }
  } catch (error) {
    // ошибку можно тоже отдать редьюсеру через вызов failure
    // или получить в компоненте
    // или вообще написать функцию-обработчик, правящую миром ошибок
    console.error(error);
  }
}

export function* columnsWatcher() {
  yield takeLatest(getColumns.TRIGGER, getColumnsWorker);
}

export function* userWatcher() {
  yield takeLatest(login.TRIGGER, signInWorker);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([userWatcher(), columnsWatcher()]);
}
