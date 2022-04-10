import {createRoutine} from 'redux-saga-routines';
import {createSlice} from '@reduxjs/toolkit';
import Comment from 'src/types/Comment';
export const getComments = createRoutine('comments/GET_ALL');

type CommentType = {
  commentsList: Array<Comment>;
  message: null | string;
};
const CommentSlice = createSlice({
  name: 'columnsSlice',
  initialState: {
    commentsList: [],
    message: null,
  } as CommentType,
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
