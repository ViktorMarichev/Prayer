import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import UserReducer from './User/index';
import columnsReducer from './Columns/index';
import PrayersSlice from './Prayers/index';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  user: UserReducer,
  columns: columnsReducer,
  prayers: PrayersSlice,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
