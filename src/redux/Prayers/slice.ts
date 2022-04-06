import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';
export const getPrayers = createRoutine('prayers/getAll');
const PrayersSlice = createSlice({
  name: 'userSlice',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getPrayers.SUCCESS]: (state, action) => {
      return (state = action.payload);
    },
    [getPrayers.FAILURE]: (state, action) => {
      console.log(action.payload.message);
      return {...state, message: action.payload.message};
    },
  },
});

export default PrayersSlice.reducer;
