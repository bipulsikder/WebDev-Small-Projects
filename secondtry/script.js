// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"; // Import Realtime Database SDK
import { getAnalytics } from "firebase/analytics";



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize Realtime Database
const analytics = getAnalytics(app);

// DOM Elements
const form = document.getElementById("driverRegistrationForm");
const submitBtn = document.getElementById("submitBtn");
const loadingMessage = document.getElementById("loadingMessage");
const successMessage = document.getElementById("successMessage");

// Utility function to show/hide elements
const showElement = (element) => element.classList.remove("hidden");
const hideElement = (element) => element.classList.add("hidden");

// Show success or error messages
const showAlert = (message, type = "success") => {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.classList.add(type === "success" ? "message-success" : "message-error");
  document.body.appendChild(messageDiv);
  setTimeout(() => messageDiv.remove(), 5000); // Remove after 5 seconds
};

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Disable submit button and show loading spinner
  submitBtn.disabled = true;
  showElement(loadingMessage);

  try {
    // Collect form data
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const vehicleBody = document.getElementById("vehicleBody").value.trim();
    const vehicleTyres = document.getElementById("vehicleTyres").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const aadhar = document.getElementById("aadhar").value.trim();
    const pan = document.getElementById("pan").value.trim();
    const dlNumber = document.getElementById("dlNumber").value.trim();
    const dlDob = document.getElementById("dlDob").value.trim();

    // Basic validation to ensure all fields are filled
    if (!name || !phone || !dlNumber || !dlDob) {
      showAlert("Please fill in all required fields.", "error");
      submitBtn.disabled = false;
      hideElement(loadingMessage);
      return;
    }

    // Debugging: Log the form data to check if it's being captured correctly
    console.log("Form Data: ", name, phone, city, state, vehicleBody, vehicleTyres, experience, aadhar, pan, dlNumber, dlDob);

    // Step 1: Store data in Firebase Realtime Database
    const newDriverRef = ref(database, 'drivers/' + dlNumber); // Create a unique reference based on DL number
    await set(newDriverRef, {
      name,
      phone,
      city,
      state,
      vehicleBody,
      vehicleTyres,
      experience,
      aadhar,
      pan,
      dlNumber,
      dlDob,
      registeredAt: new Date().toISOString(), // Timestamp when registered
    });

    // Step 2: Show success message
    showAlert("Registration successful! We will contact you soon.", "success");
    hideElement(loadingMessage);
    showElement(successMessage); // Display the success message and app download link

    // Reset form
    form.reset();
  } catch (error) {
    console.error("Error during submission:", error);
    showAlert("An error occurred. Please try again later.", "error");
    submitBtn.disabled = false;
    hideElement(loadingMessage);
  } finally {
    submitBtn.disabled = false;
  }
});
