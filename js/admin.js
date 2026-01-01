import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const blogRef = collection(db, "blogs");
const msgRef = collection(db, "contacts");

const blogs = document.getElementById("blogs");
const messages = document.getElementById("messages");
const logoutBtn = document.getElementById("logoutBtn");

// ADD BLOG
window.addBlog = async () => {
  await addDoc(blogRef, {
    title: title.value,
    category: category.value,
    content: content.value,
    author: auth.currentUser.email,
    published: true,
    createdAt: new Date()
  });

  title.value = "";
  category.value = "";
  content.value = "";

  load();
};

// LOAD BLOGS & MESSAGES
async function load() {
  blogs.innerHTML = "";
  messages.innerHTML = "";

  const blogSnap = await getDocs(blogRef);
  blogSnap.forEach(d => {
    blogs.innerHTML += `<p><b>${d.data().title}</b></p>`;
  });

  const msgSnap = await getDocs(msgRef);
  msgSnap.forEach(d => {
    messages.innerHTML += `<p><b>${d.data().email}</b>: ${d.data().message}</p>`;
  });
}

// LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

load();
