import { AsyncStorage } from 'react';
import _ from 'lodash';
import { UPDATE_DECK } from './types';

const fetchScore = async () => {
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    if (value !== null) {
      console.log('test');
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const updateDeck = (cards) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_DECK, payload: _.sampleSize(cards, 20) });
  };
};

