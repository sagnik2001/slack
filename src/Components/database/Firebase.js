import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import 'firebase/compat/database'
const firebaseConfig = {
  apiKey: "AIzaSyBAXyF0bqJ8M3oihUSkiuIFBZAp3xfEDQU",
  authDomain: "react-slack-clone-42300.firebaseapp.com",
  projectId: "react-slack-clone-42300",
  storageBucket: "react-slack-clone-42300.appspot.com",
  messagingSenderId: "698103915608",
  appId: "1:698103915608:web:05536c6d8d956e1f17562d"
};
firebase.initializeApp(firebaseConfig)
export default firebase
