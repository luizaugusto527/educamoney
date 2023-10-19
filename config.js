
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBC06N_XnAECauZSUzX4eeiLG0mqgVnXow",
  authDomain: "educamoney-fcb84.firebaseapp.com",
  projectId: "educamoney-fcb84",
  storageBucket: "educamoney-fcb84.appspot.com",
  messagingSenderId: "1088417751280",
  appId: "1:1088417751280:web:b199113e75cd76d277a235",
  measurementId: "G-ZVFBY1JCCQ"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export default app;