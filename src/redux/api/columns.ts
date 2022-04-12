import {apiInstance} from './instance';
type columnsParams = {
  token?: string;
};
type createColumnParams = {
  token: string;
  title: string;
  description: string;
};
export const Columns = {
  getAll: function (params: columnsParams = {}) {
    const {token} = params;
    const api = apiInstance({token});
    return api.get('/columns', {
      params: {token},
    });
  },
  create: function (params: createColumnParams) {
    const {token, title, description} = params;
    const api = apiInstance({token});
    return api.post('/columns', {
      title,
      description,
    });
  },
};
