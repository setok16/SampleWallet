import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Header = ({ onPress, headerText }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image resizeMode="contain" style={styles.menu} source={require('./images/menu.png')} />
    </TouchableOpacity>
    <Text style={styles.text}>{headerText}</Text>
  </View>
);

Header.propTypes = {
  onPress: PropTypes.func,
  headerText: PropTypes.string,
};

export default Header;
