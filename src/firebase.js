import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDkVGYnGoMUCd64FIW1vIXSgGx5YsCJLyQ",
    authDomain: "meetnewfriends-51eaa.firebaseapp.com",
    databaseURL: "https://meetnewfriends-51eaa.firebaseio.com",
    projectId: "meetnewfriends-51eaa",
    storageBucket: "meetnewfriends-51eaa.appspot.com",
    messagingSenderId: "1098085014169",
    appId: "1:1098085014169:web:ca6b6b8627a11c98167608",
    measurementId: "G-QNKS16JM7R"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;