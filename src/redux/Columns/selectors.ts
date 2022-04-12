import {RootState} from '../store';
const getAll = (state: RootState) => {
  return state.columns.columnsList;
};
export default {
  getAll,
};
