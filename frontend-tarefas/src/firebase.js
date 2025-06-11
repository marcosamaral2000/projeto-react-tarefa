import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBdlL-cDJ9GgSHoK2cmaStUzmMH6mknrmU",
  authDomain: "projeto-react-tarefa-86c63.firebaseapp.com",
  projectId: "projeto-react-tarefa-86c63",
  storageBucket: "projeto-react-tarefa-86c63.firebasestorage.app",
  messagingSenderId: "365279455670",
  appId: "1:365279455670:web:e72815f57c9eaad3c37917"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

//Inicializando o firefor
const db = getFirestore(app)
export {auth, db};