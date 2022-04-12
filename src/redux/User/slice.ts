import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';
export const login = createRoutine('user/LOG_IN');

type UserType = {
  email: string | undefined;
  name: string | undefined;
  id: string | undefined;
  token: string | undefined;
  message: null | string;
  requestStatus: null | string;
};

const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    email: undefined,
    name: undefined,
    id: undefined,
    token: undefined,
    message: null,
    requestStatus: null,
  } as UserType,
  reducers: {
    logout: state => {
      return {
        email: undefined,
        name: undefined,
        id: undefined,
        token: undefined,
        message: null,
        requestStatus: null,
      };
    },
    setRequestStatus: (state, action) => {
      state.requestStatus = action.payload.requestStatus;
    },
  },
  extraReducers: {
    [login.SUCCESS]: (state, action) => {
      const {token, email, name, id} = action.payload;
      console.log(token);
      return {
        ...state,
        token,
        email,
        name,
        id,
        message: null,
        requestStatus: null,
      };
    },
    [login.FAILURE]: (state, action) => {
      console.log(action.payload.message);
      return {
        email: undefined,
        name: undefined,
        id: undefined,
        token: undefined,
        message: action.payload.message,
        requestStatus: null,
      };
    },
  },
});
export const actions = UserSlice.actions;
export default UserSlice.reducer;
