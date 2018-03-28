import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';

class DeckScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: 'List',
      headerTitle: params ? params.header : '',
    };
  }

  renderCards = () => {
    return (
      <FlatList
        data={this.props.cards}
        keyExtractor={item => item.card_id}
        renderItem={({ item }) => (
          <ListItem
            title={item.front}
            subtitle={item.back}
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
