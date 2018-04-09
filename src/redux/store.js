import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';

import * as reducers from './reducers';

const combinedStores = combineReducers(reducers);
const middlewares = [];

const store = createStore(combinedStores, applyMiddleware(...middlewares));

export default store;

export const dispatch = (type, payload) => store.dispatch({type, payload});
