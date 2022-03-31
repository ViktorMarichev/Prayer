import {RootState} from '../store';

const userData = (state: RootState) => {
  return state.user;
};
export default {
  userData,
};
