import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

const Panel = (props) => {
  const { onPress, mainText, subText } = props;

  // Statically set imageSource, since require() cannot be set dynamically
  let imageSource = '';
  if (mainText === 'Wallet') {
    imageSource = require('./images/wallet.png');
  } else if (mainText === 'Send') {
    imageSource = require('./images/send.png');
  } else if (mainText === 'Receive') {
    imageSource = require('./images/receive.png');
  } else if (mainText === 'Transactions') {
    imageSource = require('./images/transactions.png');
  } else if (mainText === 'Settings') {
    imageSource = require('./images/settings.png');
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.subContainer}>
          <Image source={imageSource} style={styles.icon}/>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>{mainText}</Text>
            <Text style={styles.subText}>{subText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Panel.propTypes = {
  onPress: PropTypes.func,
  mainText: PropTypes.string,
  subText: PropTypes.string,
}

export default Panel;
