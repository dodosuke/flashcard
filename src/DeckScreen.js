import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';

class DeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Deck List',
    headerTitle: '',
  }

  renderCards = () => {
    return (
      <FlatList
        data={this.props.cards}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <ListItem
            title={item.value.front}
            subtitle={item.value.back}
          />
        )}
      />
    );
  }

  render() {
    return (
      this.renderCards()
    );
  }
}

const mapStateToProps = (state) => {
  const { cards } = state.deck;

  return { cards };
};

export default connect(mapStateToProps, null)(DeckScreen);
