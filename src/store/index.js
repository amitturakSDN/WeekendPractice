import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { rootReducer } from '@/reducers';
import { storage } from '@/storage';
import logger from 'redux-logger';

const persistConfig = {
  timeout: null,
  keyPrefix: '',
  key: 'root',
  storage: storage,

  blacklist: ['error', 'status', 'loader'],
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(thunk, logger)
);

export const persistor = persistStore(store);
