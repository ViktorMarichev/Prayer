import {call, put, takeLatest} from 'redux-saga/effects';
import {Prayers} from '../api/prayers';
import {
  getPrayers,
  createPrayer,
  deletePrayer,
  updatePrayer,
  setRequestStatus as setRequestStatusPrayer,
} from '../Prayers/index';
type getPrayersAction = ReturnType<typeof getPrayers>;
type createPrayerAction = ReturnType<typeof createPrayer>;
type deletePrayerAction = ReturnType<typeof deletePrayer>;
type updatePrayerAction = ReturnType<typeof updatePrayer>;

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
