import AsyncStorage from '@react-native-async-storage/async-storage'
import createSagaMiddleware from '@redux-saga/core'
import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from './reducers'

// Redux persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

// Creates the Redux store using our reducer and the logger and saga middlewares
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
export const persistor = persistStore(store)
