import {RootState} from '../store';
const getAll = (state: RootState) => {
  return state.comments;
};
export default {
  getAll,
};
