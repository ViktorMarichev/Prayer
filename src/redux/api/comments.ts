import {apiInstance} from './instance';
type commentsParams = {
  token?: string;
};
export const Comments = {
  getAll: function (params: commentsParams = {}) {
    const {token} = params;
    const api = apiInstance({token});
    return api.get('/comments', {
      params: {token},
    });
  },
};
