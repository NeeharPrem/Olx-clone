import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvqiOk4fNNXeOv6rBuzyME5crxIwo6SSY",
    authDomain: "olx-clone-784e7.firebaseapp.com",
    projectId: "olx-clone-784e7",
    storageBucket: "olx-clone-784e7.appspot.com",
    messagingSenderId: "677026078601",
    appId: "1:677026078601:web:395377fae3ee58d1370b58",
    measurementId: "G-R3K1WWF9FQ"
};

export const firebase = initializeApp(firebaseConfig);