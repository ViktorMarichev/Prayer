import {createRoutine} from 'redux-saga-routines';
import {createSlice} from '@reduxjs/toolkit';
export const getColumns = createRoutine('columns/GET_ALL');
const ColumnsSlice = createSlice({
  name: 'columnsSlice',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getColumns.SUCCESS]: (state, action) => {
      return (state = action.payload);
    },
    [getColumns.FAILURE]: (state, action) => {
      return {message: action.payload.message};
    },
  },
});
export default ColumnsSlice.reducer;
