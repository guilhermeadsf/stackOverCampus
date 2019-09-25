import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import multi from 'redux-multi';
import reducers from './reducers';
import storage from 'redux-persist/lib/storage';

const middlewares = [multi, thunk];

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(...middlewares))
);

export const loja = store;
export const persistor = persistStore(store);
