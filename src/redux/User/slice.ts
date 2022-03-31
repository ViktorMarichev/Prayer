import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';
export const login = createRoutine('user/LOG_IN');
const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    email: undefined,
    name: undefined,
    id: undefined,
    token: undefined,
    message: null,
  },
  reducers: {},
  extraReducers: {
    [login.SUCCESS]: (state, action) => {
      const {token, email, name, id} = action.payload;
      console.log(token);
      return {...state, token, email, name, id, message: null};
    },
    [login.FAILURE]: (state, action) => {
      console.log(action.payload.message);
      return {...state, message: action.payload.message};
    },
  },
});

export default UserSlice.reducer;
