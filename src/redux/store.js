import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import userReducer from './userDuck'
import charsReducer, {getCharactersAction} from './charsDuck'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// one reducer combining various
let rootReducer = combineReducers({
  user:userReducer,
  characters:charsReducer
})

export default function generateStore() {
  // needs 3 pieces: reducer, initial state, middlewares
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  // exec our first action, this is one way to call action
  // we're calling the action creator which returns a func
  // then providing the args for that anon func
  getCharactersAction()(store.dispatch, store.getState)
  return store
}
// could add another func without composeEnhancers for prod
