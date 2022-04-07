import { createSlice } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';
import Prayer from 'src/types/Prayer';
export const getPrayers = createRoutine('prayers/getAll');
export const createPrayer = createRoutine('prayers/create');
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
  reducers: {},
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
    }
  },
});

export default PrayersSlice.reducer;
