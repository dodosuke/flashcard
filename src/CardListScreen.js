import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, CheckBox, Button } from 'react-native-elements';
import { Spinner } from './components/common';
import { updateCard, pickCards } from './actions/DeckActions';

class CardListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const card = {
      front: '',
      back: '',
      score: 0,
      card_id: null,
      deck_id: navigation.getParam('deckID'),
    };
    return {
      title: 'List',
      headerRight: (
        <Button
          title="Add"
          color="rgba(0, 122, 255, 1)"
          backgroundColor="transparent"
          onPress={() => navigation.navigate('edit', { card })}
        />
      ),
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

  onIconPress = (card) => {
    const {
      front,
      back,
      score,
      card_id,
    } = card;
    const deckID = this.props.navigation.getParam('deckID');

    if (score < 3) {
      this.props.updateCard(front, back, 3, card_id);
    } else {
      this.props.updateCard(front, back, 0, card_id);
    }
    this.props.pickCards(deckID, null);
  }

  renderList = () => {
    if (this.props.loading) { return <Spinner />; }
    return (
      <FlatList
        data={this.props.cards}
        keyExtractor={item => item.card_id}
        renderItem={({ item }) => (
          <CheckBox
            title={item.front}
            checked={(item.score < 3)}
            onIconPress={() => this.onIconPress(item)}
            onPress={() => this.props.navigation.navigate('edit', { card: item })}
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
  const { cards, loading } = state.deck;

  return { cards, loading };
};

CardListScreen.propTypes = {
  updateCard: PropTypes.func.isRequired,
  pickCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    card_id: PropTypes.string.isRequired,
    front: PropTypes.string,
    back: PropTypes.string,
    score: PropTypes.number,
    deck_id: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, { updateCard, pickCards })(CardListScreen);
