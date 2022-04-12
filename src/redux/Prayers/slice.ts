import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';
import Prayer from 'src/types/Prayer';
export const getPrayers = createRoutine('prayers/getAll');
export const createPrayer = createRoutine('prayers/create');
export const deletePrayer = createRoutine('prayers/delete');
export const updatePrayer = createRoutine('prayers/update');
type PrayerType = {
  prayersList: Array<Prayer>;
  message: string | null;
  editedPrayer: Prayer | null;
  requestStatus: string | null;
};
const PrayersSlice = createSlice({
  name: 'userSlice',
  initialState: {
    prayersList: [],
    message: null,
    editedPrayer: null,
    requestStatus: null,
  } as PrayerType,
  reducers: {
    clearMessage: state => {
      state.message = null;
    },
    setEditedPrayer: (state, action) => {
      state.editedPrayer = action.payload.prayer;
    },
    setRequestStatus: (state, action) => {
      state.requestStatus = action.payload.requestStatus;
    },
  },
  extraReducers: {
    [getPrayers.SUCCESS]: (state, action) => {
      state.prayersList = action.payload;
    },
    [getPrayers.FAILURE]: (state, action) => {
      console.log(action.payload.message);
      return {...state, message: action.payload.message};
    },
    [createPrayer.SUCCESS]: (state, action) => {
      return {prayersList: state.prayersList, message: action.payload.message};
    },
    [deletePrayer.SUCCESS]: (state, action) => {
      return {
        prayersList: state.prayersList.filter(elem => {
          return elem.id != action.payload.id;
        }),
        message: 'done',
      };
    },
    [deletePrayer.FAILURE]: (state, action) => {
      state.message = action.payload.message;
    },
    [updatePrayer.SUCCESS]: (state, action) => {
      const newPrayer: Prayer = action.payload;
      return {
        prayersList: state.prayersList.map(elem => {
          if (elem.id == newPrayer.id) {
            return newPrayer;
          }
          return elem;
        }),
      };
    },
    [updatePrayer.FAILURE]: (state, action) => {
      state.message = action.message;
    },
  },
});
export const actions = PrayersSlice.actions;
export default PrayersSlice.reducer;
