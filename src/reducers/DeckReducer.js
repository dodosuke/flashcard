import { UPDATE_CARDS, FETCH_START, FETCH_FAIL, FETCH_SUCCESS, UPDATE_LISTS } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  err: '',
  list: [],
  cards: [],
  numOfCards: 20,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CARDS:
      return { ...state, cards: action.payload };
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false };
    case FETCH_FAIL:
      return { ...state, loading: false, err: action.payload };
    case UPDATE_LISTS:
      return { ...state, loading: false, list: action.payload };
    default:
      return state;
  }
};

