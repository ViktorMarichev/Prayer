import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import Comment from 'src/types/Comment';
const getAll = (state: RootState) => {
  return state.comments.commentsList;
};
const filterCommentsById = (state: RootState, prayerId: number) => {
  return state.comments.commentsList
    .filter((comment: Comment) => {
      return comment.prayerId === prayerId;
    })
    .sort((a, b) => {
      let fa = new Date(a.created),
        fb = new Date(b.created);

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
};
const getCommentsByPrayerId = createSelector(
  filterCommentsById,
  getAll,
  comments => {
    return comments;
  },
);
export default {
  getAll,
  getCommentsByPrayerId,
};
