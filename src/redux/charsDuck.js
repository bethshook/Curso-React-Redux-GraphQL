import axios from 'axios'

// constants
let initialData = {
  fetching: false,
  array: [],
  current: {}
}
let URL = 'https://rickandmortyapi.com/api/character'

// reps the action that you're requesting
let GET_CHARACTERS = 'GET_CHARACTERS'
// successful action
let GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
// failed action, any error from backend
let GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR'

// reducer
export default function reducer(state=initialData, action) {
  switch(action.type) {
    case GET_CHARACTERS:
    case GET_CHARACTERS_ERROR:
    case GET_CHARACTERS_SUCCESS:
      // return what we had before PLUS the change that the empty array will be filled by chars
      return {...state, array:action.payload}
    default:
      return state
  }
}

// actions/action creators (thunks) - returns another func (the action)
export let getCharactersAction = () => (dispatch, getState) => {
  return axios.get(URL)
    .then(res => {
      // when we have results, we DISPATCH the action
      // payload is the data; action creator sends the payload to the reducer
      // reducer will return them within the 'array' key
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      })
x    })
}
