import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ListItem } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateCards, readList, deleteDeck } from './actions';
import { Spinner, SwipeButton } from './components/common';

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
    this.props.navigation.navigate('deck', { header: item.name, deckID: item.deck_id });
  }

  editName = (deckID) => {
    console.log(deckID);
  }

  rightButtons = (deckID) => {
    return ([
      <SwipeButton
        name="pencil"
        backgroundColor="grey"
        onPress={() => this.editName(deckID)}
      />,
      <SwipeButton
        name="delete"
        backgroundColor="red"
        onPress={() => this.props.deleteDeck(deckID)}
      />,
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
