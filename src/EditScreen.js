import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { frontChanged, backChanged, updateCard } from './actions';
import { Card, CardSection, Button, Input, Spinner } from './components/common';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

class EditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'List',
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

  onButtonPress() {
    const { front, back } = this.props;

    console.log(front, back);
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
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (<Button onPress={() => this.onButtonPress()}>Login</Button>);
  }

  render() {
    const { card } = this.props;

    return (
      <Card>
        <CardSection>
          <Input
            label="Front"
            placeholder=""
            onChangeText={(text) => { this.props.frontChanged(text); }}
            value={this.props.front}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Back"
            placeholder=""
            onChangeText={(text) => { this.props.backChanged(text); }}
            value={this.props.back}
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

const mapStateToProps = ({ edit }) => {
  const { front, back, err } = edit;

  return { front, back, err };
};

EditScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  err: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { frontChanged, backChanged, updateCard })(EditScreen);
