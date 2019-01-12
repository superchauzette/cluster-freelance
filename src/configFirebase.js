import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCWxXcYiEhI9QOIVP5xfVC5-Dd_AvtSZ94",
  authDomain: "cluster-freelance.firebaseapp.com",
  databaseURL: "https://cluster-freelance.firebaseio.com",
  projectId: "cluster-freelance",
  storageBucket: "cluster-freelance.appspot.com",
  messagingSenderId: "665141570788"
};
firebase.initializeApp(config);

export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); // Disable deprecated features

export const provider = new firebase.auth.GoogleAuthProvider();
export const currentUser = firebase.auth().currentUser;
export const auth = firebase.auth;

export const authenticate = () => {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(provider));
};

// const ui = new firebaseui.auth.AuthUI(firebase.auth());

// ui.start("#auth-container", {
//   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID],
//   signInSuccessUrl: "/"
// });
