import {
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
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

// login user manual
export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (data) {
    console.log(data);
    return data[0];
  } else {
    return null;
  }
}

export async function signInWithGoogle(userData: any, call: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);

  const data: any = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (data.length > 0) {
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then((res) =>
        call({
          status: true,
          statusCode: 200,
          message: "success update data login",
          data: userData,
        })
      )
      .catch((err) =>
        call({
          status: false,
          statusCode: 400,
          message: "error update data login",
        })
      );
  } else {
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then((res) =>
        call({
          status: true,
          statusCode: 200,
          message: "success add data login",
          data: userData,
        })
      )
      .catch((err) =>
        call({
          status: false,
          statusCode: 400,
          message: "error add data login",
        })
      );
  }
}

// register user
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
