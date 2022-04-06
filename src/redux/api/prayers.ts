import {apiInstance} from './instance';
type prayersParams = {
  token?: string;
};
export const Prayers = {
  getAll: function (params: prayersParams = {}) {
    const {token} = params;
    const api = apiInstance({token});
    return api.get('/prayers', {
      params: {token},
    });
  },
};
