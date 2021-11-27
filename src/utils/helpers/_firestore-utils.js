import { db } from "../../vuefire-db";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const firestoreSet = (key, objToSave, collection) => {

  setDoc(doc(db, collection, `${key}`), objToSave);
};

export const firestoreGet = async (key, collection) => {
  const docRef = doc(db, collection, `${key}`);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data();
};
