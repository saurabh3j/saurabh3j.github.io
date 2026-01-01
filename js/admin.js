import{db,auth}from'./firebase.js';
import{collection,addDoc,getDocs,deleteDoc,doc}from'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
const blogRef=collection(db,'blogs');
const msgRef=collection(db,'contacts');

window.addBlog=async()=>{
await addDoc(blogRef,{title:title.value,category:category.value,content:content.value,author:auth.currentUser.email,createdAt:new Date()});
title.value=category.value=content.value='';
load();
};

async function load(){
blogs.innerHTML='';
(const await getDocs(blogRef)).forEach(d=>{
blogs.innerHTML+=`<p><b>${d.data().title}</b></p>`;
});
messages.innerHTML='';
(const await getDocs(msgRef)).forEach(d=>{
messages.innerHTML+=`<p><b>${d.data().email}</b>: ${d.data().message}</p>`;
});
}
load();