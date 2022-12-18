import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMUIhIQ7CFrbruVl48HdHxLXdRXF-cRjU",
  authDomain: "e-commerce-db-d1d7f.firebaseapp.com",
  projectId: "e-commerce-db-d1d7f",
  storageBucket: "e-commerce-db-d1d7f.appspot.com",
  messagingSenderId: "94458111400",
  appId: "1:94458111400:web:56d7a5d79da493262aa99d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments =async (collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
    
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
//     const {title, items} = docSnapshot.data();
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {})

//  return categoryMap;
}











export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userSnapshot;
};

// for creating users with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async()=> await signOut(auth);

export const onAuthStateChangedListener =(callback)=> onAuthStateChanged(auth, callback );

export const getCurrentUser =()=>{
  return new Promise((resolve,reject)=>{
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth)=>{
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}

