import { initializeApp } from 'firebase/app';
import {getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApiKey,
  authDomain: Constants.expoConfig.extra.firebaseAuthDomain,
  projectId: Constants.expoConfig.extra.firebaseProjectId,
  storageBucket: Constants.expoConfig.extra.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig.extra.firebaseMessagingSenderId,
  appId: Constants.expoConfig.extra.firebaseAppId,
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { collection,  getDocs, query } from "firebase/firestore";

export const initDB = () => {
  // Firestore creates collections and documents on-the-fly, so no need to initialize
};


export const readDataFromFirestore = async (callback) => {
  // Read nodes from Firestore
  const nodeQuery = query(collection(db, 'nodes'));
  const nodeQuerySnapshot = await getDocs(nodeQuery);
  const nodes = nodeQuerySnapshot.docs.map(doc => doc.data());
  
  console.log('Nodes:', nodes);

  // Read edges from Firestore
  const edgeQuery = query(collection(db, 'edges'));
  const edgeQuerySnapshot = await getDocs(edgeQuery);
  const edges = edgeQuerySnapshot.docs.map(doc => doc.data());

  console.log('Edges:', edges);
  callback(nodes, edges);
};
