// register.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAANhb1ARzAQMnsJmbexokzAgqrmYm1mJE",
  authDomain: "junodash-d76ed.firebaseapp.com",
  projectId: "junodash-d76ed",
  storageBucket: "junodash-d76ed.appspot.com",
  messagingSenderId: "920446175505",
  appId: "1:920446175505:web:d1753097ec1e49739464b0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.getElementById("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const firstname = document.getElementById("firstname-input").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Save firstname into displayName
    await updateProfile(user, {
      displayName: firstname
    });

    alert("Account created successfully!");
    window.location.href = "index.html"; // redirect to login
  } catch (error) {
    console.error("Signup error:", error.message);
    document.getElementById("error-message").textContent = error.message;
  }
});
