import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

const Panel = (props) => {
  const { type, onPress, mainText, subText, upperText, disabled } = props;

  // Statically set imageSource, since require() cannot be set dynamically
  let imageSource = '';

  switch (type) {
    case 'home': { // For panels used in Home screen only
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
      break;
    }
    case 'transactions': { // For panels used in Transactions screen only
      if (mainText === 'Sent') {
        imageSource = require('./images/send.png');
      } else if (mainText === 'Received') {
        imageSource = require('./images/receive.png');
      }
      break;
    }
  }


  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={disabled ? styles.disabledContainer : styles.container} activeOpacity={disabled ? 1 : 0} onPress={onPress}>
        <View style={styles.subContainer}>
          <Image source={imageSource} style={styles.icon}/>
          <View style={styles.textContainer}>
            <View style={styles.upperContainer}>
              <Text style={styles.mainText}>{mainText}</Text>
              <Text style={styles.upperText}>{upperText}</Text>
            </View>
            <Text style={styles.subText}>{subText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Panel.propTypes = {
  type: PropTypes.string,
  onPress: PropTypes.func,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  upperText: PropTypes.string,
  disabled: PropTypes.bool, // Sets active opacity to 1 if true
}

export default Panel;
