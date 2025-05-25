// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5i01rXuyKTFjBjsqqqNkZuFEO5qBORws",
  authDomain: "mern-auth-ce198.firebaseapp.com",
  projectId: "mern-auth-ce198",
  storageBucket: "mern-auth-ce198.appspot.com",
  messagingSenderId: "20223859218",
  appId: "1:20223859218:web:aa581866f9b9d4ba6256cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
