import {
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

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

export async function signUp(
  userData: {
    email: string;
    password: string;
    fullname: string;
    role?: string;
  },
  call: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (data.length > 0) {
    call({ status: false, statusCode: 400, message: "email already exist" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then((result) =>
        call({ status: true, statusCode: 200, message: "success" })
      )
      .catch((err) => call({ status: false, statusCode: 400, message: err }));
  }
}
