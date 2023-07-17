import { combineReducers } from 'redux'
import appReducer from './app'

// Root reducer
const rootReducer = combineReducers({
    app: appReducer,
})

export default rootReducer;
