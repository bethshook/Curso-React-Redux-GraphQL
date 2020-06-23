import axios from 'axios'

// constants
let initialData = {
  fetching: false,
  array: [],
  current: {}
}
let URL = 'https://rickandmortyapi.com/api/character'

// reps the action that you're requesting
// need error/success variants when communicating with backend
let GET_CHARACTERS = 'GET_CHARACTERS'
// successful action
let GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
// failed action, any error from backend
let GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR'

let REMOVE_CHARACTER = 'REMOVE_CHARACTER'

// reducer - needs to be added to store
export default function reducer(state=initialData, action) {
  switch(action.type) {
    case REMOVE_CHARACTER:
      return {...state, array:action.payload}
    case GET_CHARACTERS:
      return {...state, fetching:true}
    case GET_CHARACTERS_ERROR:
      return {...state, fetching:false, error:action.payload}
    case GET_CHARACTERS_SUCCESS:
      // return new object with what we had before PLUS the new data
      return {...state, array:action.payload, fetching:false}
    default:
      return state
  }
}

// actions/action creators (thunks) - returns another func (the action)
// dispatch are part of the store
export let removeCharacterAction = () => (dispatch, getState) => {
  // ?? donde estan los chars? in the state(store)
  // getState will return the whole store
  let {array} = getState().characters
  array.shift()
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array]
  })
}

export let getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS
  })
  // axios over fetch because we can receive an error directly
  return axios.get(URL)
    .then(res => {
      // when we have results, we DISPATCH the action
      // payload is the (optional) data
      // action creator sends the payload to the reducer
      // reducer will return them within the 'array' key
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      })
    }).catch(err => {
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.message
      })
    })
}
