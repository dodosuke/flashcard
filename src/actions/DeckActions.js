import { SQLite } from 'expo';
import _ from 'lodash';
import { UPDATE_CARDS, UPDATE_LISTS, FETCH_START, FETCH_SUCCESS } from './types';

const db = SQLite.openDatabase('flashcard.db');

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = (c === 'x') ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const fetchStart = (dispatch) => { dispatch({ type: FETCH_START }); };
const fetchSuccess = (dispatch) => { dispatch({ type: FETCH_SUCCESS }); };

const updateList = (dispatch, list) => {
  dispatch({ type: UPDATE_LISTS, payload: list });
};

const createTable = () => {
  const createDeck = 'create table if not exists deck (' +
    'deck_id string primary key not null, ' +
    'name text, ' +
    'value int' +
    ');';
  const createCard = 'create table if not exists card (' +
    'card_id string primary key not null, ' +
    'front text,' +
    'back text,' +
    'score int, ' +
    'deck_id string, foreign key (deck_id) references deck (deck_id)' +
    ');';

  db.transaction(
    (tx) => {
      tx.executeSql(createDeck);
      tx.executeSql(createCard);
    },
    (err) => { console.log(`failed to create: ${err}`); },
    () => console.log('successfully created table'),
  );
};

export const dropTables = () => async () => {
  db.transaction(
    (tx) => {
      tx.executeSql('drop table deck');
      tx.executeSql('drop table card');
    },
    // create table when there is no table
    (err) => { alert(err); },
  );
};

export const readList = () => async (dispatch) => {
  db.transaction(
    (tx) => {
      tx.executeSql('select * from deck;', [], (t, { rows }) => updateList(dispatch, rows._array));
    },
    // create table when there is no table
    (err) => { createTable(); },
  );
};

const update = (dispatch) => {
  db.transaction((tx) => {
    tx.executeSql('select * from deck;', [], (t, { rows }) => updateList(dispatch, rows._array));
  });
};

export const addDeck = cards => async (dispatch) => {
  const deckID = uuidv4();
  await db.transaction(
    (tx) => {
      tx.executeSql('insert into deck (deck_id, name, value) values (?, ?, ?);', [deckID, 'test', cards.length]);
      cards.forEach((card) => {
        tx.executeSql(
          'insert into card (card_id, front, back, score, deck_id) values (?, ?, ?, ?, ?);',
          [uuidv4(), card.value.front, card.value.back, 0, deckID],
        );
      });
    },
    (err) => { console.log(`failed to add item: ${err}`); },
    // Refresh the deck list when finished adding new deck
    () => update(dispatch),
  );
};

export const deleteDeck = deckID => async (dispatch) => {
  await db.transaction(
    (tx) => {
      tx.executeSql('delete from card where deck_id = ?;', [deckID]);
      tx.executeSql('delete from deck where deck_id = ?;', [deckID]);
    },
    (err) => { console.log(err); },
    () => update(dispatch),
  );
};

export const updateScore = (card, memorized) => async () => {
  // +1 if memorized; -2 if forgot
  const newScore = (memorized) ? card.score + 1 : card.score - 2;
  await db.transaction(
    (tx) => { tx.executeSql('update card set score = ? where card_id = ?;', [newScore, card.card_id]); },
    (err) => { alert(err); },
  );
};

export const updateCards = deckID => async (dispatch) => {
  fetchStart(dispatch);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'select * from card where deck_id = ?',
        [deckID],
        (t, { rows }) => dispatch({ type: UPDATE_CARDS, payload: _.sampleSize(rows._array, 10) }),
      );
    },
    // create table when there is no table
    (err) => { alert(err); },
    // Change the loading state when finished shuffling cards
    () => fetchSuccess(dispatch),
  );
};

