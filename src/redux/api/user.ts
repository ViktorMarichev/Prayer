import {apiInstance} from './instance';
type UserParams = {
  email?: string;
  password?: string;
};
export const User = {
  login: function (params: UserParams = {}) {
    const {email, password} = params;
    const api = apiInstance();
    return api.post(
      '/auth/sign-in',
      (params = {
        email,
        password,
      }),
    );
  },
};
