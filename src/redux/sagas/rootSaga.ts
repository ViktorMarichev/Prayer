import {all} from 'redux-saga/effects';
import {createColumnWatcher, columnsWatcher} from './Columns';
import {userWatcher} from './User';
import {
  prayersWatcher,
  createPrayerWatcher,
  deletePrayerWatcher,
  updatePrayerWatcher,
} from './Prayers';
import {getAllComments, createCommentWatcher} from './Comments';

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
