import{db}from'./firebase.js';
import{collection,getDocs}from'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
const c=document.getElementById('blogContainer');
(const await getDocs(collection(db,'blogs'))).forEach(d=>{
const b=d.data();
c.innerHTML+=`<div class='blog-card'><h3>${b.title}</h3><p>${b.category}</p></div>`;
});