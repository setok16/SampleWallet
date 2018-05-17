import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const Button = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={{ alignSelf: 'center' }}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default Button;
