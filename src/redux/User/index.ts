import UserReducer from './slice';
import { actions } from './slice';
export { login, Registration } from './slice';
export const { clearAuthSignUpDto } = actions;
export { default as UserSelectors } from './selectors';
export default UserReducer;
