import React from 'react';
import { Text, View, Platform } from 'react-native';

class SettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
  }

  render() {
    return (
      <View>
        <Text> SettingScreen </Text>
        <Text> SettingScreen </Text>
        <Text> SettingScreen </Text>
        <Text> SettingScreen </Text>
      </View>
    );
  }
}

export default SettingScreen;
