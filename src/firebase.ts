
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA87lFkZ6dyRuLKSCWZgcu9tRzoaPKosyI",
  authDomain: "lingo-db565.firebaseapp.com",
  projectId: "lingo-db565",
  storageBucket: "lingo-db565.firebasestorage.app",
  messagingSenderId: "599433030672",
  appId: "1:599433030672:web:d94abbd6020c08ae706e95",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

