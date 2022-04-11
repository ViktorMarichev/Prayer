import {apiInstance} from './instance';
type getCommentsParams = {
  token?: string;
};
type createCommentParams = {
  token: string;
  body: string;
  created: string;
  prayerId: string;
};
export const Comments = {
  getAll: function (params: getCommentsParams = {}) {
    const {token} = params;
    const api = apiInstance({token});
    return api.get('/comments', {
      params: {token},
    });
  },
  create: function (params: createCommentParams) {
    const {token, body, created, prayerId} = params;
    const api = apiInstance({token});
    return api.post('/comments', {body, created, prayerId});
  },
};
