import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import ListScreen from './src/ListScreen';
import DeckScreen from './src/DeckScreen';
import SettingScreen from './src/SettingScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
});

const tabNavConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
  },
};

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      main: StackNavigator({
        list: { screen: ListScreen },
        deck: { screen: DeckScreen },
      }),
      setting: StackNavigator({
        setting: { screen: SettingScreen },
      }),
    }, tabNavConfig);

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
