import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyCyIUHDPzc0qBviYXO8q4Uu876hkAh6n8s",
  authDomain: "chatify-52251.firebaseapp.com",
  databaseURL: "https://chatify-52251-default-rtdb.firebaseio.com",
  projectId: "chatify-52251",
  storageBucket: "chatify-52251.appspot.com",
  messagingSenderId: "448638780477",
  appId: "1:448638780477:web:8140145817d9579a1d1654"
};
firebase.initializeApp(firebaseConfig)
export default firebase