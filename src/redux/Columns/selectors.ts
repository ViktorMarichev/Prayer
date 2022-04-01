import {RootState} from '../store';
const getAll = (state: RootState) => {
  return state.columns;
};
export default {
  getAll,
};
