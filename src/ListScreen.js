import React from 'react';
import { FlatList, Platform } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import data from '../assets/data';

class ListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      title: 'Deck List',
      headerRight: (
        <Button
          title="Deck"
          color="rgba(0, 122, 255, 1)"
          backgroundColor="transparent"
          onPress={() => navigation.navigate('deck')}
        />
      ),
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0,
      },
    });
  }

  renderList = () => {
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={item.data.length}
          />
        )}
      />
    );
  }

  render() {
    return (
      this.renderList()
    );
  }
}

export default ListScreen;
