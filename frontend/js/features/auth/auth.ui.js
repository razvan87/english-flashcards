import {
  login as loginService,
  register as registerService,
} from "./auth.service.js";
import { displayUserAuth } from "../navbar/navbar.ui.js";
import { renderCards } from "../cards/cards.ui.js";

export function bindAuthForms() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const loginModalEl = document.getElementById("loginModal");
  const registerModalEl = document.getElementById("registerModal");

  const loginModal = loginModalEl ? new bootstrap.Modal(loginModalEl) : null;
  const registerModal = registerModalEl ? new bootstrap.Modal(registerModalEl) : null;

  // Safety cleanup (prevents grey frozen screen)
  [loginModalEl, registerModalEl].forEach((modalEl) => {
    if (!modalEl) return;

    modalEl.addEventListener("hidden.bs.modal", () => {
      document.body.classList.remove("modal-open");
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.remove());
    });
  });

  if(loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;
      try {
        const result = await loginService(username, password);
        alert("Login successful!");
        if (loginModal) loginModal.hide();
        displayUserAuth();
        renderCards();
        loginForm.reset();
      } catch (error) {
        alert("Login failed: " + error.message);
        if (loginModal) loginModal.hide();
      }
    });
  }

  if(registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;
      try {
        await registerService(username, password);
        registerForm.reset();
        if (registerModal) registerModal.hide();
        alert("Registration successful! Please log in.");
        if (loginModal) loginModal.show();
      } catch (error) {
        alert("Registration failed: " + error.message);
      }
    });
  }
}
