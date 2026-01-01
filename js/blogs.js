import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const blogsContainer = document.getElementById("blog-list");

async function loadBlogs() {
  const q = query(
    collection(db, "blogs"),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  blogsContainer.innerHTML = "";

  snapshot.forEach(doc => {
    const blog = doc.data();

    const card = document.createElement("div");
    card.className = "blog-card";

    card.innerHTML = `
      <img src="${blog.imageUrl}" alt="${blog.title}">
      <div class="content">
        <h3>${blog.title}</h3>
        <p>${blog.content.substring(0, 120)}...</p>
        <a href="post.html?slug=${blog.slug}">Read more →</a>
      </div>
    `;

    blogsContainer.appendChild(card);
  });
}

loadBlogs();
