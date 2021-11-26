import { db } from "../../vuefire-db";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const firestoreSet = (key, objToSave) => {
  setDoc(doc(db, "backups", `${key}`), objToSave);
};

export const firestoreGet = async (key) => {
  const docRef = doc(db, "backups", `${key}`);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data();
};
