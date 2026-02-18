import { addSpeakButtonListener } from "./speak.js";
import { createCardElement } from "./card.js";

const container = document.getElementById("cards-container");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// ===== CORE DATA =====
async function fetchCards() {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/cards", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      container.innerHTML = "<p>Unauthorized. Please login again.</p>";
      return;
    }

    const data = await response.json();

    container.innerHTML = ""; // prevent duplicates

    data.data.forEach((card) => {
      const cardEl = createCardElement(card);
      container.appendChild(cardEl);
    });
  } catch (err) {
    console.error("Error fetching cards:", err);
    container.innerHTML = "<p>Failed to load cards.</p>";
  }
}

// ===== AUTH =====
async function login(username, password) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      // close modal
      const loginModal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      loginModal.hide();
      displayUserAuth();
      fetchCards();
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (err) {
    console.error("Error during login:", err);
  }
}

async function register(username, password) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      // close modal
      const registerModal = bootstrap.Modal.getInstance(
        document.getElementById("registerModal")
      );
      registerModal.hide();
      displayUserAuth();
      fetchCards();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Error during registration:", err);
  }
}

// ===== USER INFO =====
function displayUserAuth() {
  const authArea = document.getElementById("auth-area");
  const token = localStorage.getItem("token");
  if (!token) {
    authArea.innerHTML = ""; // clear existing content

    // Create Login button
    const loginBtn = document.createElement("button");
    loginBtn.className = "btn btn-outline-light me-2";
    loginBtn.textContent = "Login";
    loginBtn.setAttribute("data-bs-toggle", "modal");
    loginBtn.setAttribute("data-bs-target", "#loginModal");

    // Create Register button
    const registerBtn = document.createElement("button");
    registerBtn.className = "btn btn-light";
    registerBtn.textContent = "Register";
    registerBtn.setAttribute("data-bs-toggle", "modal");
    registerBtn.setAttribute("data-bs-target", "#registerModal");

    // Append to navbar
    authArea.appendChild(loginBtn);
    authArea.appendChild(registerBtn);
    return;
  }

  const user = parseJwt(token);

  // ===== USER CONTAINER =====
  authArea.innerHTML = ""; // clear existing content
  const userWrapper = document.createElement("span");
  userWrapper.className = "text-light me-3";

  // 👤 icon + username
  const icon = document.createTextNode(user.role === "admin" ? "🥷🏻 " : "👤 ");
  
  const usernameText = document.createTextNode(`${user.username}`);

  userWrapper.appendChild(usernameText);
  userWrapper.appendChild(icon);

  // ===== ROLE BADGE =====
  const roleBadge = document.createElement("span");
  roleBadge.className = "badge bg-info text-dark ms-1";
  roleBadge.textContent = user.role;

  userWrapper.appendChild(roleBadge);

  // ===== LOGOUT BUTTON =====
  const logoutBtn = document.createElement("button");
  logoutBtn.className = "btn btn-outline-light btn-sm";
  logoutBtn.textContent = "Logout";

  // Logout logic
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    displayUserAuth();
  });

  // ===== APPEND EVERYTHING =====
  authArea.append(userWrapper, logoutBtn);
}

// ===== EVENTS =====
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  await login(username, password);
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  await register(username, password);
});

function parseJwt(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (err) {
    return null;
  }
}

// ===== INIT =====
displayUserAuth();
// if (localStorage.getItem("token")) {
fetchCards();
// }
