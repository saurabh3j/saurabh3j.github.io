import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const status = document.getElementById("status");

  if (!sendBtn) {
    console.error("Send button not found");
    return;
  }

  sendBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill all fields ❗";
      status.style.color = "red";
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        createdAt: serverTimestamp()
      });

      status.textContent = "Message sent successfully ✅";
      status.style.color = "green";

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

    } catch (error) {
      console.error("Error sending message:", error);
      status.textContent = "Failed to send message ❌";
      status.style.color = "red";
    }
  });
});
