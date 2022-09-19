// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAE22i6Kew8FwLpAeUdvgMYlQQVWf1ehIo",
  authDomain: "video-1f703.firebaseapp.com",
  projectId: "video-1f703",
  storageBucket: "video-1f703.appspot.com",
  messagingSenderId: "163981971840",
  appId: "1:163981971840:web:06df866493239d2a287165"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider(); //ALLOW US TO LOGIN WITH GOOGLE BUTTON

export default app;