import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyCts3zNfPyma8VBsWa18knw0oqspHIbtUM",
  authDomain: "todo-bdbca.firebaseapp.com",
  projectId: "todo-bdbca",
  storageBucket: "todo-bdbca.appspot.com",
  messagingSenderId: "992630653963",
  appId: "1:992630653963:web:c6e1e81e3a3a506b36330e",
});

const db = firebaseApp.firestore();
const storage = fb.storage();

const provider = new GoogleAuthProvider();
const auth = getAuth();

const singInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export { db, auth, storage, fb, singInWithGoogle, logout };
