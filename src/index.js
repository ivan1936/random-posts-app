import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import App from './containers/App'
import rootReducer from './redux/rootReducer'
import {watchFetchPosts} from './redux/sagas'
import './index.css'

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
        sagaMiddleware, 
        thunkMiddleware,
        loggerMiddleware
    )
)

sagaMiddleware.run(watchFetchPosts);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root')
);