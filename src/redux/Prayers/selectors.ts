import {RootState} from '../store';
const getAll = (state: RootState) => {
  return state.prayers;
};
export default {
  getAll,
};
