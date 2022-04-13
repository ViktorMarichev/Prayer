import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import UserReducer from './User/index';
import CommentsReducer from './Comments/index';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import columnsReducer from './Columns/index';
import PrayersSlice from './Prayers/index';
import rootSaga from './sagas/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  user: UserReducer,
  columns: columnsReducer,
  prayers: PrayersSlice,
  comments: CommentsReducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
