import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let editingId = null;

const blogRef = collection(db, "blogs");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const contentInput = document.getElementById("content");
const blogsDiv = document.getElementById("blogs");
const publishBtn = document.getElementById("publishBtn");

async function loadBlogs() {
  blogsDiv.innerHTML = "";

  const snapshot = await getDocs(blogRef);
  snapshot.forEach((d) => {
    const blog = d.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <b>${blog.title}</b>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      <hr>
    `;

    div.querySelector(".edit-btn").addEventListener("click", () => {
      editBlog(d.id);
    });

    div.querySelector(".delete-btn").addEventListener("click", () => {
      deleteBlog(d.id);
    });

    blogsDiv.appendChild(div);
  });
}

async function editBlog(id) {
  const snap = await getDoc(doc(db, "blogs", id));
  if (!snap.exists()) return;

  const blog = snap.data();

  titleInput.value = blog.title;
  categoryInput.value = blog.category;
  contentInput.value = blog.content;

  editingId = id;
  publishBtn.textContent = "Update Blog";
}

async function saveBlog() {
  if (!titleInput.value || !contentInput.value) {
    alert("Title and content required");
    return;
  }

  if (editingId) {
    await updateDoc(doc(db, "blogs", editingId), {
      title: titleInput.value,
      category: categoryInput.value,
      content: contentInput.value,
      updatedAt: new Date()
    });

    editingId = null;
    publishBtn.textContent = "Publish Blog";
  } else {
    await addDoc(blogRef, {
      title: titleInput.value,
      category: categoryInput.value,
      content: contentInput.value,
      author: auth.currentUser.email,
      createdAt: new Date(),
      published: true
    });
  }

  titleInput.value = "";
  categoryInput.value = "";
  contentInput.value = "";

  loadBlogs();
}

async function deleteBlog(id) {
  if (!confirm("Delete this blog?")) return;
  await deleteDoc(doc(db, "blogs", id));
  loadBlogs();
}

publishBtn.addEventListener("click", saveBlog);

loadBlogs();
