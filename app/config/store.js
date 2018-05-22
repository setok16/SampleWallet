import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk'; // Middleware for async dispatch functions

import reducers from '../reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, ReduxThunk];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger); // logger middleware should always be pushed last
}

const store = createStore(reducers, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
