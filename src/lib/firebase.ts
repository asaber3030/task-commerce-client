import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5DOFdEENEcyIResFXeXUcQ2Eh2RDfgEE",
  authDomain: "project-managment-app-425ca.firebaseapp.com",
  projectId: "project-managment-app-425ca",
  storageBucket: "project-managment-app-425ca.appspot.com",
  messagingSenderId: "749359301876",
  appId: "1:749359301876:web:2236d8774f7eedff058aa1",
  measurementId: "G-LTBPSJM9VZ"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
