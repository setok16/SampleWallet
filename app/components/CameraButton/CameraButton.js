import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

const CameraButton = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={require('./images/camera.png')} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

CameraButton.propTypes = {
  onPress: PropTypes.func,
};

export default CameraButton;
