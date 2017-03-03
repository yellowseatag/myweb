import * as testService from '../services/test';

export default {
  namespace: 'test',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { data: list,total,page} }) {
      return { ...state, list,total,page };
    },
  },
  effects: {
    *fetch({ payload:{page=1} }, { call, put }) {
      const { data } = yield call(testService.fetch, page);
      yield put({
        type: 'save',
        payload: {
          data:data.data.list,
          total:parseInt(data.data.total, 10),
          page: parseInt(page, 10),
        },
      });
    },
    *create({ payload: values }, { call, put }) {
      yield call(testService.create, values);
      yield put({ type: 'reload'});
    },
    *remove({ payload: id }, { call, put }) {
      yield call(testService.remove, {'id':id});
      yield put({ type: 'reload'});
    },
    *edit({ payload: {values,id} }, { call,select, put }){
      yield call(testService.edit,values,id);
      yield put({type:'reload'});
    },
    *reload({},{put,select}){
      const page=yield select(state=>state.test.page);
      yield put({type:'fetch',payload:{page} });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/test') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
