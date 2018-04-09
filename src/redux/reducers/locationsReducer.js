import * as types from '../types';

const initialState = [];

const reducer = (state = initialState, action) => {
  if (action.type === types.GOT_LOCATIONS) {
    return action.payload.locations;
  }
  return state;
};

export default reducer;
