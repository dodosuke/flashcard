import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ListScreen from './screens/ListScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          screen: StackNavigator({
            list: { screen: ListScreen },
            deck: { screen: DeckScreen },
          }),
          setting: { screen: SettingScreen },
        }),
      },
    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}
