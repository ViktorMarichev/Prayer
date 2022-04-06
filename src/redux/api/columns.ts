import {apiInstance} from './instance';
type columnsParams = {
  token?: string;
};
export const Columns = {
  getAll: function (params: columnsParams = {}) {
    const {token} = params;
    const api = apiInstance({token});
    return api.get('/columns', {
      params: {token},
    });
  },
};
