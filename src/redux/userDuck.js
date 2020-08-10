// duck is necessary for us to pass to store
import { loginWithGoogle, signOutGoogle } from '../firebase'
import {retrieveFavoritesAction} from '../redux/charsDuck'

// constants
let initialData = {
  loggedIn: false,
  fetching: false
}
let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"
let LOGOUT = "LOGOUT"

// reducer - like a listener, dedicated to just one part of store
export default function reducer(state = initialData, action) {
  switch(action.type) {
    case LOGOUT:
      return {...initialData}
    case LOGIN:
      return {...state, fetching: true}
    case LOGIN_SUCCESS:
      return {...state, fetching: false, ...action.payload, loggedIn: true}
    case LOGIN_ERROR:
      return {...state, fetching: false, error: action.payload}
    default:
      return state
  }
}

// auxiliar function that will help support what was in the store
// good to have backup on local storage of what's happening in the store
function saveStorage(storage){
  localStorage.storage = JSON.stringify(storage)
}

// actions (action creators)
export let logoutAction = () => (dispatch,getState) => {
  signOutGoogle()
  dispatch({
    type: LOGOUT
  })
  localStorage.removeItem('storage')
}

export let restoreSessionAction = () => dispatch => {
  let storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)
  if (storage && storage.user) {
    dispatch({
      type:LOGIN_SUCCESS,
      payload:storage.user
    })
  }
}

export let doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  })
  return loginWithGoogle()
    .then(user=>{
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid:user.uid,
          displayName:user.displayName,
          email:user.email,
          photoURL:user.photoURL
        }
      })
      saveStorage(getState())
      // call action from within action
      retrieveFavoritesAction()(dispatch, getState)
    })
    .catch(e => {
      console.log(e)
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message
      })
    })
}
