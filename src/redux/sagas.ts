import {ErrorMessage} from '@hookform/error-message';
import {call, put, takeLatest, all} from 'redux-saga/effects';
import {User} from './api/user';
import {Columns} from './api/columns';
import {Prayers} from './api/prayers';
import {login} from './User/slice';
import {
  getColumns,
  createColumn,
  setRequestStatus as setRequsetStatusColumn,
} from './Columns/index';
import {Comment} from 'src/types/Comment';
import {Comments} from './api/comments';
import {getComments, createComment} from './Comments/index';

import {
  getPrayers,
  createPrayer,
  deletePrayer,
  updatePrayer,
  setRequestStatus as setRequestStatusPrayer,
} from './Prayers/index';
type signInAction = ReturnType<typeof login>;
type getColumnsAction = ReturnType<typeof getColumns>;
type getPrayersAction = ReturnType<typeof getPrayers>;
type createPrayerAction = ReturnType<typeof createPrayer>;
type deletePrayerAction = ReturnType<typeof deletePrayer>;
type updatePrayerAction = ReturnType<typeof updatePrayer>;
type createColumnAction = ReturnType<typeof createColumn>;
type getCommentsAction = ReturnType<typeof getComments>;
type createCommentAction = ReturnType<typeof createComment>;

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
    yield put(setRequestStatusPrayer({requestStatus: 'BEGIN_FETCHING'}));

    const {data: columnsArray} = yield call(Columns.getAll, {token});

    if (columnsArray.message) {
      yield put(failure({message: columnsArray.message}));
      yield put(setRequestStatusPrayer({requestStatus: 'ERROR_FETCHING'}));
      yield put(setRequestStatusPrayer({requestStatus: null}));
    } else {
      yield put(setRequestStatusPrayer({requestStatus: 'SUCCESS_FETCHING'}));
      yield put(success(columnsArray));
      yield put(setRequestStatusPrayer({requestStatus: null}));
    }
  } catch (error) {
    yield put(setRequestStatusPrayer({requestStatus: 'ERROR_FETCHING'}));
    yield put(setRequestStatusPrayer({requestStatus: null}));
    console.error(error);
  }
}

function* createColumnWorker(action: createColumnAction) {
  const {token, title, description} = action.payload;

  const {success, failure} = createColumn;
  try {
    yield put(setRequsetStatusColumn({requestStatus: 'BEGIN_FETCHING'}));
    const {data: response} = yield call(Columns.create, {
      token,
      title,
      description,
    });
    if (response.message) {
      yield put(failure({message: response.message}));
      yield put(setRequsetStatusColumn({requestStatus: 'ERROR_FETCHING'}));
      yield put(setRequsetStatusColumn({requestStatus: null}));
    } else {
      yield put(success(response));
      yield put(setRequsetStatusColumn({requestStatus: 'SUCCESS_FETCHING'}));
      yield put(setRequsetStatusColumn({requestStatus: null}));
    }
  } catch (error) {
    yield put(failure({message: (error as Error).message}));
    yield put(setRequsetStatusColumn({requestStatus: 'ERROR_FETCHING'}));
    yield put(setRequsetStatusColumn({requestStatus: null}));
  }
}

function* getPrayersWorker(action: getPrayersAction) {
  const {token} = action.payload;

  const {success, failure} = getPrayers;
  try {
    const {data: prayersArray} = yield call(Prayers.getAll, {token});

    if (prayersArray.message) {
      yield put(failure({message: prayersArray.message}));
    } else {
      yield put(success(prayersArray));
    }
  } catch (error) {
    console.error(error);
  }
}
function* createPrayerWorker(action: createPrayerAction) {
  const {token, title, description, checked, columnId} = action.payload;
  const {success, failure} = createPrayer;
  try {
    const {data: prayer} = yield call(Prayers.create, {
      token,
      title,
      description,
      checked,
      columnId,
    });
    if (prayer.id) {
      yield put(success({message: 'done'}));
    } else {
      yield put(failure({message: prayer.message}));
    }
  } catch (error) {
    yield put(failure({message: (error as Error).message}));
  }
}
function* deletePrayerWorker(action: deletePrayerAction) {
  const {token, id} = action.payload;
  const {success, failure} = deletePrayer;
  try {
    const {data: response} = yield call(Prayers.delete, {token, id});
    if (!response.message) {
      yield put(success({id: response.id}));
    } else {
      yield put(failure({message: response.message}));
    }
  } catch (error) {
    console.log((error as Error).message);

    yield put(failure({message: (error as Error).message}));
  }
}
function* updatePrayerWorker(action: updatePrayerAction) {
  const {token, checked, id, columnId, title, description} = action.payload;
  const {success, failure} = updatePrayer;
  try {
    const {data: response} = yield call(Prayers.update, {
      title,
      description,
      checked,
      id,
      columnId,
      token,
    });
    if (!response.message) {
      yield put(success(response));
    } else {
      yield put(failure({message: response.message}));
    }
  } catch (error) {
    console.log((error as Error).message);
    yield put(failure({message: (error as Error).message}));
  }
}
function* getCommentsWorker(action: getCommentsAction) {
  const {token} = action.payload;

  const {success, failure} = getComments;
  try {
    const {data: commentArray} = yield call(Comments.getAll, {token});
    if (commentArray.message) {
      yield put(failure({message: commentArray.message}));
    } else {
      yield put(success(commentArray));
    }
  } catch (error) {
    console.error(error);
    yield put(failure({message: (error as Error).message}));
  }
}

function* createCommentWorker(action: createCommentAction) {
  const {token, body, created, prayerId} = action.payload;
  const {success, failure} = createComment;
  try {
    const {data: response} = yield call(Comments.create, {
      token,
      body,
      created,
      prayerId,
    });
    if (response.message) {
      yield put(failure({message: response.message}));
    } else {
      const {id, body, created, prayerId, userId} = response;
      const comment: Comment = {
        id,
        body,
        created,
        prayerId,
        userId,
      };

      yield put(success({comment}));
    }
  } catch (error) {
    console.error(error);
    yield put(failure({message: (error as Error).message}));
  }
}

export function* columnsWatcher() {
  yield takeLatest(getColumns.TRIGGER, getColumnsWorker);
}

export function* createColumnWatcher() {
  yield takeLatest(createColumn.TRIGGER, createColumnWorker);
}
export function* userWatcher() {
  yield takeLatest(login.TRIGGER, signInWorker);
}
export function* prayersWatcher() {
  yield takeLatest(getPrayers.TRIGGER, getPrayersWorker);
}
export function* createPrayerWatcher() {
  yield takeLatest(createPrayer.TRIGGER, createPrayerWorker);
}
export function* deletePrayerWatcher() {
  yield takeLatest(deletePrayer.TRIGGER, deletePrayerWorker);
}
export function* updatePrayerWatcher() {
  yield takeLatest(updatePrayer.TRIGGER, updatePrayerWorker);
}
export function* getAllComments() {
  yield takeLatest(getComments.TRIGGER, getCommentsWorker);
}
export function* createCommentWatcher() {
  yield takeLatest(createComment.TRIGGER, createCommentWorker);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    userWatcher(),
    columnsWatcher(),
    createColumnWatcher(),
    prayersWatcher(),
    createPrayerWatcher(),
    deletePrayerWatcher(),
    updatePrayerWatcher(),
    getAllComments(),
    createCommentWatcher(),
  ]);
}
