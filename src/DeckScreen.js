import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Deck from './components/Deck';
import { Spinner } from './components/common';
import { updateCards, updateScore } from './actions';

class DeckScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: 'List',
      headerTitle: params ? params.header : '',
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Icon
            name="cards-outline"
            color={focused ? tintColor : 'grey'}
            size={28}
          />
        );
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = { back: 0 };
  }

  onSwipe = (direction, item) => {
    console.log(item);
    const memorized = (direction === 'right');
    this.props.updateScore(item, memorized);
    this.setState({ back: 0 });
  }

  renderCard = (card) => {
    return (
      <Card title={card.front} titleStyle={{ textAlign: 'left' }}>
        <Text style={{ marginBottom: 10, textAlign: 'left', opacity: this.state.back, color: 'red' }}>
          {card.back}
        </Text>
        <Button
          icon={{ name: 'replay' }}
          backgroundColor="#03A9F4"
          title="Check the Answer"
          onPress={() => this.setState({ back: 1 })}
        />
      </Card>
    );
  }

  renderNoMoreCards = () => {
    const deckID = this.props.navigation.getParam('deckID');
    return (
      <Card title="All Done">
        <Text style={{ marginBottom: 10, textAlign: 'center' }}>There&apos;s no more cards!</Text>
        <Button
          backgroundColor="#03A9F4"
          title="Get more!"
          onPress={() => this.props.updateCards(deckID)}
        />
      </Card>
    );
  }

  render() {
    if (this.props.loading) { return <Spinner />; }
    return (
      <Deck
        data={this.props.cards}
        renderCard={this.renderCard}
        renderNoMoreCards={this.renderNoMoreCards}
        onSwipe={this.onSwipe}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { cards, loading } = state.deck;
  return { cards, loading };
};

DeckScreen.propTypes = {
  updateScore: PropTypes.func.isRequired,
  updateCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    card_id: PropTypes.string.isRequired,
    front: PropTypes.string,
    back: PropTypes.string,
    score: PropTypes.number,
    deck_id: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, { updateCards, updateScore })(DeckScreen);
