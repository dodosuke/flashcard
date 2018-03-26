import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../assets/data';
import { updateDeck } from './actions/DeckAction';

class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Deck List',
    tabBarIcon: ({ focused, tintColor }) => {
      return (
        <Icon
          name="cards-outline"
          color={focused ? tintColor : 'grey'}
          size={28}
        />
      );
    },
  }

  callDeck = (item) => {
    this.props.updateDeck(item.cards);
    this.props.navigation.navigate('deck', { header: item.name });
  }

  renderList = () => {
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={`${item.cards.length} cards`}
            onPress={() => this.callDeck(item)}
          />
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
  const { shuffled, numOfCards } = state.deck;

  return { shuffled, numOfCards };
};

export default connect(null, { updateDeck })(ListScreen);
