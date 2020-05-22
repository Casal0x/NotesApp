import { ADD_ITEM } from '../actions/actionTypes';

const initialState = {
  testData: [
    { id: '1', title: 'test1', description: 'bla bla 1' },
    { id: '2', title: 'test2', description: 'bla bla 2' },
  ],
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { testData: [...state.testData, action.item] };
    default:
      return state;
  }
};

export default testReducer;
