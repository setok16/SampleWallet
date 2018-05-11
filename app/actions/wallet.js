export const CALCULATE_BALANCE = 'CALCULATE_BALANCE';
export const CALCULATE_NUM_TRANSACTIONS = 'CALCULATE_NUM_TRANSACTIONS';
export const GET_LAST_TRANSACTION_DATE = 'GET_LAST_TRANSACTION_DATE';
export const GET_NEW_ADDRESS = 'GET_NEW_ADDRESS';
export const DECREMENT_BALANCE = 'DECREMENT_BALANCE';
export const GET_INITIAL_CONVERSION = 'GET_INITIAL_CONVERSION';

export const CONVERSION_RESULT = 'CONVERSION_RESULT';
export const CONVERSION_ERROR = 'CONVERSION_ERROR';

export const calculateBalance = () => ({
  type: CALCULATE_BALANCE,
});

export const calculateNumTransactions = () => ({
  type: CALCULATE_NUM_TRANSACTIONS,
});

export const getLastTransactionDate = () => ({
  type: GET_LAST_TRANSACTION_DATE,
});

export const getNewAddress = () => ({
  type: GET_NEW_ADDRESS,
});

export const decrementBalance = (amount) => ({
  type: DECREMENT_BALANCE,
  amount,
});

export const getInitialConversion= () => ({
  type: GET_INITIAL_CONVERSION,
});
