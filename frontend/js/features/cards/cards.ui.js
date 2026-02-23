// features/cards/cards.ui.js
import { fetchCards } from "./cards.service.js";
import { createCardElement } from "./card.js";

const container = document.getElementById("cards-container");

export async function renderCards() {
  container.innerHTML = ""; // clear previous cards
  const cards = await fetchCards();
  if (!cards) {
    container.innerHTML = "<p>Unauthorized or failed to load cards.</p>";
    return;
  }

  cards.forEach((card) => {
    const cardEl = createCardElement(card);
    container.appendChild(cardEl);
  });
}