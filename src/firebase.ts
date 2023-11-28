import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdL0hMzDA_J4diRtFRxb9UOqqSv5KYn68",
  authDomain: "twitter-clone-dfd85.firebaseapp.com",
  projectId: "twitter-clone-dfd85",
  storageBucket: "twitter-clone-dfd85.appspot.com",
  messagingSenderId: "686561233132",
  appId: "1:686561233132:web:34d90d3c1958212fb53dc9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
