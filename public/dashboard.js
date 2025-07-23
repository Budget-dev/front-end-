// dashboard.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAANhb1ARzAQMnsJmbexokzAgqrmYm1mJE",
  authDomain: "junodash-d76ed.firebaseapp.com",
  projectId: "junodash-d76ed",
  storageBucket: "junodash-d76ed.firebasestorage.app",
  messagingSenderId: "920446175505",
  appId: "1:920446175505:web:d1753097ec1e49739464b0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const frameInput = document.getElementById("frameInput");
const submitBtn = document.getElementById("submitBtn");
const todayCountEl = document.getElementById("todayCount");
const totalCountEl = document.getElementById("totalCount");
const statusMessage = document.getElementById("statusMessage");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid;
    const docRef = doc(db, "frameCounts", userId);
    const docSnap = await getDoc(docRef);

    const todayDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    let todayCount = 0;
    let totalCount = 0;
    let lastUpdated = "";

    if (docSnap.exists()) {
      const data = docSnap.data();
      lastUpdated = data.lastUpdated || "";
      totalCount = data.totalCount || 0;

      // Reset todayCount if the stored date is different
      if (lastUpdated === todayDate) {
        todayCount = data.todayCount || 0;
      } else {
        todayCount = 0;
      }
    }

    todayCountEl.textContent = todayCount;
    totalCountEl.textContent = totalCount;

    submitBtn.addEventListener("click", async () => {
      const inputCount = parseInt(frameInput.value);
      if (isNaN(inputCount) || inputCount < 0) {
        statusMessage.textContent = "Please enter a valid positive number.";
        return;
      }

      const newTotal = totalCount + inputCount;

      await setDoc(docRef, {
        userId,
        todayCount: inputCount,
        totalCount: newTotal,
        lastUpdated: todayDate
      });

      todayCountEl.textContent = inputCount;
      totalCountEl.textContent = newTotal;
      statusMessage.textContent = "Frame count submitted successfully!";
      frameInput.value = "";

      // Disable submit button to ensure one entry per day
      submitBtn.disabled = true;
    });

    // Disable button if already submitted today
    if (lastUpdated === todayDate && todayCount > 0) {
      submitBtn.disabled = true;
      statusMessage.textContent = "You have already submitted today's count.";
    }

  } else {
    statusMessage.textContent = "You must be logged in to submit data.";
  }
});
