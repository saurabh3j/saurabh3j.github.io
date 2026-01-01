import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "PASTE_REAL_API_KEY_HERE",
  authDomain: "safenex-33a34.firebaseapp.com",
  projectId: "safenex-33a34",
  storageBucket: "safenex-33a34.appspot.com",
  messagingSenderId: "721188802838",
  appId: "PASTE_REAL_APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
