import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { addDeck, dropTables } from './actions';
import data from '../assets/data';

class SettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
    tabBarIcon: ({ focused, tintColor }) => {
      return (
        <Icon
          name="settings"
          color={focused ? tintColor : 'grey'}
          size={25}
        />
      );
    },
  }

  render() {
    return (
      <View>
        <ListItem title="Number of Cards" />
        <ListItem title="Drop Tables" onPress={() => this.props.dropTables()} />
        <ListItem title="add data" onPress={() => this.props.addDeck(data)} />
      </View>
    );
  }
}

export default connect(null, { dropTables, addDeck })(SettingScreen);
