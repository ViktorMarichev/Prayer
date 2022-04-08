import { createSlice } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';
import Prayer from 'src/types/Prayer';
export const getPrayers = createRoutine('prayers/getAll');
export const createPrayer = createRoutine('prayers/create');
export const deletePrayer = createRoutine('prayers/delete');
type PrayerType = {
  prayersList: Array<Prayer>,
  message: string | null,
}
const PrayersSlice = createSlice({
  name: 'userSlice',
  initialState: {
    prayersList: [],
    message: null
  } as PrayerType,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },

  },
  extraReducers: {
    [getPrayers.SUCCESS]: (state, action) => {
      state.prayersList = action.payload;
    },
    [getPrayers.FAILURE]: (state, action) => {
      console.log(action.payload.message);
      return { ...state, message: action.payload.message };
    },
    [createPrayer.SUCCESS]: (state, action) => {
      return state.message = action.payload.message;
    },
    [deletePrayer.SUCCESS]: (state, action) => {
      const newPrayerList = state.prayersList.filter((elem) => {
        return elem.id != action.payload.id
      })
      return { prayersList: newPrayerList, message: 'done', }
    },
    [deletePrayer.FAILURE]: (state, action) => {
      state.message = action.payload.message;
    }
  },
});
export const actions = PrayersSlice.actions;
export default PrayersSlice.reducer;
