import { addSpeakButtonListener } from './speak.js';
import { createCardElement } from './card.js';

const container = document.getElementById('cards-container');

async function fetchCards() {
  try {
    const response = await fetch('http://localhost:3000/api/cards');
    const data = await response.json();

    data.data.forEach(card => {
      const cardEl = createCardElement(card);
      container.appendChild(cardEl);
    });

  } catch (err) {
    console.error('Error fetching cards:', err);
    container.innerHTML = '<p>Failed to load cards.</p>';
  }
}

fetchCards();
