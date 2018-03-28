import { SQLite } from 'expo';
import _ from 'lodash';
import { UPDATE_CARDS, UPDATE_LISTS } from './types';

const db = SQLite.openDatabase('flashcard.db');

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = (c === 'x') ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

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
      tx.executeSql('select * from deck', [], (t, { rows }) => updateList(dispatch, rows._array));
    },
    // create table when there is no table
    () => createTable(),
  );
};

export const addDeck = cards => async (dispatch) => {
  const deckID = uuidv4();
  await db.transaction(
    (tx) => {
      tx.executeSql('insert into deck (deck_id, name, value) values (?, ?, ?)', [deckID, 'test', cards.length]);
      cards.forEach((card) => {
        tx.executeSql(
          'insert into card (card_id, front, back, score, deck_id) values (?, ?, ?, ?, ?)',
          [uuidv4(), card.value.front, card.value.back, 0, deckID],
        );
      });
    },
    (err) => { console.log(`failed to add item: ${err}`); },
    // Refresh the deck list when finished adding new deck
    () => db.transaction((tx) => {
      tx.executeSql('select * from deck', [], (t, { rows }) => updateList(dispatch, rows._array));
    }),
  );
};

export const deleteDeck = deckID => async (dispatch) => {
  await db.transaction(
    (tx) => {
      tx.executeSql('delete from card where deck_id = ?', [deckID]);
      tx.executeSql('delete from deck where deck_id = ?', [deckID]);
    },
    (err) => { console.log(err); },
    () => db.transaction((tx) => {
      tx.executeSql('select * from deck', [], (t, { rows }) => updateList(dispatch, rows._array));
    }),
  );
};

export const updateCards = deckID => async (dispatch) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'select * from card where deck_id = ?',
        [deckID],
        (t, { rows }) => dispatch({ type: UPDATE_CARDS, payload: _.sampleSize(rows._array, 20) }),
      );
    },
    // create table when there is no table
    (err) => { alert(err); },
  );
};

