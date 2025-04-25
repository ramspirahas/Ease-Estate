// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFireStore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl2fXtZKctdo3TrRcRMenUGyiVbUTDKCM",
  authDomain: "login-auth-aaa99.firebaseapp.com",
  projectId: "login-auth-aaa99",
  storageBucket: "login-auth-aaa99.firebasestorage.app",
  messagingSenderId: "461718902380",
  appId: "1:461718902380:web:327223663eb1619c49ea49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
// export const db=getFireStore(app);
export default app;