import {updateDB, getFavs} from '../firebase'
import ApolloClient, { gql } from 'apollo-boost'

const favStorage = localStorage.getItem('favs')

// constants
let initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: favStorage.length > 0 ? JSON.parse(favStorage) : []
}

let client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
})

// reps the action that you're requesting
// need error/success variants when communicating with backend
let GET_CHARACTERS = 'GET_CHARACTERS'
// successful action
let GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
// failed action, any error from backend
let GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR'

let REMOVE_CHARACTER = 'REMOVE_CHARACTER'
let ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'

let GET_FAVS = 'GET_FAVS'
let GET_FAVS_SUCCESS = 'GET_FAVS_SUCCESS'
let GET_FAVS_ERROR = 'GET_FAVS_ERROR'

// reducer - needs to be added to store
export default function reducer(state=initialData, action) {
  switch(action.type) {
    case ADD_TO_FAVORITES:
      return {...state, ...action.payload}
    case REMOVE_CHARACTER:
      return {...state, array:action.payload}
    case GET_CHARACTERS:
      return {...state, fetching:true}
    case GET_CHARACTERS_ERROR:
      return {...state, fetching:false, error:action.payload}
    case GET_CHARACTERS_SUCCESS:
      // return new object with what we had before PLUS the new data
      return {...state, array:action.payload, fetching:false}
    case GET_FAVS:
      return {...state, fetching: true}
    case GET_FAVS_SUCCESS:
      return {...state, fetching: false, favorites: action.payload}
    case GET_FAVS_ERROR:
      return {...state, fetching: false, error: action.payload}
    default:
      return state
  }
}

// actions/action creators (thunks) - returns another func (the action)
// dispatch are part of the store
export let retrieveFavoritesAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAVS
  })
  let {uid} = getState().user
  return getFavs(uid)
    .then(array => {
      dispatch({
        type: GET_FAVS_SUCCESS,
        payload: [...array]
      })
      localStorage.favs = JSON.stringify(array)
    })
    .catch(e => {
      console.log(e)
      dispatch({
        type: GET_FAVS_ERROR,
        payload: e.message
      })
    })
}

export let addToFavoritesAction = () => (dispatch, getState) => {
  let {array, favorites} = getState().characters
  let {uid} = getState().user
  let char = array.shift() // get index 0 of array
  favorites.push(char)
  updateDB(favorites, uid)
  dispatch({
    type: ADD_TO_FAVORITES,
    // deconstruct arrays so that redux will see the diff b/t the two
    payload: { array:[...array], favorites:[...favorites] }
  })
  localStorage.favs = JSON.stringify(favorites)
}

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
  let query = gql`
  {
    characters{
      results{
        name
        image
      }
    }
  }
  `
  dispatch({
    type: GET_CHARACTERS
  })
  // sub axios with graphql
  return client.query({
    query
  })
    .then(({data, error}) => {
      if (error) {
        dispatch({
          type: GET_CHARACTERS_ERROR,
          payload: error
        })
        return;
      }
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: data.characters.results,
      })
    })
  // axios over fetch because we can receive an error directly
}
