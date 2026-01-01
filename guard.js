import{auth}from'./firebase.js';
import{onAuthStateChanged}from'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
const admins=['admin@safenex.co.in','saurabhs.yedekar@gmail.com'];
onAuthStateChanged(auth,u=>{if(!u||!admins.includes(u.email))location.href='login.html';});