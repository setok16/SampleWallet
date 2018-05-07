import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

import Navigator from './config/routes'

// Constants for colors
EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',
  $white: '#FFF',
  $border: '#E2E2E2',
  $gray: '#4D4D4D',
  $lightGray: '#F0F0F0',
  $darkGray: '#343434',
  $black: '#000',
});

export default () => (
  <Navigator />
)
