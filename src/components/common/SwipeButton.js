import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  swipeButton: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

const SwipeButton = ({
  name,
  size,
  iconColor,
  backgroundColor,
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={[styles.swipeButton, { backgroundColor }]}
      onPress={onPress}
    >
      <Icon
        name={name}
        color={iconColor}
        size={size}
      />
    </TouchableHighlight>
  );
};

SwipeButton.propTypes = {
  name: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number,
};

SwipeButton.defaultProps = {
  iconColor: 'white',
  backgroundColor: 'grey',
  size: 35,
};

export { SwipeButton };
