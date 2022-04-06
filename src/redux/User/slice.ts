import { createSlice } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';
export const login = createRoutine('user/LOG_IN');
export const Registration = createRoutine('user/SIGN_UP');

type authSignUpDto = {
  email?: string;
  password?: string;
  name?: string;
  status?: string;
  message?: string;
}
type UserState = {
  email: undefined | string;
  name: undefined | string;
  id: undefined | string;
  token: undefined | string;
  message: null | string;
  authSignUpDto: null | authSignUpDto
}
const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    email: undefined,
    name: undefined,
    id: undefined,
    token: undefined,
    message: null,
    authSignUpDto: null,
  } as UserState,
  reducers: {
    clearAuthSignUpDto: (state) => {
      state.authSignUpDto = null;
    }
  },
  extraReducers: {
    [login.SUCCESS]: (state, action) => {
      const { token, email, name, id } = action.payload;
      console.log(token);
      return { authSignUpDto: null, token, email, name, id, message: null };
    },
    [login.FAILURE]: (state, action) => {
      console.log(action.payload.message);
      return {
        email: undefined,
        name: undefined,
        id: undefined,
        token: undefined, message: action.payload.message,
        authSignUpDto: null,
      };
    },
    [Registration.SUCCESS]: (state, action) => {
      return {
        ...state,
        authSignUpDto: action.payload
      }
    },
    [Registration.FAILURE]: (state, action) => {
      return {
        ...state,
        authSignUpDto: {
          message: action.payload.message
        }
      }
    }
  },
});
export const actions = UserSlice.actions;
export default UserSlice.reducer;
