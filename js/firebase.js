import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZjmaAQkX4qzWt3JBVzVtPbVtGPbb7EXI",
  authDomain: "safenex-33a34.firebaseapp.com",
  projectId: "safenex-33a34",
  storageBucket: "safenex-33a34.appspot.com",
  messagingSenderId: "721188802838",
  appId: "1:721188802838:web:f75bb9081d12ccb667c037"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
