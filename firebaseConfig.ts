import {getApp,getApps,initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRsu5-KrGZeS9FRRsmwzqXVgSnE2PBjhA",
  authDomain: "cloud-storage-b450a.firebaseapp.com",
  projectId: "cloud-storage-b450a",
  storageBucket: "cloud-storage-b450a.appspot.com",
  messagingSenderId: "868603013627",
  appId: "1:868603013627:web:023859803867c071a0835e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);