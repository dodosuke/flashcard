import React from 'react';
import { Text, View, Platform } from 'react-native';

class DeckScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'test',
    title: 'Deck',
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
  }

  render() {
    return (
      <View>
        <Text> DeckScreen </Text>
        <Text> DeckScreen </Text>
        <Text> DeckScreen </Text>
        <Text> DeckScreen </Text>
      </View>
    );
  }
}

export default DeckScreen;
