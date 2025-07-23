// weekly.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAANhb1ARzAQMnsJmbexokzAgqrmYm1mJE",
  authDomain: "junodash-d76ed.firebaseapp.com",
  projectId: "junodash-d76ed",
  storageBucket: "junodash-d76ed.appspot.com",
  messagingSenderId: "920446175505",
  appId: "1:920446175505:web:d1753097ec1e49739464b0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const todayCountEl = document.getElementById("todayCount");
const weeklyCountEl = document.getElementById("weeklyCount");
const totalCountEl = document.getElementById("totalCount");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid;
    const docRef = doc(db, "frameCounts", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const todayDate = new Date().toISOString().split('T')[0];
      const weeklyCount = data.weeklyCount || {};
      const totalCount = data.totalCount || 0;
      const todayCount = data.todayCount || 0;

      todayCountEl.textContent = todayCount;
      totalCountEl.textContent = totalCount;

      const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const weeklyData = [];
      let totalWeekly = 0;

      for (let i = 1; i <= 6; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (date.getDay() - i));
        const key = date.toISOString().split("T")[0];
        const count = weeklyCount[key] || 0;
        totalWeekly += count;
        weeklyData.push(count);
      }

      weeklyCountEl.textContent = totalWeekly;

      // Draw chart
      const ctx = document.getElementById("weeklyGraph").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: weekDays,
          datasets: [{
            label: "Weekly Frames",
            data: weeklyData,
            backgroundColor: "#3498db",
            borderRadius: 8,
            barThickness: 40
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  }
});
