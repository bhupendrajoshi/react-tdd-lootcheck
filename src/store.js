import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import reducers from './reducers/';

const rootReducer = persistCombineReducers({
  key: 'root',
  storage,
}, reducers);

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
