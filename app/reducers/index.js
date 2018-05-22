import { combineReducers } from 'redux';

import wallet from './wallet';
import addresses from './addresses';

export default combineReducers({
  wallet,
  addresses,
});
