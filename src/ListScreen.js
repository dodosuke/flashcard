import React from 'react';
import { FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ListItem } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateCards, readList, deleteDeck } from './actions';
import { Spinner } from './components/common';

const styles = StyleSheet.create({
  deleteButton: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

class ListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: 'List',
      headerRight: (
        <Button
          title="+"
          color="rgba(0, 122, 255, 1)"
          backgroundColor="transparent"
        />
      ),
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Icon
            name="cards-outline"
            color={focused ? tintColor : 'grey'}
            size={28}
          />
        );
      },
    };
  }

  componentWillMount() {
    this.props.readList();
  }

  callDeck = (item) => {
    this.props.updateCards(item.deck_id);
    this.props.navigation.navigate('deck', { header: item.name });
  }

  rightButtons = (deckID) => {
    return ([
      <TouchableHighlight
        style={styles.deleteButton}
        onPress={() => this.props.deleteDeck(deckID)}
      >
        <Icon
          name="delete"
          color="white"
          size={35}
        />
      </TouchableHighlight>,
    ]);
  }

  renderList = () => {
    if (this.props.loading) { return <Spinner />; }
    return (
      <FlatList
        data={this.props.list}
        keyExtractor={item => item.deck_id}
        renderItem={({ item }) => (
          <Swipeable
            rightButtonWidth={55}
            rightButtons={this.rightButtons(item.deck_id)}
          >
            <ListItem
              title={item.name}
              subtitle={`${item.value} cards`}
              onPress={() => this.callDeck(item)}
            />
          </Swipeable>
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

const mapStateToProps = (state) => {
  const { list, loading } = state.deck;

  return { list, loading };
};

ListScreen.propTypes = {
  updateCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { updateCards, readList, deleteDeck })(ListScreen);
