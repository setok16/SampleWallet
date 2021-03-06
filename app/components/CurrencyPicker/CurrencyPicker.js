import React from 'react';
import PropTypes from 'prop-types';
import ModalSelector from 'react-native-modal-selector';

import styles from './styles';

const CurrencyPicker = (props) => {
  const { onChange, initValue } = props;
  const data = [
    { key: 'ADA', label: 'ADA' },
    { key: 'JPY', label: 'JPY' },
  ];

  return (
    <ModalSelector
      style={styles.selector}
      selectTextStyle={styles.text}
      data={data}
      initValue={initValue || 'ADA'}
      onChange={onChange}
    />
  );
};

CurrencyPicker.propTypes = {
  onChange: PropTypes.func,
  initValue: PropTypes.string,
};

export default CurrencyPicker;
