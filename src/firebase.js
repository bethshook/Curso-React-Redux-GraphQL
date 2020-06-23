import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBSzS8p_N9YyX7vX1DSLe1pXVkY6ME8S-c",
  authDomain: "redux-auth-practice.firebaseapp.com",
  databaseURL: "https://redux-auth-practice.firebaseio.com",
  projectId: "redux-auth-practice",
  storageBucket: "redux-auth-practice.appspot.com",
  messagingSenderId: "613403836910",
  appId: "1:613403836910:web:96fe53bb317c86fe8f0eff"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//services we'll pass to our reducer
export function signOutGoogle(){
  firebase.auth().signOut()
}

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
    .then(snap=>snap.user)
}
