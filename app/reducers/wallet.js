import Moment from 'moment';

import {
  CALCULATE_BALANCE,
  CALCULATE_NUM_TRANSACTIONS,
  GET_LAST_TRANSACTION_DATE,
  DECREMENT_BALANCE,
  GET_INITIAL_CONVERSION,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
} from '../actions/wallet';

// Only getting sample data for now. This must change once we start using APIs
import transactions from '../data/transactions';

const initialState = {
  rates: {
    USD: 0.2879,
    BTC: 0.00003212,
    JYP: 32.51,
  },
  rateUpdatedDate: '2018-05-11T04:34:19.663Z',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CALCULATE_BALANCE: {
      let balance = 0;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'Received') { balance += transactions[i].amount; } else { balance -= transactions[i].amount; }
      }
      return {
        ...state, // copying all of the previous state if any
        balance,
      };
    }
    case CALCULATE_NUM_TRANSACTIONS: {
      let numTransactions = 0;
      for (let i = 0; i < transactions.length; i++) {
        numTransactions++;
      }
      return {
        ...state,
        numTransactions,
      };
    }
    case GET_LAST_TRANSACTION_DATE:
      return {
        ...state,
        lastTransactionDate: Moment(transactions[0].date.toString()).format('YYYY/MM/DD HH:mm') || 'N/A',
      };
    case DECREMENT_BALANCE:
      return {
        ...state,
        balance: state.balance - action.amount,
      };
    case GET_INITIAL_CONVERSION:
      return {
        ...state,
        isFetching: true,
      };
    case CONVERSION_RESULT:
      return {
        ...state,
        isFetching: false,
        rateUpdateDate: Moment().format('YYYY/MM/DD HH:mm'),
        rates: action.result,
      };
    case CONVERSION_ERROR:
    default:
      return state;
  }
};

/* // Debug stuff (must uncomment the action imports at top to use these)
console.log(initialState);
console.log(reducer(initialState, calculateBalance()));
console.log(reducer(initialState, calculateNumTransactions()));
console.log(reducer(initialState, getLastTransactionDate()));
*/

export default reducer;
