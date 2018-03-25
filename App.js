import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ListScreen from './src/ListScreen';
import DeckScreen from './src/DeckScreen';
import SettingScreen from './src/SettingScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends React.Component {
  render() {
    const MainNavigator = StackNavigator({
      main: TabNavigator({
        list: { screen: ListScreen },
        deck: { screen: DeckScreen },
        setting: { screen: SettingScreen },
      }),
    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}
