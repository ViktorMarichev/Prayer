import {createSelector} from '@reduxjs/toolkit';
import Prayer from '../../types/Prayer';
import {RootState} from '../store';
const getAll = (state: RootState) => {
  return state.prayers;
};
const getCheckedPrayers = (state: RootState) => {
  return state.prayers.filter((prayer: Prayer) => {
    return prayer.checked;
  });
};
const getNotCheckedPrayers = (state: RootState) => {
  return state.prayers.filter((prayer: Prayer) => {
    return !prayer.checked;
  });
};
const filterCardsById = (state: RootState, columnId: number) => {
  return state.prayers.filter((prayer: Prayer) => {
    return prayer.columnId === columnId;
  });
};
const getPrayersByColumnId = createSelector(filterCardsById, prayers => {
  return prayers;
});
export default {
  getAll,
  getPrayersByColumnId,
  getCheckedPrayers,
  getNotCheckedPrayers,
};
