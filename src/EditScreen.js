import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Card, CardSection, Input, Spinner } from './components/common';
import { updateCard } from './actions/DeckActions';

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
    };
  }

  onButtonPress() {
    const { front, back, cardID } = this.state;

    this.props.updateCard(front, back, cardID);
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
        title="UPDATE"
        containerViewStyle={{ flex: 1 }}
        onPress={() => this.onButtonPress()}
      />
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="front"
            placeholder=""
            onChangeText={(front) => { this.setState({ front }); }}
            value={this.state.front}
          />
        </CardSection>

        <CardSection>
          <Input
            label="back"
            placeholder=""
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
  updateCard: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  err: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { updateCard })(EditScreen);
