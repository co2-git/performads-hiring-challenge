import * as data from 'maeva';
import connector from 'maeva-json';

import config from '../../config.json';
import UserModel from '../models/users';
import {dispatch} from './store';
import * as types from './types';

export const login = async ({email, password}) => {
  try {
    const user = await data.findOne(UserModel, {email, password});
    if (user) {
      dispatch(types.LOGGED_IN, {user});
      getLocations();
    } else {
      dispatch(types.NO_SUCH_USER, {email, password});
    }
  } catch (error) {
    dispatch(types.FAILED_LOGGED_IN, {error});
  }
};

export const connect = async () => {
  try {
    data.connect(connector());
    await data.insertOne(UserModel, config.test.account);
    dispatch(types.CONNECTED_TO_DB);
  } catch (error) {
    dispatch(types.FAILED_CONNECTED_TO_DB, {error});
  }
};

export const getLocations = async () => {
  try {
    const response = await fetch(`${config.facebook.url}${config.facebook.token}`);
    const {data: locations} = await response.json();
    dispatch(types.GOT_LOCATIONS, {locations});
  } catch (error) {
    dispatch(types.FAILED_GETTING_LOCATIONS, {error});
  }
};
