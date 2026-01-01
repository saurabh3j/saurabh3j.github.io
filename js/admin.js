let editingId = null;

async function load() {
  blogs.innerHTML = "";

  const snapshot = await getDocs(blogRef);
  snapshot.forEach(d => {
    const blog = d.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <b>${blog.title}</b>
      <button onclick="editBlog('${d.id}')">Edit</button>
      <button onclick="deleteBlog('${d.id}')">Delete</button>
      <hr>
    `;

    blogs.appendChild(div);
  });
}

window.editBlog = async (id) => {
  const docRef = doc(db, "blogs", id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return;

  const blog = snap.data();

  title.value = blog.title;
  category.value = blog.category;
  content.value = blog.content;

  editingId = id;
};

window.addBlog = async () => {
  if (editingId) {
    // UPDATE
    await updateDoc(doc(db, "blogs", editingId), {
      title: title.value,
      category: category.value,
      content: content.value,
      updatedAt: new Date()
    });

    editingId = null;
  } else {
    // CREATE
    await addDoc(blogRef, {
      title: title.value,
      category: category.value,
      content: content.value,
      author: auth.currentUser.email,
      createdAt: new Date(),
      published: true
    });
  }

  title.value = category.value = content.value = "";
  load();
};

window.deleteBlog = async (id) => {
  if (confirm("Delete this blog?")) {
    await deleteDoc(doc(db, "blogs", id));
    load();
  }
};
