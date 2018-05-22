import { takeEvery, call, put } from 'redux-saga/effects'; // Allow us to listen to any actions we want to and call a function upon fireing
import { GET_INITIAL_CONVERSION, CONVERSION_RESULT, CONVERSION_ERROR } from '../actions/wallet';

// 1. Upon inital app load

// Creating a promise
const getLatestRate = () => fetch('https://min-api.cryptocompare.com/data/price?fsym=ADA&tsyms=BTC,USD,JPY');

function* fetchLatestExchangeRate() {
  try {
    const response = yield call(getLatestRate);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (e) {
    console.log('Saga Error: ', e);
    yield put({ type: CONVERSION_ERROR, error: e.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestExchangeRate);
  // This appends the action of 'GET_EXCHANGE_RATE' to the final
  // argument of fetchLatestExchangeRate

  // Use the takeEvery function with any actions to fire an event per action call
  // E.g:
  // yield takeEvery('CALCULATE_BALANCE', fetchLatestExchangeRate);
}
