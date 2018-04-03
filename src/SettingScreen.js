import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { Form, Picker, Item } from 'native-base';
import { addDeck, dropTables } from './actions';

class SettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
    tabBarIcon: ({ focused, tintColor }) => {
      return (
        <Icon
          name="settings"
          type="simple-line-icon"
          color={focused ? tintColor : 'grey'}
          size={25}
        />
      );
    },
  }

  constructor(props) {
    super(props);

    this.state = { numOfCards: props.numOfCards };
  }

  onValueChange(value) {
    this.setState({ numOfCards: value });
  }

  render() {
    return (
      <View>
        <Form>
          <Picker
            mode="dropdown"
            placeholder="Number of Cards"
            selectedValue={this.state.numOfCards}
            onValueChange={value => this.onValueChange(value)}
          >
            <Item label="Number of Cards: 10" value={10} />
            <Item label="Number of Cards: 20" value={20} />
            <Item label="Number of Cards: 30" value={30} />
          </Picker>
        </Form>
        {/* <ListItem title="Drop Tables" onPress={() => this.props.dropTables()} /> */}
        {/* <ListItem title="Add data" onPress={() => this.props.addDeck('https://mighty-cliffs-26134.herokuapp.com/json')} /> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { numOfCards } = state.deck;

  return { numOfCards };
};

SettingScreen.propTypes = {
  numOfCards: PropTypes.number.isRequired,
  addDeck: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { dropTables, addDeck })(SettingScreen);
