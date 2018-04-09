import * as types from '../types';

const initialState = null;

const reducer = (state = initialState, action) => {
  if (action.type === types.LOGGED_IN) {
    return action.payload.user;
  }
  return state;
};

export default reducer;
