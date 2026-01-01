import{auth}from'./firebase.js';
import{signInWithEmailAndPassword,signOut}from'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
const admins=['admin@safenex.co.in','saurabhs.yedekar@gmail.com'];
window.login=()=>{
signInWithEmailAndPassword(auth,email.value,password.value)
.then(u=>{admins.includes(u.user.email)?location.href='dashboard.html':signOut(auth)})
.catch(e=>error.innerText=e.message)
}
window.logout=()=>signOut(auth).then(()=>location.href='login.html');