import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6SX5683ifAnzE2yY2jS3Cjub92YpXF94",
    authDomain: "journalapp-1b130.firebaseapp.com",
    databaseURL: "https://journalapp-1b130.firebaseio.com",
    projectId: "journalapp-1b130",
    storageBucket: "journalapp-1b130.appspot.com",
    messagingSenderId: "552233466230",
    appId: "1:552233466230:web:f683bc72d83dd68fa0a257"
};

firebase.initializeApp(firebaseConfig);

const bd = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export{
  bd,
  googleAuthProvider,
  firebase
}