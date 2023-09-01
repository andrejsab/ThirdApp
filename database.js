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
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

export const initDB = () => {
  // Firestore creates collections and documents on-the-fly, so no need to initialize
};

export const insertNode = async (name, callback) => {
  try {
    const docRef = await addDoc(collection(db, "nodes"), { name });
    callback(docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const insertEdge = async (fromNode, toNode) => {
  try {
    await addDoc(collection(db, "edges"), { fromNode, toNode });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchGraphData = async (callback) => {
  const nodes = [];
  const edges = [];

  const querySnapshotNodes = await getDocs(collection(db, "nodes"));
  querySnapshotNodes.forEach((doc) => {
    nodes.push({ id: doc.id, ...doc.data() });
  });

  const querySnapshotEdges = await getDocs(collection(db, "edges"));
  querySnapshotEdges.forEach((doc) => {
    edges.push({ id: doc.id, ...doc.data() });
  });

  callback(nodes, edges);
};
