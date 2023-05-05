import { initializeApp } from "firebase/app";
const config = {
  apiKey: "AIzaSyBktgVA8p33fN8UPDC_nKqnKzRh3ZPsYmI",
  authDomain: "phoneauthentication-cfe6b.firebaseapp.com",
  projectId: "phoneauthentication-cfe6b",
  storageBucket: "phoneauthentication-cfe6b.appspot.com",
  messagingSenderId: "81343463844",
  appId: "1:81343463844:web:9c18a321a6041312ffc131",
  measurementId: "G-XHDP8E1HJG",
};

export const app = initializeApp(config);

export const initFirebase = () => {
  return app;
};
