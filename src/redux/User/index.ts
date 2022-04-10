import UserReducer from './slice';
import {actions} from './slice';
export {login} from './slice';
export const {logout} = actions;
export {default as UserSelectors} from './selectors';
export default UserReducer;
