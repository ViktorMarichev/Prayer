import {createRoutine} from 'redux-saga-routines';
import {createSlice} from '@reduxjs/toolkit';
import {Column} from 'src/types/Column';
export const getColumns = createRoutine('columns/GET_ALL');
export const createColumn = createRoutine('columns/CREATE');
type ColumnsType = {
  columnsList: Array<Column>;
  message: null | string;
  requestStatus: null | string;
};
const ColumnsSlice = createSlice({
  name: 'columnsSlice',
  initialState: {
    columnsList: [],
    requestStatus: null,
    message: null,
  } as ColumnsType,
  reducers: {
    setRequestStatus: (state, action) => {
      state.requestStatus = action.payload.requestStatus;
    },
  },
  extraReducers: {
    [getColumns.SUCCESS]: (state, action) => {
      state.columnsList = action.payload;
    },
    [getColumns.FAILURE]: (state, action) => {
      return {message: action.payload.message};
    },
    [createColumn.SUCCESS]: (state, action) => {
      const newColumn: Column = action.payload;
      delete newColumn.user;
      state.columnsList.push(newColumn);
    },
    [createColumn.FAILURE]: (state, action) => {
      state.message = action.payload.message;
    },
  },
});
export const actions = ColumnsSlice.actions;
export default ColumnsSlice.reducer;
