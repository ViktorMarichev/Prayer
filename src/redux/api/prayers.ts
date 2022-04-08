import { apiInstance } from './instance';
type prayersParams = {
  token?: string;
};
type createPrayerParams = {
  title: string,
  description: string,
  checked: boolean,
  columnId: number,
  token?: string,
};
type deletePrayerParams = {
  id: number;
  token: string;
}
export const Prayers = {
  getAll: function (params: prayersParams = {}) {
    const { token } = params;
    const api = apiInstance({ token });
    return api.get('/prayers', {
      params: { token },
    });
  },
  create: function (params: createPrayerParams) {
    const { token, title, description, checked, columnId } = params;
    const api = apiInstance({ token });
    return api.post('/prayers', (params = {
      title,
      description,
      checked,
      columnId,
    }));
  },
  delete: function (params: deletePrayerParams) {
    const { token, id } = params;
    const api = apiInstance({ token });
    return api.delete('/prayers/' + id);
  },
};
