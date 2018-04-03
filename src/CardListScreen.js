import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListItem, Icon } from 'react-native-elements';
import { Spinner } from './components/common';

class CardListScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'List',
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Icon
            name="cards-outline"
            type="material-community"
            color={focused ? tintColor : 'grey'}
            size={28}
          />
        );
      },
    };
  }

  renderList = () => {
    if (this.props.loading) { return <Spinner />; }
    return (
      <FlatList
        data={this.props.cards}
        keyExtractor={item => item.card_id}
        renderItem={({ item }) => (
          <ListItem
            title={item.front}
            subtitle={item.score}
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

const mapStateToProps = (state) => {
  const { cards, loading } = state.deck;

  return { cards, loading };
};

CardListScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    card_id: PropTypes.string.isRequired,
    front: PropTypes.string,
    back: PropTypes.string,
    score: PropTypes.number,
    deck_id: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, null)(CardListScreen);
