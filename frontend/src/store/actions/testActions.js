import { ADD_ITEM } from './actionTypes';

export const addTestItem = (item) => {
  return (dispatch, getState) => {
    // make async code to database

    dispatch({
      type: ADD_ITEM,
      item,
    });
  };
};
