import{db}from'./firebase.js';
import{addDoc,collection}from'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
window.send=async()=>{
await addDoc(collection(db,'contacts'),{name:name.value,email:email.value,message:message.value,createdAt:new Date()});
alert('Message sent successfully');
name.value=email.value=message.value='';
};