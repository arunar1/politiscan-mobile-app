import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBF3GeU5U5ntt5zBo-MYdv_a0xXNQYysS8",
    authDomain: "politiscan-6c25e.firebaseapp.com",
    projectId: "politiscan-6c25e",
    storageBucket: "politiscan-6c25e.appspot.com",
    messagingSenderId: "749624948318",
    appId: "1:749624948318:web:f87fa708b1d140359ca6cf",
    measurementId: "G-MMLCS5NNWG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
