import {
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

// ambil data dari collection tertentu
export async function retriveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// ambil data dari collection tertentu berdasarkan id

export async function retriveDataById(collectionName: string, id: string) {
  const docRef = doc(firestore, collectionName, id);
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
}
