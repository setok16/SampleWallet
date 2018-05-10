//import { calculateBalance, calculateNumTransactions, getLastTransactionDate  } from '../actions/wallet';
import Moment from 'moment';

// Only getting sample data for now. This must change once we start using APIs
import transactions from '../data/transactions';

const initialState = {
};

const reducer = (state = initialState, action)  => {
  switch (action.type) {
    case 'CALCULATE_BALANCE':
    let balance = 0;
    for (i = 0; i < transactions.length; i++) {
      if (transactions[i].type =='Received')
        balance += transactions[i].amount;
      else
        balance -= transactions[i].amount;
      }
      return {
        ...state, // copying all of the previous state if any
        balance,
      }
    case 'CALCULATE_NUM_TRANSACTIONS':
      let numTransactions = 0;
      for (i = 0; i < transactions.length; i++) {
        numTransactions++;
      }
      return {
        ...state,
        numTransactions,
      }
    case 'GET_LAST_TRANSACTION_DATE':
      return {
        ...state,
        lastTransactionDate: Moment(transactions[0].date.toString()).format('YYYY/MM/DD HH:mm') || 'N/A'
      }
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
