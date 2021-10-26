import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import 'firebase/compat/database'
const firebaseConfig = {
  apiKey: "AIzaSyDkAYMO2FHw3DqL2XMefqPypohbAsRJjCc",
  authDomain: "slack1-691db.firebaseapp.com",
  projectId: "slack1-691db",
  storageBucket: "slack1-691db.appspot.com",
  messagingSenderId: "523139817880",
  appId: "1:523139817880:web:1de9401e623995ebe10bed"
};
firebase.initializeApp(firebaseConfig)
export default firebase
