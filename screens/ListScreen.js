import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class ListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Deck List',
      headerRight: <Button title="Deck" onPress={() => navigation.navigate('deck')} />,
    };
  }

  render() {
    return (
      <View>
        <Text> ListScreen </Text>
        <Text> ListScreen </Text>
        <Text> ListScreen </Text>
        <Text> ListScreen </Text>
      </View>
    );
  }
}

export default ListScreen;
