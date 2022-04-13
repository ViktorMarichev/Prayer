import {call, put, takeLatest} from 'redux-saga/effects';
import {Columns} from '../api/columns';
import {getColumns, createColumn, setRequestStatus} from '../Columns/index';

type createColumnAction = ReturnType<typeof createColumn>;
type getColumnsAction = ReturnType<typeof getColumns>;

function* getColumnsWorker(action: getColumnsAction) {
  const {token} = action.payload;

  const {success, failure} = getColumns;
  try {
    yield put(setRequestStatus({requestStatus: 'BEGIN_FETCHING'}));

    const {data: columnsArray} = yield call(Columns.getAll, {token});

    if (columnsArray.message) {
      yield put(failure({message: columnsArray.message}));
      yield put(setRequestStatus({requestStatus: 'ERROR_FETCHING'}));
      yield put(setRequestStatus({requestStatus: null}));
    } else {
      yield put(setRequestStatus({requestStatus: 'SUCCESS_FETCHING'}));
      yield put(success(columnsArray));
      yield put(setRequestStatus({requestStatus: null}));
    }
  } catch (error) {
    yield put(setRequestStatus({requestStatus: 'ERROR_FETCHING'}));
    yield put(setRequestStatus({requestStatus: null}));
    console.error(error);
  }
}
function* createColumnWorker(action: createColumnAction) {
  const {token, title, description} = action.payload;

  const {success, failure} = createColumn;
  try {
    yield put(setRequestStatus({requestStatus: 'BEGIN_FETCHING'}));
    const {data: response} = yield call(Columns.create, {
      token,
      title,
      description,
    });
    if (response.message) {
      yield put(failure({message: response.message}));
      yield put(setRequestStatus({requestStatus: 'ERROR_FETCHING'}));
      yield put(setRequestStatus({requestStatus: null}));
    } else {
      yield put(success(response));
      yield put(setRequestStatus({requestStatus: 'SUCCESS_FETCHING'}));
      yield put(setRequestStatus({requestStatus: null}));
    }
  } catch (error) {
    yield put(failure({message: (error as Error).message}));
    yield put(setRequestStatus({requestStatus: 'ERROR_FETCHING'}));
    yield put(setRequestStatus({requestStatus: null}));
  }
}

export function* createColumnWatcher() {
  yield takeLatest(createColumn.TRIGGER, createColumnWorker);
}
export function* columnsWatcher() {
  yield takeLatest(getColumns.TRIGGER, getColumnsWorker);
}

