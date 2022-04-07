import { createSelector } from '@reduxjs/toolkit';
import Prayer from '../../types/Prayer';
import { RootState } from '../store';
const getAll = (state: RootState) => {
  return state.prayers;
};
const getCheckedPrayers = (state: RootState, columnId: number) => {
  return state.prayers.filter((prayer: Prayer) => {
    return prayer.checked && prayer.columnId === columnId;
  });
};
const getNotCheckedPrayers = (state: RootState, columnId: number) => {
  return state.prayers.filter((prayer: Prayer) => {
    return !prayer.checked && prayer.columnId === columnId;
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
