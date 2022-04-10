import {createRoutine} from 'redux-saga-routines';
import {createSlice} from '@reduxjs/toolkit';
export const getComments = createRoutine('comments/GET_ALL');
const CommentSlice = createSlice({
  name: 'columnsSlice',
  initialState: {
    commentsList: [],
  },
  reducers: {},
  extraReducers: {
    [getComments.SUCCESS]: (state, action) => {
      return (state.commentsList = action.payload);
    },
    [getComments.FAILURE]: (state, action) => {
      return {commentsList: [], message: action.payload.message};
    },
  },
});
export default CommentSlice.reducer;
