import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

const TransactionPanel = (props) => {
  const { onPress, mainText, subUpperText, subLowerText, upperText, disabled } = props;

  // Statically set imageSource, since require() cannot be set dynamically
  let imageSource = '';

  if (mainText === 'Sent') {
    imageSource = require('./images/send.png');
  } else if (mainText === 'Received') {
    imageSource = require('./images/receive.png');
  }

  const containerStyles = [styles.container];
  if (disabled) {
    containerStyles.push(styles.disabledContainer);
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={containerStyles} activeOpacity={disabled ? 1 : 0} onPress={onPress}>
        <View style={styles.subContainer}>
          <Image source={imageSource} style={styles.icon}/>
          <View style={styles.textContainer}>
            <View style={styles.upperContainer}>
              <Text style={styles.mainText}>{mainText}</Text>
              <Text style={styles.upperText}>{upperText}</Text>
            </View>
            <View style={{alignItems:'flex-start'}}>
              <View style={{alignItems:'flex-end'}}>
                <Text style={styles.subText}>{subUpperText}</Text>
                <Text style={styles.subText}>{subLowerText}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

TransactionPanel.propTypes = {
  type: PropTypes.string,
  onPress: PropTypes.func,
  mainText: PropTypes.string,
  subUpperText: PropTypes.string,
  subLowerText: PropTypes.string,
  upperText: PropTypes.string,
  disabled: PropTypes.bool, // Sets active opacity to 1 if true
}

export default TransactionPanel;
