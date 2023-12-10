import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdb4PYqAM0ID_HpuXPHwRdf89yTkPSlD0",
  authDomain: "dropbox-clone-55b6c.firebaseapp.com",
  projectId: "dropbox-clone-55b6c",
  storageBucket: "dropbox-clone-55b6c.appspot.com",
  messagingSenderId: "549259719586",
  appId: "1:549259719586:web:ae7b8cb4394639e92978fb",
  measurementId: "G-B70181DXLM",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
