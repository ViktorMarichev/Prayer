import {RootState} from '../store';

const columnsData = (state: RootState) => {
  return state.columns;
};
export default {
  columnsData,
};
