// ===============================
// Border Forex Frontend Script
// ===============================

// 🔗 Backend base URL (replace this with your Render backend link)
const apiBase = "https://border-forex-backend.onrender.com"; // example

// ======== Utility: Display Alerts ========
function showMessage(msg, type = "info") {
  const box = document.getElementById("messageBox");
  if (!box) return alert(msg);
  box.textContent = msg;
  box.className = type;
  setTimeout(() => (box.textContent = ""), 5000);
}

// ======== LOGIN ========
async function loginUser(event) {
  event.preventDefault();

  const idNumber = document.getElementById("loginId").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!idNumber || !password) {
    return showMessage("Please enter all fields", "error");
  }

  try {
    const res = await fetch(`${apiBase}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idNumber, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "rates.html";
    } else {
      showMessage(data.message || "Login failed", "error");
    }
  } catch (err) {
    showMessage("Server error during login", "error");
    console.error(err);
  }
}

// ======== REGISTER ========
async function registerUser(event) {
  event.preventDefault();

  const fullName = document.getElementById("regName").value.trim();
  const idNumber = document.getElementById("regId").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const busName = document.getElementById("regBus").value.trim();

  if (!fullName || !idNumber || !password || !busName) {
    return showMessage("All fields required", "error");
  }

  try {
    const res = await fetch(`${apiBase}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, idNumber, password, busName })
    });

    const data = await res.json();

    if (res.ok) {
      showMessage("Registration successful! Please log in.", "success");
      setTimeout(() => (window.location.href = "login.html"), 2000);
    } else {
      showMessage(data.message || "Registration failed", "error");
    }
  } catch (err) {
    showMessage("Server error during registration", "error");
    console.error(err);
  }
}

// ======== FETCH RATES ========
async function loadRates() {
  const rateBox = document.getElementById("ratesBox");
  if (!rateBox) return;

  try {
    const res = await fetch(`${apiBase}/rates`);
    const data = await res.json();

    rateBox.innerHTML = "";

    data.forEach((r) => {
      const div = document.createElement("div");
      div.className = "rate-item";
      div.innerHTML = `
        <strong>${r.currency}</strong>: ${r.rate} KES
      `;
      rateBox.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    rateBox.innerHTML = "Failed to load rates";
  }
}

// ======== CALCULATOR ========
async function calculateExchange() {
  const amountInput = document.getElementById("calcAmount");
  const currencyInput = document.getElementById("calcCurrency");
  const resultBox = document.getElementById("calcResult");

  const amount = parseFloat(amountInput.value);
  const currency = currencyInput.value;

  if (!amount || !currency) {
    return (resultBox.textContent = "Please enter amount and currency");
  }

  try {
    const res = await fetch(`${apiBase}/rates`);
    const rates = await res.json();

    const rateObj = rates.find((r) => r.currency === currency);
    if (!rateObj) return (resultBox.textContent = "Currency not found");

    const converted = amount * rateObj.rate;
    resultBox.textContent = `${amount} ${currency} ≈ ${converted.toFixed(2)}
