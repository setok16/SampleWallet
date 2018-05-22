import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

import styles from './styles';

const InputBox = (props) => {
  const {
    onChangeText, keyboardType, value, placeholder, secureTextEntry,
  } = props;

  return (
    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
    />
  );
};

InputBox.propTypes = {
  onChangeText: PropTypes.func,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default InputBox;
