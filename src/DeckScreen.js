import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Deck from './components/Deck';
import { Spinner } from './components/common';
import { pickCards, updateScore } from './actions';

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
            type="material-community"
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
    const memorized = (direction === 'right');
    this.props.updateScore(item, memorized);
    this.setState({ back: 0 });
  }

  renderCard = (card) => {
    return (
      <Card title={card.front} titleStyle={{ textAlign: 'left' }}>
        <Text style={{ opacity: this.state.back, marginBottom: 10, textAlign: 'left', color: 'red' }}>
          {card.back}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Button
            icon={{ name: 'replay' }}
            backgroundColor="#03A9F4"
            title="Check the Answer"
            containerViewStyle={{ flex: 1 }}
            onPress={() => this.setState({ back: 1 })}
          />
          <Icon
            name="pencil"
            type="material-community"
            color="grey"
            borderRadius={20}
            onPress={() => this.props.navigation.navigate('edit', { card })}
          />
        </View>
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
          onPress={() => this.props.pickCards(deckID, this.props.numOfCards)}
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
  const { cards, loading, numOfCards } = state.deck;
  return { cards, loading, numOfCards };
};

DeckScreen.propTypes = {
  updateScore: PropTypes.func.isRequired,
  pickCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  numOfCards: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    card_id: PropTypes.string.isRequired,
    front: PropTypes.string,
    back: PropTypes.string,
    score: PropTypes.number,
    deck_id: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, { pickCards, updateScore })(DeckScreen);
