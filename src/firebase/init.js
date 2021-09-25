import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA-etiLlTp-Q4w8FGVwqKarqFfKpm_r79I",
    authDomain: "codewist.firebaseapp.com",
    databaseURL: "https://codewist.firebaseio.com",
    projectId: "codewist",
    storageBucket: "codewist.appspot.com",
    messagingSenderId: "503506589378",
    appId: "1:503506589378:web:a99432518281d0e0668d5b"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()