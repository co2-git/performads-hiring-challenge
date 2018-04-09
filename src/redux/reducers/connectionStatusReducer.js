import * as types from '../types';

const initialState = false;

const reducer = (state = initialState, action) => {
  if (action.type === types.CONNECTED_TO_DB) {
    return true;
  }
  return state;
};

export default reducer;
