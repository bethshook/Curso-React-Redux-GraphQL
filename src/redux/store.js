import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import userReducer from './userDuck'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// one reducer combining various
let rootReducer = combineReducers({
  user:userReducer
})

export default function generateStore() {
  // needs 3 pieces: reducer, initial state, middlewares
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  return store
}
// could add another func without composeEnhancers for prod
