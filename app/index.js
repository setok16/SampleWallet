import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

import Navigator from './config/routes';
import store from './config/store';

import './reducers';

// Constants for colors
EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#66CDAA',
  $primaryPurple: '#9E768F',
  $primaryRed: '#F08080',
  $white: '#FFF',
  $border: '#E2E2E2',
  $gray: '#4D4D4D',
  $lightGray: '#808080',
  $nonPressableGray: '#444',
  $darkGray: '#343434',
  $black: '#000',
});

export default () => (
  <Provider store={store}>
    <Navigator onNavigationStateChange={null}/>
  </Provider>
)
