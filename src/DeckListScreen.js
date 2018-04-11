import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListItem, Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { pickCards, readList, deleteDeck } from './actions';
import { Spinner, SwipeButton } from './components/common';

class DeckListScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'List',
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Icon
            name="cards-outline"
            type="material-community"
            color={focused ? tintColor : 'grey'}
            size={28}
          />
        );
      },
    };
  }

  componentWillMount() {
    this.props.readList();
  }

  callDeck = (item) => {
    this.props.pickCards(item.deck_id, this.props.numOfCards);
    this.props.navigation.navigate('deck', { header: item.name, deckID: item.deck_id });
  }

  editName = (deckID) => {
    this.props.pickCards(deckID, null);
    this.props.navigation.navigate('clist', { deckID });
  }

  rightButtons = (deckID) => {
    return ([
      <SwipeButton
        name="pencil"
        backgroundColor="grey"
        onPress={() => this.editName(deckID)}
      />,
      <SwipeButton
        name="delete"
        backgroundColor="red"
        onPress={() => this.props.deleteDeck(deckID)}
      />,
    ]);
  }

  renderList = () => {
    if (this.props.loading) { return <Spinner />; }
    return (
      <FlatList
        data={this.props.list}
        keyExtractor={item => item.deck_id}
        renderItem={({ item }) => (
          <Swipeable
            rightButtonWidth={55}
            rightButtons={this.rightButtons(item.deck_id)}
          >
            <ListItem
              title={item.name}
              subtitle={`${item.value} cards`}
              onPress={() => this.callDeck(item)}
            />
          </Swipeable>
        )}
      />
    );
  }

  render() {
    return (
      this.renderList()
    );
  }
}

const mapStateToProps = (state) => {
  const { list, loading, numOfCards } = state.deck;

  return { list, loading, numOfCards };
};

DeckListScreen.propTypes = {
  numOfCards: PropTypes.number,
  pickCards: PropTypes.func.isRequired,
  deleteDeck: PropTypes.func.isRequired,
  readList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { pickCards, readList, deleteDeck })(DeckListScreen);
