import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, PanResponder, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.35;
const SWIPE_OUT_DURATION = 250;
const styles = {
  deckViewStyle: {
    top: Dimensions.get('window').height * 0.3,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
};

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY({ x: 0, y: 0 });
    const panResponder = PanResponder.create({
      /* settin up to call this function when the screen is tapped */
      onStartShouldSetPanResponder: () => true,
      /* capturing the move of fingers on a screen */
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    });

    this.state = { panResponder, position, index: 0 };
  }

  onSwipeComplete(direction) {
    const { onSwipe, data } = this.props;
    const item = data[this.state.index];

    onSwipe(direction, item);
    this.state.position.setValue({ x: 0, y: -500 });
    this.setState({ index: this.state.index + 1 });
    Animated.timing(this.state.position, { toValue: { x: 0, y: 0 } }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-45deg', '0deg', '45deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => this.onSwipeComplete(direction));
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, i) => {
      if (i < this.state.index) { return null; }

      if (i === this.state.index) {
        return (
          <Animated.View
            key={item.card_id}
            {...this.state.panResponder.panHandlers}
            style={[this.getCardStyle(), styles.cardStyle]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item.card_id}
          style={[styles.cardStyle, { top: -500 }]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }

  renderIndicators = () => {
    const { position } = this.state;
    const iknow = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 0.6],
    });

    const notsure = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0.6, 0, 0],
    });

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }} pointerEvents="none">
        <Animated.View style={{ opacity: notsure, top: -100 }}>
          <Button raised title="NG" fontSize={40} backgroundColor="#c9267d" />
        </Animated.View>
        <View />
        <Animated.View style={{ opacity: iknow, top: -100 }}>
          <Button raised title="OK" fontSize={40} backgroundColor="#397af8" />
        </Animated.View>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.deckViewStyle]}>
        {this.renderCards()}
        {this.renderIndicators()}
      </View>
    );
  }
}

Deck.propTypes = {
  renderCard: PropTypes.func.isRequired,
  renderNoMoreCards: PropTypes.func.isRequired,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape({
    card_id: PropTypes.string,
    front: PropTypes.string,
    back: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};

export default Deck;
