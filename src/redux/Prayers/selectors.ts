import { createSelector } from '@reduxjs/toolkit';
import Prayer from '../../types/Prayer';
import { RootState } from '../store';
const getAll = (state: RootState) => {
  return state.prayers;
};
const getCheckedPrayers = (state: RootState, columnId: number) => {
  console.log('checkedPrayers selector', state.prayers.prayersList);
  return state.prayers.prayersList.filter((prayer: Prayer) => {
    return prayer.checked && prayer.columnId === columnId;
  }).sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });;
};
const getNotCheckedPrayers = (state: RootState, columnId: number) => {
  return state.prayers.prayersList.filter((prayer: Prayer) => {
    return !prayer.checked && prayer.columnId === columnId;
  }).sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
};
const filterCardsById = (state: RootState, columnId: number) => {
  return state.prayers.prayersList.filter((prayer: Prayer) => {
    return prayer.columnId === columnId;
  });
};
const getPrayersByColumnId = createSelector(filterCardsById, prayers => {
  return prayers;
});
const getCheckedPrayersSelector = createSelector(getCheckedPrayers, prayers => {
  return prayers
});
const getNotCheckedPrayersSelector = createSelector(getNotCheckedPrayers, prayers => {
  return prayers
});
export default {
  getAll,
  getPrayersByColumnId,
  getCheckedPrayers: getCheckedPrayersSelector,
  getNotCheckedPrayers: getNotCheckedPrayersSelector,
};
