import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//TODO: consider putting in env
const firebaseConfig = {
  apiKey: "AIzaSyCfQHu1q5F9hG3GMB3W8hFElJmfpf3qI5s",
  authDomain: "bud-dev-1531b.firebaseapp.com",
  databaseURL:
    "https://bud-dev-1531b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bud-dev-1531b",
  storageBucket: "bud-dev-1531b.appspot.com",
  messagingSenderId: "803627261639",
  appId: "1:803627261639:web:a20b11f063e7b114c0a8e2",
  measurementId: "G-WYCCTDFFE5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);