import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAANhb1ARzAQMnsJmbexokzAgqrmYm1mJE",
  authDomain: "junodash-d76ed.firebaseapp.com",
  projectId: "junodash-d76ed",
  storageBucket: "junodash-d76ed.appspot.com",
  messagingSenderId: "920446175505",
  appId: "1:920446175505:web:d1753097ec1e49739464b0"
};

// Init services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Elements
const editBtn = document.getElementById("editBtn");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("profileForm");

const profileImage = document.getElementById("profileImage");
const name = document.getElementById("name");
const bloodGroup = document.getElementById("bloodGroup");
const mobile = document.getElementById("mobile");
const doj = document.getElementById("doj");
const address = document.getElementById("address");
const skills = document.getElementById("skills");
const linkedin = document.getElementById("linkedin");
const resume = document.getElementById("resume");

const profilePicInput = document.getElementById("profilePicInput");
const resumeInput = document.getElementById("resumeInput");

// Auth check
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("You need to be logged in to view your profile.");
    window.location.href = "/login.html";
    return;
  }

  const uid = user.uid;
  const docRef = doc(db, "profiles", uid);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      name.textContent = data.name || "Your Name";
      bloodGroup.textContent = data.bloodGroup || "-";
      mobile.textContent = data.mobile || "-";
      doj.textContent = data.doj || "-";
      address.textContent = data.address || "-";
      skills.textContent = data.skills || "-";
      linkedin.href = data.linkedin || "#";
      resume.href = data.resumeURL || "#";

      profileImage.src = data.profilePicURL || "https://via.placeholder.com/150";

      // Prefill form
      form.nameInput.value = data.name || "";
      form.bloodGroupInput.value = data.bloodGroup || "";
      form.mobileInput.value = data.mobile || "";
      form.dojInput.value = data.doj || "";
      form.addressInput.value = data.address || "";
      form.skillsInput.value = data.skills || "";
      form.linkedinInput.value = data.linkedin || "";
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }

  // Edit button
  editBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Save form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameVal = form.nameInput.value;
    const bloodVal = form.bloodGroupInput.value;
    const mobileVal = form.mobileInput.value;
    const dojVal = form.dojInput.value;
    const addressVal = form.addressInput.value;
    const skillsVal = form.skillsInput.value;
    const linkedinVal = form.linkedinInput.value;

    let profilePicURL = profileImage.src;
    let resumeURL = resume.href;

    const profilePicFile = profilePicInput?.files[0];
    const resumeFile = resumeInput?.files[0];

    // Upload profile image
    if (profilePicFile) {
      try {
        const picRef = ref(storage, `profileImages/${uid}`);
        await uploadBytes(picRef, profilePicFile);
        profilePicURL = await getDownloadURL(picRef);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }

    // Upload resume
    if (resumeFile) {
      try {
        const resumeRef = ref(storage, `resumes/${uid}.pdf`);
        await uploadBytes(resumeRef, resumeFile);
        resumeURL = await getDownloadURL(resumeRef);
      } catch (error) {
        console.error("Error uploading resume:", error);
      }
    }

    // Save to Firestore
    try {
      await setDoc(docRef, {
        name: nameVal,
        bloodGroup: bloodVal,
        mobile: mobileVal,
        doj: dojVal,
        address: addressVal,
        skills: skillsVal,
        linkedin: linkedinVal,
        profilePicURL,
        resumeURL
      });
      window.location.reload(); // Refresh to show updates
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  });
});
