// features/navbar/navbar.ui.js
import { getCurrentUser, logout } from "../auth/auth.service.js";
import { renderCards } from "../cards/cards.ui.js";

export function displayUserAuth() {
  const authArea = document.getElementById("auth-area");
  authArea.innerHTML = ""; // clear

  const user = getCurrentUser();
  if (!user) {
    // show login/register buttons
    const loginBtn = document.createElement("button");
    loginBtn.className = "btn btn-outline-light me-2";
    loginBtn.textContent = "Login";
    loginBtn.setAttribute("data-bs-toggle", "modal");
    loginBtn.setAttribute("data-bs-target", "#loginModal");

    const registerBtn = document.createElement("button");
    registerBtn.className = "btn btn-light";
    registerBtn.textContent = "Register";
    registerBtn.setAttribute("data-bs-toggle", "modal");
    registerBtn.setAttribute("data-bs-target", "#registerModal");

    authArea.append(loginBtn, registerBtn);
    return;
  }

  // user info
  const userWrapper = document.createElement("span");
  userWrapper.className = "text-light me-3";
  const icon = document.createTextNode(user.role === "admin" ? "🥷🏻 " : "👤 ");
  const usernameText = document.createTextNode(user.username);
  userWrapper.appendChild(icon);
  userWrapper.appendChild(usernameText);

  // role badge
  const roleBadge = document.createElement("span");
  roleBadge.className = "badge bg-info text-dark ms-1";
  roleBadge.textContent = user.role;
  userWrapper.appendChild(roleBadge);

  // logout button
  const logoutBtn = document.createElement("button");
  logoutBtn.className = "btn btn-outline-light btn-sm";
  logoutBtn.textContent = "Logout";
  logoutBtn.addEventListener("click", () => {
    logout();
    displayUserAuth();
    renderCards();
  });

  authArea.append(userWrapper, logoutBtn);
}