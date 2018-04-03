import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';
import DeckListScreen from './src/DeckListScreen';
import DeckScreen from './src/DeckScreen';
import EditScreen from './src/EditScreen';
import SettingScreen from './src/SettingScreen';
import CardListScreen from './src/CardListScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const tabNavConfig = {
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
  },
};

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      main: StackNavigator({
        dlist: { screen: DeckListScreen },
        clist: { screen: CardListScreen },
        deck: { screen: DeckScreen },
        edit: { screen: EditScreen },
      }),
      setting: StackNavigator({
        setting: { screen: SettingScreen },
      }),
    }, tabNavConfig);

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
