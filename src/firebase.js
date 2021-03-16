// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
export const auth = firebase.auth()
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(() => {
//     return firebase.auth()
//   })
//   .catch((error) => {
//     var errorMessage = error.message
//     alert(errorMessage)
//   });
export const provider = new firebase.auth.GoogleAuthProvider()

export default db