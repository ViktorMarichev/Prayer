import { apiInstance } from './instance';
type SignInParams = {
  email?: string;
  password?: string;
};
type SignUpParams = {
  email?: string;
  password?: string;
  name?: string;
}
export const User = {
  login: function (params: SignInParams = {}) {
    const { email, password } = params;
    const api = apiInstance();
    return api.post(
      '/auth/sign-in',
      (params = {
        email,
        password,
      }),
    );
  },
  Registration: function (params: SignUpParams = {}) {
    const { email, password, name } = params;
    const api = apiInstance();
    return api.post(
      '/auth/sign-up',
      (
        params = {
          email,
          password,
          name,
        }
      )
    );
  }
};
