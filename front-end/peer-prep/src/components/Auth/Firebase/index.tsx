import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB8n9Hz7grENemEZIOl_uz3hHMaLuXbft8",
    authDomain: "primeval-hearth-399015.firebaseapp.com",
    projectId: "primeval-hearth-399015",
    storageBucket: "primeval-hearth-399015.appspot.com",
    messagingSenderId: "219966227172",
    appId: "1:219966227172:web:cfad79424d5cdc687322f1",
    measurementId: "G-4N6C030YY0"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);