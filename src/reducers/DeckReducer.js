import { UPDATE_DECK } from '../actions/types';

const INITIAL_STATE = {
  cards: [],
  numOfCards: 20,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DECK:
      return { ...state, cards: action.payload };
    default:
      return state;
  }
};

