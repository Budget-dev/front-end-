// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAANhb1ARzAQMnsJmbexokzAgqrmYm1mJE",
  authDomain: "junodash-d76ed.firebaseapp.com",
  projectId: "junodash-d76ed",
  storageBucket: "junodash-d76ed.firebasestorage.app",
  messagingSenderId: "920446175505",
  appId: "1:920446175505:web:d1753097ec1e49739464b0"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getAuth, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

const auth = getAuth();
const submit = document.getElementById("submit");
submit.addEventListener("click",function(event){
  event.preventDefault();
  const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("login successfully");
    // alert("account  created successfully");
    window.location.href = "/dashboard.html";

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
})

