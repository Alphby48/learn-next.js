const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDHoxIe4jeIB5oy7-K3eYU-xC_YC0yIPB0",
  authDomain: "my-next-app-63a70.firebaseapp.com",
  projectId: "my-next-app-63a70",
  storageBucket: "my-next-app-63a70.appspot.com",
  messagingSenderId: "875658477551",
  appId: "1:875658477551:web:25ec3087da435440ec401a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
