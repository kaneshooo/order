import { firebase } from '@firebase/app';
import 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyD2LQcFC5goEysJMMyAbnqoSwWHXhoA0ac",
  authDomain: "sample1-8ef03.firebaseapp.com",
  projectId: "sample1-8ef03",
  storageBucket: "sample1-8ef03.appspot.com",
  messagingSenderId: "31005943230",
  appId: "1:31005943230:web:3295304c349449ef3145ef",
  measurementId: "G-S8ENL7X4BV"
};if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}