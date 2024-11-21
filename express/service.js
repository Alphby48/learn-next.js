const {
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
} = require("firebase/firestore");
const db = require("./firebase.js");

const retriveData = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

const retriveDataById = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const data = {
      id: snapshot.id,
      ...snapshot.data(),
    };
    return data;
  } else {
    const data = {
      id: "kosong",
    };
    return data;
  }
};

module.exports = { retriveData, retriveDataById };
