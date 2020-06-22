// this duck is necessary for us to pass to store

// constants
let initialData = {
  loggedIn: false
}
let LOGIN = "LOGIN"

// reducer - like a listener, dedicated to just one part of store
export default function reducer(state = initialData, action) {
  switch(action.type) {
    case LOGIN:
      //
    default:
      return state
  }
}

// action (action creator)
