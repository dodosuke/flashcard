import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
      </View>
    );
  }
}

export default SettingScreen;
