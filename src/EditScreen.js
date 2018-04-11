import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, ButtonGroup } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Card, CardSection, Input, Spinner } from './components/common';
import { updateCard, insertCard, pickCards } from './actions/DeckActions';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

class EditScreen extends Component {
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

  constructor(props) {
    super(props);

    const card = props.navigation.getParam('card');

    this.state = {
      front: card.front,
      back: card.back,
      cardID: card.card_id,
      score: card.score,
      deckID: card.deck_id,
    };
  }

  onButtonPress() {
    const {
      front,
      back,
      cardID,
      score,
      deckID,
    } = this.state;

    if (cardID === null) {
      this.props.insertCard(front, back, score, deckID);
      this.props.pickCards(deckID, null);
    } else {
      this.props.updateCard(front, back, score, cardID);
    }
  }

  renderError() {
    if (this.props.err) {
      return (
        <View syle={{ backgroundColor: 'white' }} >
          <Text style={styles.errorTextStyle}>
            {this.props.err}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderButton() {
    if (this.props.loading) { return <Spinner size="large" />; }

    return (
      <Button
        title={(this.state.cardID === null) ? 'ADD' : 'UPDATE'}
        containerViewStyle={{ flex: 1 }}
        onPress={() => this.onButtonPress()}
      />
    );
  }

  render() {
    return (
      <Card>
        <ButtonGroup
          selectedIndex={0}
          buttons={['front', 'back']}
          containerStyle={{ height: 30 }}
        />
        <CardSection>
          <Input
            label="front"
            onChangeText={(front) => { this.setState({ front }); }}
            value={this.state.front}
          />
        </CardSection>

        <CardSection>
          <Input
            label="back"
            onChangeText={(back) => { this.setState({ back }); }}
            value={this.state.back}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { err, loading } = state.deck;

  return { err, loading };
};

EditScreen.propTypes = {
  insertCard: PropTypes.func.isRequired,
  pickCards: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  err: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { updateCard, insertCard, pickCards })(EditScreen);
