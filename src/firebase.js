// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDt-AtO4pTrcLkJoEvbjgWT0zgfPfqxixw",
  authDomain: "telegram-clone-react.firebaseapp.com",
  projectId: "telegram-clone-react",
  storageBucket: "telegram-clone-react.appspot.com",
  messagingSenderId: "369767140665",
  appId: "1:369767140665:web:7dffe72bc4090bc8272ce8",
  measurementId: "G-NXS186521R"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()

export default db