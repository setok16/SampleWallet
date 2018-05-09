import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

const BigPanel = (props) => {
  const {
    type,
    onPress,
    mainText,
    subText,
    smallText1,
    smallText2,
    disabled } = props;

  // Statically set imageSource, since require() cannot be set dynamically
  let imageSource = '';

  imageSource = require('./images/wallet.png');

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={disabled?styles.disabledContainer:styles.container} onPress={onPress} activeOpacity={disabled ? 1 : 0}>
        <View style={styles.subContainer}>
          <Image source={imageSource} style={styles.icon}/>
          <View style={styles.textContainer}>
            <View style={{flexDirection:'column'}}>
              <Text style={styles.mainText}>{mainText}</Text>
              <Text style={styles.subText}>{subText}</Text>
              <Text style={styles.smallText}>{smallText1}</Text>
              <Text style={styles.smallText}>{smallText2}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

BigPanel.propTypes = {
  type: PropTypes.string,
  onPress: PropTypes.func,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  smallText1: PropTypes.string,
  smallText2: PropTypes.string,
  disabled: PropTypes.bool,
}

export default BigPanel;
