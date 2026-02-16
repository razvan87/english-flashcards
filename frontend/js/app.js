import { addSpeakButtonListener } from './speak.js';
import { createCardElement } from './card.js';

const container = document.getElementById('cards-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

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

    data.data.forEach(card => {
      const cardEl = createCardElement(card);
      container.appendChild(cardEl);
    });

  } catch (err) {
    console.error('Error fetching cards:', err);
    container.innerHTML = '<p>Failed to load cards.</p>';
  }
}


// ===== AUTH =====
async function login (username, password) {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      // close modal
      const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      loginModal.hide();
      fetchCards();
    } else {
      alert('Login failed: ' + data.message);
    }
  } catch (err) {
    console.error('Error during login:', err);
  }
}

async function register (username, password) {
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Registration successful!');
      // close modal
      const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
      registerModal.hide();
      fetchCards();
    } else {
      alert(data.message);
    }  
  } catch (err) {
    console.error('Error during registration:', err);
  }
}


// ===== EVENTS =====
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  await login(username, password);
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  await register(username, password);
});


// ===== INIT =====
// if (localStorage.getItem("token")) {
  fetchCards();
// }
