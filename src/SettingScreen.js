import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Icon, ButtonGroup, ListItem } from 'react-native-elements';

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

    this.state = { selectedIndex: 0 };
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const buttons = ['10', '20', '30'];

    return (
      <List>
        <ListItem
          title="Number of Cards"
        />
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  const { numOfCards } = state.deck;

  return { numOfCards };
};

SettingScreen.propTypes = {
  numOfCards: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(SettingScreen);
