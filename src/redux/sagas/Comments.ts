import {call, put, takeLatest} from 'redux-saga/effects';
import Comment from 'src/types/Comment';
import {Comments} from '../api/comments';
import {getComments, createComment} from '../Comments/index';

type getCommentsAction = ReturnType<typeof getComments>;
type createCommentAction = ReturnType<typeof createComment>;

function* getCommentsWorker(action: getCommentsAction) {
  const {token} = action.payload;

  const {success, failure} = getComments;
  try {
    const {data: commentArray} = yield call(Comments.getAll, {token});
    if (commentArray.message) {
      yield put(failure({message: commentArray.message}));
    } else {
      yield put(success(commentArray));
    }
  } catch (error) {
    console.error(error);
    yield put(failure({message: (error as Error).message}));
  }
}

function* createCommentWorker(action: createCommentAction) {
  const {token, body, created, prayerId} = action.payload;
  const {success, failure} = createComment;
  try {
    const {data: response} = yield call(Comments.create, {
      token,
      body,
      created,
      prayerId,
    });
    if (response.message) {
      yield put(failure({message: response.message}));
    } else {
      const {id, body, created, prayerId, userId} = response;
      const comment: Comment = {
        id,
        body,
        created,
        prayerId,
        userId,
      };

      yield put(success({comment}));
    }
  } catch (error) {
    console.error(error);
    yield put(failure({message: (error as Error).message}));
  }
}
export function* getAllComments() {
  yield takeLatest(getComments.TRIGGER, getCommentsWorker);
}
export function* createCommentWatcher() {
  yield takeLatest(createComment.TRIGGER, createCommentWorker);
}
