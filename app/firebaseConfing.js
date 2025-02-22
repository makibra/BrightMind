// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDcxmedJVEE5eHPvBXn7-dnxqd_LPrhLfI",
  authDomain: "brightminds-742d8.firebaseapp.com",
  projectId: "brightminds-742d8",
  storageBucket: "brightminds-742d8.appspot.com",
  messagingSenderId: "539956296233",
  appId: "1:539956296233:web:353fe4eb36e62501333a38",
  measurementId: "G-68K3G3RYGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
