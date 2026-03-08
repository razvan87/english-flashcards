import {
  login as loginService,
  register as registerService,
} from "./auth.service.js";
import { displayUserAuth } from "../navbar/navbar.ui.js";
import { renderCards } from "../cards/cards.ui.js";

export function bindAuthForms() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    try {
      const result = await loginService(username, password);
      alert("Login successful!");
      bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
      displayUserAuth();
      renderCards();
      loginForm.reset();
    } catch (error) {
      alert("Login failed: " + error.message);
      bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
    }
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    try {
      await registerService(username, password);
      registerForm.reset();

      //switch to login tab
      bootstrap.Modal.getInstance(
        document.getElementById("registerModal")
      ).hide();

      alert("Registration successful! Please log in.");

      const loginModalEl = document.getElementById("loginModal");
      if (loginModalEl) {
        // Use existing instance or create new one
        const loginModal =
          bootstrap.Modal.getInstance(loginModalEl) || new bootstrap.Modal(loginModalEl);
        loginModal.show();
      }
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  });
}
